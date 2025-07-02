// 1. Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.querySelector(".grid-temporada");
const carritoCantidad = document.querySelector(".carrito-cantidad");

// 2. Funciones de carrito
const guardarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

const actualizarCarrito = () => {
  carritoCantidad.textContent = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  guardarCarrito();
};

const agregarAlCarrito = ({ id, nombre, precio }) => {
  const existente = carrito.find((item) => item.id == id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
  Swal.fire({
    icon: "success",
    title: "Agregado",
    text: `"${nombre}" fue agregado al carrito`,
    timer: 1500,
    showConfirmButton: false,
  });
};

// 3. Renderizar productos desde JSON
fetch("/assets/data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "card-producto";
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <p class="marca">${producto.marca}</p>
        <h3>${producto.nombre}</h3>
        <div class="rating">
          ⭐ ${producto.reviews} reviews
        </div>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <button
          class="btn-temporada"
          data-id="${producto.id}"
          data-nombre="${producto.nombre}"
          data-precio="${producto.precio}">
          Comprar
        </button>
      `;
      contenedor.appendChild(div);
    });

    // Activar botones una vez insertado en DOM
    document.querySelectorAll(".btn-temporada").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        agregarAlCarrito({ id, nombre, precio });
      });
    });
  });

// 4. Inicializar contador al cargar
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// Mostrar el carrito al hacer clic en el ícono
document.querySelector(".carrito-icono")?.addEventListener("click", (e) => {
  e.preventDefault();
  const panel = document.getElementById("carrito-detalle");
  if (panel) {
    panel.classList.toggle("visible");
    renderizarCarrito(); // ← esta función la definimos abajo
  }
});

// Mostrar los productos dentro del carrito
// function renderizarCarrito() {
//   const lista = document.getElementById("lista-carrito");
//   if (!lista) return;

//   lista.innerHTML = "";
//   carrito.forEach((item) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <strong>${item.nombre}</strong> x ${item.cantidad}
//       <span style="float:right">$${(
//         item.precio * item.cantidad
//       ).toLocaleString()}</span>
//     `;
//     lista.appendChild(li);
//   });
// }

function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const panel = document.getElementById("carrito-detalle");
  if (!lista || !panel) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "1rem";
    li.innerHTML = `
      <strong>${item.nombre}</strong> x ${item.cantidad}
      <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  // Contenedor de resumen y botones
  const footer = document.createElement("div");
  footer.style.borderTop = "1px solid #ddd";
  footer.style.marginTop = "1.5rem";
  footer.style.paddingTop = "1rem";

  const totalTexto = document.createElement("p");
  totalTexto.style.fontWeight = "bold";
  totalTexto.style.fontSize = "1.4rem";
  totalTexto.style.marginBottom = "1rem";
  totalTexto.textContent = `Total: $${total.toLocaleString()}`;

  // Botón 1: Vaciar carrito
  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "🗑 Vaciar Carrito";
  btnVaciar.className = "btn-carrito outline";
  btnVaciar.style.marginBottom = "0.8rem";
  btnVaciar.style.width = "100%";
  btnVaciar.onclick = () => {
    carrito = [];
    actualizarCarrito();
    renderizarCarrito();
  };

  // Botón 2: Ir al Checkout
  const btnCheckout = document.createElement("a");
  btnCheckout.textContent = "✅ Finalizar Compra";
  btnCheckout.href = "/pages/carrito.html";
  btnCheckout.className = "btn-carrito";
  btnCheckout.style.display = "inline-block";
  btnCheckout.style.width = "100%";
  btnCheckout.style.textAlign = "center";

  footer.appendChild(totalTexto);
  footer.appendChild(btnVaciar);
  footer.appendChild(btnCheckout);
  lista.appendChild(footer);
}
