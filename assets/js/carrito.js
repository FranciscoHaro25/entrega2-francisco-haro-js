// // === CARRITO LOGICA EN MEMORIA ===

// let carrito = [];

// // Guardar el carrito actualizado en localStorage
// const guardarCarrito = () => {
//   localStorage.setItem("carrito", JSON.stringify(carrito));
// };

// // Agregar producto
// const agregarAlCarrito = (producto) => {
//   const id = parseInt(producto.id);
//   const existente = carrito.find((item) => item.id === id);
//   if (existente) {
//     existente.cantidad += 1;
//   } else {
//     carrito.push({ ...producto, id, cantidad: 1 });
//   }
//   actualizarCantidadCarrito();
//   renderizarCarrito();
//   guardarCarrito();
// };

// // Eliminar producto
// const eliminarDelCarrito = (id) => {
//   carrito = carrito.filter((item) => item.id !== id);
//   actualizarCantidadCarrito();
//   renderizarCarrito();
//   guardarCarrito();
// };

// // Vaciar carrito
// const vaciarCarrito = () => {
//   carrito = [];
//   actualizarCantidadCarrito();
//   renderizarCarrito();
//   guardarCarrito();
// };

// // Actualizar contador badge
// const actualizarCantidadCarrito = () => {
//   const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
//   const badge = document.getElementById("cantidad-carrito");
//   if (badge) badge.textContent = totalCantidad;
// };

// // Renderizar lista en DOM (puede simplificarse según necesidades)
// const renderizarCarrito = () => {
//   // Solo actualiza la cantidad por ahora
//   actualizarCantidadCarrito();
// };

// // === CARGAR PRODUCTOS CON FETCH + AGREGAR EVENTOS ===

// const contenedor = document.querySelector(".grid-temporada");

// fetch("/assets/data/productos.json")
//   .then((res) => res.json())
//   .then((productos) => {
//     productos.forEach((producto) => {
//       const div = document.createElement("div");
//       div.className = "card-producto";
//       div.innerHTML = `
//         <img src="${producto.imagen}" alt="${producto.nombre}" />
//         <p class="marca">${producto.marca}</p>
//         <h3>${producto.nombre}</h3>
//         <div class="rating">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#f39c12" width="16" height="16">
//             <path d="M287.9 17.8L354 150l136.9 20c26.2 3.8 36.7 36 17.7 54.6l-99 96.5
//             23.4 136.6c4.5 26.2-23 46-46.4 33.7L288 439.6l-122.6 64.5c-23.5 12.3-50.9-7.5-46.4-33.7
//             l23.4-136.6-99-96.5c-19-18.6-8.5-50.8 17.7-54.6L222 150l66.1-132.2c11.7-23.4 45.6-23.4 57.3 0z"/>
//           </svg>
//           <span>${producto.reviews} reviews</span>
//         </div>
//         <p class="precio">$${producto.precio.toLocaleString()}</p>
//         <button type="button" class="btn-temporada"
//           data-id="${producto.id}"
//           data-nombre="${producto.nombre}"
//           data-precio="${producto.precio}">
//           Comprar
//         </button>
//       `;
//       contenedor.appendChild(div);
//     });

//     // Activar eventos de compra
//     activarBotonesComprar();
//   })
//   .catch((err) => {
//     console.error("Error al cargar productos:", err);
//   });

// // Activar eventos de compra
// function activarBotonesComprar() {
//   const botones = document.querySelectorAll(".btn-temporada");
//   botones.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       const id = parseInt(btn.dataset.id);
//       const nombre = btn.dataset.nombre;
//       const precio = parseFloat(btn.dataset.precio);

//       agregarAlCarrito({ id, nombre, precio });

//       const panelCarrito = document.getElementById("carrito-detalle");
//       panelCarrito?.classList.add("visible");
//     });
//   });
// }

// // Recuperar carrito desde localStorage al cargar la página
// document.addEventListener("DOMContentLoaded", () => {
//   const raw = localStorage.getItem("carrito");
//   try {
//     carrito = JSON.parse(raw) || [];
//   } catch (e) {
//     console.error("Error al parsear carrito:", e);
//     carrito = [];
//   }
//   actualizarCantidadCarrito();
// });
