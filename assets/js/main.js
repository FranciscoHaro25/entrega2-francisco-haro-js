// main.js - Funcionalidades generales del sitio

document.addEventListener("DOMContentLoaded", () => {
  console.log("Gatox - Sitio web cargado correctamente");

  // Inicializar contador del carrito
  actualizarContadorCarrito();

  // Manejar clic en el ícono del carrito
  const carritoIcono = document.querySelector(".carrito-icono");
  if (carritoIcono) {
    carritoIcono.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarCarrito();
    });
  }
});

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.querySelector(".carrito-cantidad");
  if (contador) {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? "block" : "none";
  }
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const detalle = document.getElementById("carrito-detalle");

  if (!carrito.length) {
    // Mostrar mensaje si el carrito está vacío usando SweetAlert2
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "info",
        title: "Tu carrito está vacío 🛒",
        text: "Agrega productos para poder visualizar tu pedido.",
        background: "#fff7f0",
        color: "#333",
        iconColor: "#EC6A37",
        confirmButtonText: "Ir al Catálogo",
        customClass: {
          popup: "swal-popup-gatox",
          title: "swal-title-gatox",
          htmlContainer: "swal-html-gatox",
          confirmButton: "swal-btn-ok-gatox",
        },
      }).then(() => {
        // Detectar si estamos en subpágina para redireccionar correctamente
        const estaEnSubpagina = window.location.pathname.includes("/pages/");
        const rutaCatalogo = estaEnSubpagina
          ? "./catalogo.html"
          : "./pages/catalogo.html";
        window.location.href = rutaCatalogo;
      });
    }
    return;
  }

  if (detalle) {
    detalle.classList.toggle("visible");
    renderizarCarritoDetalle();
  }
}

// Función para renderizar el detalle del carrito
function renderizarCarritoDetalle() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total-carrito");

  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const precio = Number(item.precio);
    const cantidad = Number(item.cantidad);
    const totalProducto = precio * cantidad;
    total += totalProducto;

    const li = document.createElement("li");
    li.className = "item-carrito";

    // Determinar ruta de imagen según contexto
    const estaEnSubpagina = window.location.pathname.includes("/pages/");
    const rutaImagen = estaEnSubpagina
      ? `../assets/img/image/image-${item.id}.jpg`
      : `./assets/img/image/image-${item.id}.jpg`;

    li.innerHTML = `
      <img src="${rutaImagen}" alt="${item.nombre}" />
      <div class="info">
        <div class="nombre">${item.nombre}</div>
        <div class="cantidad-precio">${cantidad} x $${precio.toFixed(2)}</div>
      </div>
      <button class="eliminar-item" onclick="eliminarDelCarrito(${
        item.id
      })">×</button>
    `;
    lista.appendChild(li);
  });

  if (totalSpan) {
    totalSpan.textContent = `$${total.toFixed(2)}`;
  }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id != id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderizarCarritoDetalle();
}

// Hacer las funciones globales para que otros scripts las puedan usar
window.actualizarContadorCarrito = actualizarContadorCarrito;
window.mostrarCarrito = mostrarCarrito;
window.renderizarCarritoDetalle = renderizarCarritoDetalle;
window.eliminarDelCarrito = eliminarDelCarrito;
