// === CARRITO LOGICA EN MEMORIA ===

let carrito = [];

// Agregar producto
const agregarAlCarrito = (producto) => {
  const id = parseInt(producto.id);
  const existente = carrito.find((item) => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, id, cantidad: 1 });
  }
  actualizarCantidadCarrito();
  renderizarCarrito();
};

// Eliminar producto
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCantidadCarrito();
  renderizarCarrito();
};

// Vaciar carrito
const vaciarCarrito = () => {
  carrito = [];
  actualizarCantidadCarrito();
  renderizarCarrito();
};

// Actualizar contador badge
const actualizarCantidadCarrito = () => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById("cantidad-carrito");
  if (badge) badge.textContent = totalCantidad;
};

// Renderizar lista en DOM
const renderizarCarrito = () => {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");
  const panel = document.getElementById("carrito-detalle");

  if (!lista || !total || !panel) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nombre}</strong> x${item.cantidad} - $${(
      item.precio * item.cantidad
    ).toLocaleString()}
    `;
    lista.appendChild(li);
    suma += item.precio * item.cantidad;
  });

  total.textContent = `$${suma.toLocaleString()}`;
  panel.style.display = carrito.length ? "block" : "none";
};

// Inicializar eventos
document.addEventListener("DOMContentLoaded", () => {
  // Asegurarse que todos los botones .btn-temporada sean <a> o tengan type="button" si son <button>
  const botones = document.querySelectorAll(".btn-temporada");
  botones.forEach((btn) => {
    if (btn.tagName === "BUTTON" && !btn.hasAttribute("type")) {
      btn.setAttribute("type", "button");
    }
  });
  const iconoCarrito = document.querySelector(".carrito-icono");
  const panelCarrito = document.getElementById("carrito-detalle");
  const btnVaciar = document.getElementById("vaciar-carrito");

  botones.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);

      agregarAlCarrito({ id, nombre, precio });
      panelCarrito?.classList.add("visible");
    });
  });

  iconoCarrito?.addEventListener("click", (e) => {
    e.preventDefault();
    panelCarrito?.classList.toggle("visible");
  });

  btnVaciar?.addEventListener("click", () => {
    vaciarCarrito();
  });
});
