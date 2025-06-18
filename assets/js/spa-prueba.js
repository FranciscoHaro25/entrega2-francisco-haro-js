// Definimos las rutas y el contenido asociado
const routes = {
  "#home": `
        <h2>Bienvenido a la página de Inicio</h2>
        <p>Este es el contenido de la página principal.</p>
    `,
  "#about": `
        <h2>Acerca de</h2>
        <p>Somos una empresa innovadora.</p>
    `,
  "#contact": `
        <h2>Contacto</h2>
        <p>Puedes contactarnos en ejemplo@empresa.com</p>
    `,
};

// Función principal de enrutamiento
function router() {
  const hash = window.location.hash;
  const content = document.getElementById("content");

  // Carga el contenido según el hash o muestra un mensaje de error
  content.innerHTML =
    routes[hash] ||
    `
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe.</p>
    `;
}

// Detecta cuando la URL cambia o la página carga por primera vez
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
