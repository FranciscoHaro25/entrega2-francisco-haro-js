// 1. Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let todosLosProductos = [];

const contenedor = document.querySelector(".grid-temporada");
const carritoCantidad = document.querySelector(".carrito-cantidad");

// Debug: Verificar que los elementos se encuentren
console.log("🔍 DEBUGGING RENDERPRODUCTOS.JS");
console.log("📍 URL actual:", window.location.pathname);
console.log(
  "🎯 Contenedor .grid-temporada encontrado:",
  contenedor ? "SÍ" : "NO"
);
console.log(
  "🛒 Elemento .carrito-cantidad encontrado:",
  carritoCantidad ? "SÍ" : "NO"
);

if (!contenedor) {
  console.error("❌ PROBLEMA: No se encontró el contenedor .grid-temporada");
  console.log("🔍 Verificando si existe en el DOM...");
  setTimeout(() => {
    const contenedorTarde = document.querySelector(".grid-temporada");
    console.log(
      "⏰ Contenedor después de timeout:",
      contenedorTarde ? "ENCONTRADO" : "NO ENCONTRADO"
    );
  }, 1000);
}

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
  console.log("🚀 Iniciando carga de productos...");
  console.log(`📁 Ruta JSON: ${rutaBase}`);

  // Verificar contenedor nuevamente
  const contenedorActual = document.querySelector(".grid-temporada");
  console.log(
    "🎯 Contenedor al momento de cargar:",
    contenedorActual ? "ENCONTRADO" : "NO ENCONTRADO"
  );

  if (!contenedorActual) {
    console.error("❌ No se puede cargar productos sin contenedor");
    return;
  }

  fetch(rutaBase)
    .then((res) => {
      console.log("📡 Respuesta del fetch:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then((productos) => {
      console.log(`🎯 Productos cargados: ${productos.length}`);
      console.log(`📍 Estamos en: ${estaEnCatalogo ? "Catálogo" : "Index"}`);

      todosLosProductos = productos;
      const listaAMostrar = estaEnCatalogo
        ? productos
        : productos.filter((p) => p.id >= 1 && p.id <= 6);

      console.log(`🛍️ Productos a mostrar: ${listaAMostrar.length}`);
      console.log(
        "📦 Primeros productos:",
        listaAMostrar.slice(0, 2).map((p) => p.nombre)
      );

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

// 5. Filtrado por búsqueda solo si hay input
document.getElementById("busqueda")?.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase().trim();

  const filtrados = todosLosProductos.filter((prod) => {
    return (
      prod.nombre.toLowerCase().includes(texto) ||
      prod.marca.toLowerCase().includes(texto)
    );
  });

  contenedor.innerHTML = "";
  renderizarProductos(filtrados);
});

// 6. Renderizar productos y vincular botones
function renderizarProductos(lista) {
  console.log("🎨 Iniciando renderizarProductos...");
  console.log("📦 Lista de productos recibida:", lista.length);
  console.log("🎯 Contenedor encontrado:", contenedor ? "SÍ" : "NO");

  if (!contenedor) {
    console.error("❌ No se encontró el contenedor .grid-temporada");
    return;
  }

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    console.warn("⚠️ No hay productos para mostrar");
    contenedor.innerHTML = "<p>No se encontraron productos</p>";
    return;
  }

  lista.forEach((producto, index) => {
    console.log(`🛍️ Renderizando producto ${index + 1}:`, producto.nombre);

    const precioDolar = producto.precio.toFixed(2);
    // Usar la ruta de imagen que viene del JSON, pero ajustar según el contexto
    let rutaImagen = producto.imagen;
    if (estaEnCatalogo && rutaImagen.startsWith("./assets/")) {
      rutaImagen = rutaImagen.replace("./assets/", "../assets/");
    }

    console.log(`🖼️ Ruta de imagen para ${producto.nombre}:`, rutaImagen);

    const div = document.createElement("div");
    div.className = "card-producto";
    div.innerHTML = `
      <img src="${rutaImagen}" alt="${producto.nombre}" onerror="console.error('Error cargando imagen: ${rutaImagen}')" />
      <p class="marca">${producto.marca}</p>
      <h3>${producto.nombre}</h3>
      <div class="rating">
        ⭐ ${producto.reviews} reviews
      </div>
      <p class="precio">$${precioDolar}</p>
      <button class="btn-temporada">Comprar</button>
    `;
    contenedor.appendChild(div);

    const btn = div.querySelector(".btn-temporada");
    btn.addEventListener("click", () => {
      agregarAlCarrito({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
      });
    });
  });

  console.log(
    `✅ Renderización completada. ${lista.length} productos añadidos al DOM`
  );
}

// 7. Inicializar contador
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// 8. Mostrar carrito - usar función del main.js
// El evento del carrito se maneja desde main.js

// 7. Inicializar contador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
});
