// VERSIÓN SIMPLIFICADA PARA DEBUGGING
console.log("🔥 SCRIPT RENDERPRODUCTOS.JS CARGADO");

// Función para verificar DOM
function verificarDOM() {
  const contenedor = document.querySelector(".grid-temporada");
  console.log("🎯 Contenedor .grid-temporada encontrado:", !!contenedor);
  console.log("📍 URL:", window.location.pathname);
  console.log("🕐 DOM ready state:", document.readyState);
  return contenedor;
}

// Verificar inmediatamente
verificarDOM();

// Función para cargar productos
function cargarProductos() {
  console.log("🚀 Iniciando carga simplificada de productos...");

  const contenedor = verificarDOM();
  if (!contenedor) {
    console.error("❌ Sin contenedor, abortando");
    return;
  }

  const estaEnCatalogo = window.location.pathname.includes("catalogo.html");
  const rutaBase = estaEnCatalogo
    ? "../assets/data/productos.json"
    : "./assets/data/productos.json";

  console.log("📁 Cargando desde:", rutaBase);

  fetch(rutaBase)
    .then((res) => {
      console.log("📡 Status fetch:", res.status);
      return res.json();
    })
    .then((productos) => {
      console.log("✅ Productos obtenidos:", productos.length);

      // Filtrar productos según página
      const listaAMostrar = estaEnCatalogo ? productos : productos.slice(0, 6);
      console.log("🛍️ Productos a mostrar:", listaAMostrar.length);

      // Limpiar contenedor
      contenedor.innerHTML = "";

      // Crear cards simples
      listaAMostrar.forEach((producto, index) => {
        console.log(`📦 Creando card ${index + 1}: ${producto.nombre}`);

        const div = document.createElement("div");
        div.className = "card-producto";
        div.style.cssText =
          "border: 1px solid #ccc; padding: 15px; margin: 10px; background: white; text-align: center;";

        // Ajustar ruta de imagen
        let rutaImagen = producto.imagen;
        if (estaEnCatalogo && rutaImagen.startsWith("./assets/")) {
          rutaImagen = rutaImagen.replace("./assets/", "../assets/");
        }

        div.innerHTML = `
                    <img src="${rutaImagen}" alt="${
          producto.nombre
        }" style="max-width: 150px; height: 100px; object-fit: cover;" />
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio.toFixed(2)}</p>
                    <button onclick="alert('Producto: ${
                      producto.nombre
                    }')">Test</button>
                `;

        contenedor.appendChild(div);
      });

      console.log("🎉 Renderizado completado!");
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      if (contenedor) {
        contenedor.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      }
    });
}

// Ejecutar en diferentes momentos
if (document.readyState === "loading") {
  console.log("⏳ DOM aún cargando, esperando...");
  document.addEventListener("DOMContentLoaded", cargarProductos);
} else {
  console.log("✅ DOM ya listo, ejecutando inmediatamente");
  cargarProductos();
}

// También ejecutar después de un delay
setTimeout(() => {
  console.log("⏰ Ejecutando después de delay...");
  cargarProductos();
}, 1000);
