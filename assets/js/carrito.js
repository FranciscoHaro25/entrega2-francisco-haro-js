// carrito.js

// Obtener carrito del localStorage o inicializar vacío
const obtenerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito actualizado en localStorage
const guardarCarrito = (carrito) =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

// Agregar producto al carrito
const agregarAlCarrito = (producto) => {
  let carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
};

// Eliminar producto del carrito por ID
const eliminarDelCarrito = (id) => {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarrito(carrito);
};

// Vaciar todo el carrito
const vaciarCarrito = () => localStorage.removeItem("carrito");

// Mostrar el contenido del carrito por consola (puede adaptarse al DOM)
const mostrarCarrito = () => {
  const carrito = obtenerCarrito();
  console.table(carrito);
};

// Conectar los botones de productos de temporada con el sistema de carrito
document.addEventListener("DOMContentLoaded", () => {
  const botonesComprar = document.querySelectorAll(".btn-temporada");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const btnVaciar = document.getElementById("vaciar-carrito");
  const contenedorCarrito = document.getElementById("carrito-detalle");

  const actualizarCantidadCarrito = () => {
    const carrito = obtenerCarrito();
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.getElementById("cantidad-carrito");
    if (badge) {
      badge.textContent = totalCantidad;
    }
  };

  const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} x${item.cantidad} - $${
        item.precio * item.cantidad
      }`;
      listaCarrito.appendChild(li);
      total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = `$${total.toLocaleString()}`;
    contenedorCarrito.style.display = carrito.length ? "block" : "none";
  };

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(boton.dataset.id);
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);

      const producto = {
        id,
        nombre,
        precio,
      };

      agregarAlCarrito(producto);
      actualizarCantidadCarrito();
      renderizarCarrito();
      contenedorCarrito.style.display = "block"; // Mostrar panel al agregar
      alert(`${nombre} fue agregado al carrito 🛒`);
    });
  });

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    actualizarCantidadCarrito();
    renderizarCarrito();
  });

  const carritoIcono = document.querySelector(".carrito-icono");
  if (carritoIcono && contenedorCarrito) {
    carritoIcono.addEventListener("click", (e) => {
      e.preventDefault();
      contenedorCarrito.style.display =
        contenedorCarrito.style.display === "block" ? "none" : "block";
    });
  }

  actualizarCantidadCarrito();
  renderizarCarrito();
});
