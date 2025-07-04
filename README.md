# 🐾 Gatox – Tienda Online de Productos para Gatos

**Gatox** es una tienda online desarrollada con HTML, CSS y JavaScript puro que permite a los usuarios explorar productos para gatos, agregarlos al carrito y finalizar la compra con una experiencia moderna y amigable.

---

## 🚀 Funcionalidades

- ✅ **Catálogo de productos dinámico** desde un archivo JSON.
- 🔎 **Buscador interactivo** para filtrar productos por nombre.
- 🛒 **Carrito de compras** con persistencia en `localStorage`.
- 💳 **Checkout multi-paso** (Inicio sesión, dirección, envío y pago).
- 🎨 Diseño responsive y limpio, con animaciones AOS y SweetAlert.

---

## 📁 Estructura del proyecto

/assets
│
├── /css
│   └── style.css            → Estilos principales
│
├── /js
│   └── main.js              → Lógica de carrito y renderizado
│
├── /data
│   └── productos.json       → Listado de productos (mock data)
│
├── /img/image
│   └── image-1.jpg          → Imágenes de productos
│
/pages
│   ├── index.html           → Página de inicio
│   ├── catalogo.html        → Página de catálogo completo
│   ├── carrito.html         → Página de resumen del pedido
│   └── contacto.html        → Página de contacto



---

## 🛠️ Cómo usar

1. **Clona el repositorio** o descarga los archivos.
2. Asegúrate de tener un entorno local (como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).
3. Abre `index.html` en el navegador.
4. Navega por el catálogo, prueba el buscador y el carrito.

---

## 📦 Productos

Los productos se encuentran en el archivo `assets/data/productos.json`. Puedes agregar más productos con esta estructura:

```json
{
  "id": 27,
  "nombre": "Nombre del Producto",
  "marca": "Marca",
  "precio": 199.99,
  "imagen": "/assets/img/image/image-27.jpg",
  "reviews": 12
}


📸 Tecnologías usadas
	•	HTML5 y CSS3 – maquetación semántica y estilos responsive.
	•	JavaScript Vanilla – sin frameworks, todo a mano.
	•	Font Awesome – íconos modernos.
	•	SweetAlert2 – alertas elegantes.
	•	AOS – animaciones on scroll.
	•	localStorage – para persistencia del carrito.



🙌 Autor

Desarrollado por Francisco Haro como parte del curso de Desarrollo Web Full Stack en Coderhouse 🧑‍💻




