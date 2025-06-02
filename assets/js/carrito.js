// === CARRITO LOGICA EN MEMORIA ===

let carrito = [];

// Guardar el carrito actualizado en localStorage
const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

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
  guardarCarrito();
};

// Eliminar producto
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCantidadCarrito();
  renderizarCarrito();
  guardarCarrito();
};

// Vaciar carrito
const vaciarCarrito = () => {
  carrito = [];
  actualizarCantidadCarrito();
  renderizarCarrito();
  guardarCarrito();
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
  const listaResumen = document.getElementById("lista-productos-carrito");
  const resumenSubtotal = document.getElementById("resumen-subtotal");
  const resumenTotal = document.getElementById("resumen-total");
  const resumenCantidad = document.getElementById("carrito-resumen-cantidad");
  const total = document.getElementById("total-carrito");
  const panel = document.getElementById("carrito-detalle");

  if (listaResumen) {
    listaResumen.innerHTML = "";
    let subtotalResumen = 0;
    carrito.forEach((item) => {
      const div = document.createElement("div");
      div.className = "producto-carrito";

      const detalle = document.createElement("div");
      detalle.className = "producto-detalle";

      const img = document.createElement("img");
      img.src = `/assets/img/image/image-${item.id}.jpg`;
      img.alt = item.nombre;

      const info = document.createElement("div");
      info.className = "producto-info";
      info.innerHTML = `
        <p class="nombre">${item.nombre}</p>
        <p class="precio"><strong>$${(item.precio / 100).toFixed(
          2
        )}</strong></p>
      `;

      const control = document.createElement("div");
      control.className = "cantidad-control";
      control.innerHTML = `
        <button>-</button>
        <input type="number" value="${item.cantidad}" />
        <button>+</button>
      `;

      const eliminar = document.createElement("button");
      eliminar.className = "eliminar";
      eliminar.innerHTML = "🗑️";
      eliminar.addEventListener("click", () => eliminarDelCarrito(item.id));

      detalle.appendChild(img);
      detalle.appendChild(info);
      detalle.appendChild(control);
      detalle.appendChild(eliminar);

      div.appendChild(detalle);
      listaResumen.appendChild(div);
      subtotalResumen += item.precio * item.cantidad;
    });

    if (resumenCantidad) {
      resumenCantidad.textContent = `Hay ${carrito.length} artículo${
        carrito.length !== 1 ? "s" : ""
      } en su carrito.`;
    }
    if (resumenSubtotal) {
      resumenSubtotal.textContent = `$${(subtotalResumen / 100).toFixed(2)}`;
    }
    if (resumenTotal) {
      resumenTotal.textContent = `$${(subtotalResumen / 100).toFixed(2)}`;
    }
  }

  if (lista && total && panel) {
    lista.innerHTML = "";
    let subtotal = 0;
    const envio = 199; // 1,99 $
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
      precio.textContent = `$${((item.precio * item.cantidad) / 100).toFixed(
        2
      )}`;

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
        <strong>$${(subtotal / 100).toFixed(2)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.4rem;">
        <span>Gastos de envío:</span>
        <strong>$${(envio / 100).toFixed(2)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.4rem;">
        <span>Descuento:</span>
        <strong>$${(descuento / 100).toFixed(2)}</strong>
      </div>
      <hr style="margin: 1rem 0;" />
      <div style="display: flex; justify-content: space-between; font-size: 1.6rem; font-weight: bold;">
        <span>Importe total:</span>
        <span>$${(totalFinal / 100).toFixed(2)}</span>
      </div>
    `;
    lista.appendChild(resumen);
    total.textContent = `$${(totalFinal / 100).toFixed(2)}`;
    panel.style.display = carrito.length ? "block" : "none";
  }
};

// Inicializar eventos
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("carrito.html")) {
    const raw = localStorage.getItem("carrito");
    try {
      carrito = JSON.parse(raw) || [];
    } catch (e) {
      console.error("Error al parsear JSON de carrito:", raw);
      carrito = [];
    }
    renderizarCarrito();
  }

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
