document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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

  let cupónAplicado = ""; // <- aquí controlamos si ya se aplicó un cupón

  if (!contenedor) return;

  let subtotal = 0;
  contenedor.innerHTML = "";

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

  // Detectar y aplicar cupón solo si es válido y aún no se aplicó
  inputCupon.addEventListener("input", () => {
    const codigo = inputCupon.value.trim().toUpperCase();

    if (cuponesValidos[codigo] && codigo !== cupónAplicado) {
      const descuento = cuponesValidos[codigo];
      const totalFinal = subtotal + envio - descuento;

      descuentoLinea.textContent = `-$${(descuento / 100).toFixed(2)}`;
      resumenTotal.textContent = `$${(totalFinal / 100).toFixed(2)}`;
      cupónAplicado = codigo;

      Swal.fire({
        icon: "success",
        title: "Cupón aplicado 🎉",
        text: `Se descontaron $${(descuento / 100).toFixed(2)} de tu compra`,
        timer: 1800,
        showConfirmButton: false,
      });
    } else if (!cuponesValidos[codigo]) {
      // Si se borra o escribe un cupón inválido, restauramos los valores
      cupónAplicado = "";
      descuentoLinea.textContent = "$0.00";
      resumenTotal.textContent = `$${((subtotal + envio) / 100).toFixed(2)}`;
    }
  });
});
