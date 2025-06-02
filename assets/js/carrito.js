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
  let subtotal = 0;
  const envio = 199; // 1,99 €
  const descuento = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "1rem";

    const detalle = document.createElement("div");
    detalle.style.flex = "1";

    const nombre = document.createElement("strong");
    nombre.style.fontSize = "1.4rem";
    nombre.textContent = item.nombre;

    const cantidad = document.createElement("div");
    cantidad.style.fontSize = "1.2rem";
    cantidad.style.color = "#666";
    cantidad.textContent = `Cantidad: ${item.cantidad}`;

    detalle.appendChild(nombre);
    detalle.appendChild(cantidad);

    const precio = document.createElement("div");
    precio.style.fontSize = "1.4rem";
    precio.style.fontWeight = "bold";
    precio.textContent = `€${((item.precio * item.cantidad) / 100).toFixed(2)}`;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "×";
    eliminarBtn.setAttribute("aria-label", "Eliminar producto");
    eliminarBtn.style.marginLeft = "1rem";
    eliminarBtn.style.background = "transparent";
    eliminarBtn.style.border = "none";
    eliminarBtn.style.fontSize = "1.6rem";
    eliminarBtn.style.cursor = "pointer";
    eliminarBtn.style.color = "#c0392b";
    eliminarBtn.addEventListener("click", () => eliminarDelCarrito(item.id));

    li.appendChild(detalle);
    li.appendChild(precio);
    li.appendChild(eliminarBtn);

    lista.appendChild(li);
    subtotal += item.precio * item.cantidad;
  });

  const totalFinal = subtotal + envio - descuento;

  const resumen = document.createElement("div");
  resumen.innerHTML = `
    <hr style="margin: 1rem 0;" />
    <div style="display: flex; justify-content: space-between; font-size: 1.4rem;">
      <span>Subtotal:</span>
      <strong>€${(subtotal / 100).toFixed(2)}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 1.4rem;">
      <span>Gastos de envío:</span>
      <strong>€${(envio / 100).toFixed(2)}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 1.4rem;">
      <span>Descuento:</span>
      <strong>€${(descuento / 100).toFixed(2)}</strong>
    </div>
    <hr style="margin: 1rem 0;" />
    <div style="display: flex; justify-content: space-between; font-size: 1.6rem; font-weight: bold;">
      <span>Importe total:</span>
      <span>€${(totalFinal / 100).toFixed(2)}</span>
    </div>
  `;
  lista.appendChild(resumen);
  total.textContent = `€${(totalFinal / 100).toFixed(2)}`;
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
