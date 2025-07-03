document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("lista-productos-carrito");
  const resumenCantidad = document.getElementById("carrito-resumen-cantidad");
  const resumenSubtotal = document.getElementById("resumen-subtotal");
  const resumenTotal = document.getElementById("resumen-total");
  const inputCupon = document.getElementById("cupon");
  const mensajeError = document.getElementById("mensaje-error-cupon");
  const descuentoLinea =
    document.querySelectorAll(".resumen-linea")[2].children[1];
  const totalFinalLabel = document.getElementById("total-final-label");
  const labelCuponAplicado = document.getElementById("cupon-aplicado-label");

  const cuponesValidos = {
    GATO10: 10.0,
    FELINOS5: 5.0,
    SUPER20: 20.0,
  };

  const envio = 0.0;
  let totalFinal = 0;

  function renderizarCarrito() {
    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((item) => {
      const precio = Number(item.precio);
      const cantidad = Number(item.cantidad);
      const totalProducto = precio * cantidad;
      subtotal += totalProducto;

      const div = document.createElement("div");
      div.className = "producto-carrito";
      div.innerHTML = `
        <div class="producto-detalle">
          <img src="/assets/img/image/image-${item.id}.jpg" alt="${
        item.nombre
      }" />
          <div class="producto-info">
            <p class="nombre">${item.nombre}</p>
            <p class="precio">$${precio.toFixed(2)} x ${cantidad}</p>
            <p class="precio-total"><strong>Total:</strong> $${totalProducto.toFixed(
              2
            )}</p>
          </div>
          <div class="contador-cantidad">
            <button class="btn-cantidad menos" data-id="${item.id}">−</button>
            <span class="cantidad-num">${cantidad}</span>
            <button class="btn-cantidad mas" data-id="${item.id}">+</button>
          </div>
        </div>
      `;
      contenedor.appendChild(div);
    });

    resumenCantidad.textContent = `Hay ${carrito.length} artículo${
      carrito.length !== 1 ? "s" : ""
    } en su carrito.`;
    resumenSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    descuentoLinea.textContent = "$0.00";
    totalFinal = subtotal + envio;
    resumenTotal.textContent = `$${totalFinal.toFixed(2)}`;
    if (totalFinalLabel)
      totalFinalLabel.textContent = `$${totalFinal.toFixed(2)}`;

    document.querySelectorAll(".btn-cantidad").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const esSuma = e.target.classList.contains("mas");
        actualizarCantidad(id, esSuma ? 1 : -1);
      });
    });
  }

  function actualizarCantidad(id, delta) {
    const index = carrito.findIndex((p) => p.id == id);
    if (index >= 0) {
      carrito[index].cantidad += delta;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    }
  }

  const btnAplicarCupon = document.getElementById("btn-aplicar-cupon");
  btnAplicarCupon?.addEventListener("click", () => {
    const codigo = inputCupon.value.trim().toUpperCase();
    let subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const resumenPrevio = JSON.parse(localStorage.getItem("resumen")) || {};

    if (!codigo) {
      mensajeError.textContent = "Por favor ingrese un código promocional.";
      mensajeError.classList.remove("oculto");
      return;
    }

    if (resumenPrevio.cupon === codigo) {
      mensajeError.textContent = "Este cupón ya fue aplicado.";
      mensajeError.classList.remove("oculto");
      return;
    }

    mensajeError.classList.add("oculto");

    if (cuponesValidos[codigo]) {
      const descuento = cuponesValidos[codigo];
      totalFinal = subtotal + envio - descuento;

      descuentoLinea.textContent = `-$${descuento.toFixed(2)}`;
      resumenTotal.textContent = `$${totalFinal.toFixed(2)}`;
      if (totalFinalLabel)
        totalFinalLabel.textContent = `$${totalFinal.toFixed(2)}`;

      inputCupon.disabled = true;
      btnAplicarCupon.disabled = true;

      if (labelCuponAplicado) {
        labelCuponAplicado.textContent = `✅ Cupón aplicado: ${codigo}`;
        labelCuponAplicado.classList.remove("oculto");
      }

      localStorage.setItem(
        "resumen",
        JSON.stringify({ descuento, cupon: codigo })
      );

      Swal.fire({
        icon: "success",
        title: "Cupón aplicado 🎉",
        html: `<strong>¡Descuento activo!</strong><br>Se descontaron <b>$${descuento.toFixed(
          2
        )}</b> de tu compra.`,
        background: "#fff7f0",
        color: "#333",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        iconColor: "var(--color-secundario)",
        customClass: {
          popup: "swal-popup-gatox",
          title: "swal-title-gatox",
          htmlContainer: "swal-html-gatox",
        },
      });
    } else {
      totalFinal = subtotal + envio;
      descuentoLinea.textContent = "$0.00";
      resumenTotal.textContent = `$${totalFinal.toFixed(2)}`;
      if (totalFinalLabel)
        totalFinalLabel.textContent = `$${totalFinal.toFixed(2)}`;
      mensajeError.textContent = "El código ingresado no es válido.";
      mensajeError.classList.remove("oculto");
    }
  });

  renderizarCarrito();
});
