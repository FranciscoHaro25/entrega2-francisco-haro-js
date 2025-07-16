// 1. Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let todosLosProductos = [];

const contenedor = document.querySelector(".grid-temporada");
const carritoCantidad = document.querySelector(".carrito-cantidad");

// 2. Funciones de carrito
const guardarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

const actualizarCarrito = () => {
  if (carritoCantidad) {
    carritoCantidad.textContent = carrito.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
  }
  guardarCarrito();
  // También actualizar el contador global si existe
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
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
    title: "¡Producto agregado! 🛒",
    html: `<strong>"${nombre}"</strong> se ha añadido correctamente al carrito.`,
    background: "#fff7f0",
    color: "#333",
    iconColor: "#EC6A37",
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: "swal-popup-gatox",
      title: "swal-title-gatox",
      htmlContainer: "swal-html-gatox",
    },
  });
};

// 3. Detectar si estamos en catálogo
const estaEnCatalogo = window.location.pathname.includes("catalogo.html");

// 4. Determinar la ruta base para los assets
const rutaBase = estaEnCatalogo
  ? "../assets/data/productos.json"
  : "./assets/data/productos.json";

// 5. Función para cargar y renderizar productos
function cargarProductos() {
  // Verificar contenedor
  const contenedorActual = document.querySelector(".grid-temporada");
  if (!contenedorActual) {
    console.error("❌ No se encontró el contenedor .grid-temporada");
    return;
  }

  fetch(rutaBase)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then((productos) => {
      todosLosProductos = productos;
      // En index: mostrar solo los primeros 6 (más vendidos)
      // En catálogo: mostrar todos
      const listaAMostrar = estaEnCatalogo
        ? productos
        : productos.filter((p) => p.id >= 1 && p.id <= 6);

      renderizarProductos(listaAMostrar);
    })
    .catch((error) => {
      console.error("❌ Error cargando productos:", error);
      if (contenedorActual) {
        contenedorActual.innerHTML = `<p style="color: red; text-align: center;">Error cargando productos: ${error.message}</p>`;
      }
    });
}

// 6. Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cargarProductos);
} else {
  // DOM ya está cargado
  cargarProductos();
}

// 7. Filtrado por búsqueda solo si hay input
document.getElementById("busqueda")?.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase().trim();

  const filtrados = todosLosProductos.filter((prod) => {
    return (
      prod.nombre.toLowerCase().includes(texto) ||
      prod.marca.toLowerCase().includes(texto)
    );
  });

  // Buscar contenedor actual para búsqueda
  const contenedorBusqueda = document.querySelector(".grid-temporada");
  if (contenedorBusqueda) {
    contenedorBusqueda.innerHTML = "";
    renderizarProductos(filtrados);
  }
});

// 8. Renderizar productos y vincular botones
function renderizarProductos(lista) {
  // Buscar contenedor en tiempo real
  const contenedorActual = document.querySelector(".grid-temporada");
  if (!contenedorActual) {
    console.error("❌ No se encontró el contenedor .grid-temporada");
    return;
  }

  contenedorActual.innerHTML = "";

  if (lista.length === 0) {
    contenedorActual.innerHTML =
      "<p style='text-align: center; color: #666;'>No se encontraron productos</p>";
    return;
  }

  lista.forEach((producto) => {
    const precioDolar = producto.precio.toFixed(2);
    // Usar la ruta de imagen que viene del JSON, pero ajustar según el contexto
    let rutaImagen = producto.imagen;
    if (estaEnCatalogo && rutaImagen.startsWith("./assets/")) {
      rutaImagen = rutaImagen.replace("./assets/", "../assets/");
    }

    const div = document.createElement("div");
    div.className = "card-producto";
    div.innerHTML = `
      <img src="${rutaImagen}" alt="${producto.nombre}" />
      <p class="marca">${producto.marca}</p>
      <h3>${producto.nombre}</h3>
      <div class="rating">
        ⭐ ${producto.reviews} reviews
      </div>
      <p class="precio">$${precioDolar}</p>
      <button class="btn-temporada">Comprar</button>
    `;
    contenedorActual.appendChild(div);

    const btn = div.querySelector(".btn-temporada");
    btn.addEventListener("click", () => {
      agregarAlCarrito({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
      });
    });
  });
}

// 9. Inicializar contador
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// 10. Inicializar contador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
});
