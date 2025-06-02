// Array de productos
const productos = [
  { id: 1, nombre: "Cama Gatuna", precio: 40 },
  { id: 2, nombre: "Rascador Deluxe", precio: 35 },
  { id: 3, nombre: "Juguete con Catnip", precio: 20 },
];

let carrito = [];

// Mostrar productos
const contenedorProductos = document.getElementById("productos");

productos.forEach((prod) => {
  const card = document.createElement("div");
  card.innerHTML = `
    <h3>${prod.nombre}</h3>
    <p>Precio: $${prod.precio}</p>
    <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
  `;
  contenedorProductos.appendChild(card);
});

function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "<h2>Carrito</h2>";
  carrito.forEach((p, index) => {
    contenedorCarrito.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
  });
}

document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  alert(
    `Gracias por tu compra, ${nombre}! Te enviaremos el resumen a ${correo}.`
  );
  localStorage.clear();
  carrito = [];
  actualizarCarrito();
});
