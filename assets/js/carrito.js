document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("lista-productos-carrito");
  const resumenCantidad = document.getElementById("carrito-resumen-cantidad");
  const resumenSubtotal = document.getElementById("resumen-subtotal");
  const resumenTotal = document.getElementById("resumen-total");
  const inputCupon = document.getElementById("cupon");
  const descuentoLinea =
    document.querySelectorAll(".resumen-linea")[2].children[1];

  const cuponesValidos = {
    GATO10: 1000,
    FELINOS5: 500,
    SUPER20: 2000,
  };

  let cuponAplicado = "";

  function renderizarCarrito() {
    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((item) => {
      const div = document.createElement("div");
      div.className = "producto-carrito";
      const totalProducto = item.precio * item.cantidad;
      subtotal += totalProducto;

      div.innerHTML = `
        <div class="producto-detalle">
          <img src="/assets/img/image/image-${item.id}.jpg" alt="${
        item.nombre
      }" />
          <div class="producto-info">
            <p class="nombre">${item.nombre}</p>
            <p class="precio">$${item.precio.toLocaleString()} x ${
        item.cantidad
      }</p>
            <p class="precio-total"><strong>Total:</strong> $${totalProducto.toLocaleString()}</p>

            
          </div>
          <div class="contador-cantidad">
              <button class="btn-cantidad menos" data-id="${item.id}">−</button>
              <span class="cantidad-num">${item.cantidad}</span>
              <button class="btn-cantidad mas" data-id="${item.id}">+</button>
            </div>
        </div>
      `;
      contenedor.appendChild(div);
    });

    const envio = 199;
    resumenCantidad.textContent = `Hay ${carrito.length} artículo${
      carrito.length !== 1 ? "s" : ""
    } en su carrito.`;
    resumenSubtotal.textContent = `$${(subtotal / 100).toFixed(2)}`;
    descuentoLinea.textContent = "$0.00";
    resumenTotal.textContent = `$${((subtotal + envio) / 100).toFixed(2)}`;

    // Asignar eventos a los botones de cantidad recién generados
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

  inputCupon.addEventListener("input", () => {
    const codigo = inputCupon.value.trim().toUpperCase();
    const envio = 199;
    let subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    if (cuponesValidos[codigo] && codigo !== cuponAplicado) {
      const descuento = cuponesValidos[codigo];
      const totalFinal = subtotal + envio - descuento;

      descuentoLinea.textContent = `-$${(descuento / 100).toFixed(2)}`;
      resumenTotal.textContent = `$${(totalFinal / 100).toFixed(2)}`;
      cuponAplicado = codigo;

      Swal.fire({
        icon: "success",
        title: "Cupón aplicado 🎉",
        html: `<strong>¡Descuento activo!</strong><br>Se descontaron <b>$${(
          descuento / 100
        ).toFixed(2)}</b> de tu compra`,
        background: "#fff7f0",
        color: "#333",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        iconColor: "#EC6A37",
        customClass: {
          popup: "swal-popup-gatox",
          title: "swal-title-gatox",
          htmlContainer: "swal-html-gatox",
        },
      });
    } else if (!cuponesValidos[codigo]) {
      cuponAplicado = "";
      descuentoLinea.textContent = "$0.00";
      resumenTotal.textContent = `$${((subtotal + envio) / 100).toFixed(2)}`;
    }
  });

  // inicializar todo
  renderizarCarrito();
});
