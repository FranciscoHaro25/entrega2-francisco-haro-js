# 🐱 Gatox - Tienda de Accesorios para Gatos

## 📋 Descripción del Proyecto

Gatox es una tienda online especializada en accesorios y productos para gatos. El proyecto fue desarrollado como entrega para el curso de JavaScript de Coderhouse y presenta un e-commerce completo con carrito de compras, sistema de checkout y múltiples páginas.

## 🚀 Cómo ejecutar el proyecto

### Opción 1: Abrir directamente en el navegador

1. Descomprimir el archivo del proyecto
2. Abrir el archivo `index.html` directamente en cualquier navegador web moderno
3. ¡El sitio debería funcionar correctamente!

### Opción 2: Servidor local (recomendado)

1. Si tienes Python instalado:
   ```bash
   python -m http.server 8000
   ```
2. Si tienes Node.js instalado:
   ```bash
   npx http-server
   ```
3. Abrir en el navegador la URL que aparezca (generalmente `http://localhost:8000`)

## 🗂️ Estructura del Proyecto

```
Entregable1/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── normalize.css      # Reset CSS
│   │   ├── style.css          # Estilos principales
│   │   └── checkout.css       # Estilos específicos del checkout
│   ├── js/
│   │   ├── main.js           # Funcionalidades generales
│   │   ├── slider.js         # Carrusel del hero
│   │   ├── renderProductos.js # Carga y renderizado de productos
│   │   ├── carrito.js        # Gestión del carrito de compras
│   │   └── checkout.js       # Proceso de checkout
│   ├── data/
│   │   ├── productos.json    # Base de datos de productos
│   │   └── provincias.json   # Datos de provincias para checkout
│   └── img/                  # Todas las imágenes del sitio
└── pages/
    ├── catalogo.html         # Página de catálogo completo
    ├── carrito.html          # Página del carrito de compras
    ├── checkout.html         # Proceso de compra (multi-paso)
    ├── contacto.html         # Página de contacto
    ├── inspiracion.html      # Galería de inspiración
    ├── nosotros.html         # Página about us
    └── pago.html            # Checkout final
```

## ✨ Características Implementadas

### 🛒 **E-commerce Completo**

- ✅ Catálogo de productos dinámico (cargado desde JSON)
- ✅ Sistema de carrito persistente (localStorage)
- ✅ Gestión de cantidades y precios
- ✅ Cupones de descuento funcionales
- ✅ Checkout multi-paso

### 🎨 **Interfaz de Usuario**

- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones suaves y micro-interacciones
- ✅ Carrusel de imágenes en homepage
- ✅ Sistema de notificaciones (SweetAlert2)
- ✅ Esquema de colores coherente

### ⚙️ **Funcionalidades JavaScript**

- ✅ Manipulación del DOM
- ✅ Fetch API para cargar datos
- ✅ localStorage para persistencia
- ✅ Gestión de eventos
- ✅ Validación de formularios
- ✅ Sistema SPA (Single Page Application) en checkout

## 🔧 Correcciones Realizadas

Se solucionaron todos los problemas de rutas identificados:

1. **✅ Rutas CSS y JS**: Cambiadas de absolutas (`/assets/...`) a relativas (`../assets/...`)
2. **✅ Rutas de imágenes**: Actualizadas en HTML, CSS y JavaScript
3. **✅ Fetch API**: Rutas corregidas en `renderProductos.js` y `checkout.js`
4. **✅ Archivos faltantes**: Creados `main.js`, `checkout.css` e `inspiracion.html`
5. **✅ Detección de contexto**: JavaScript detecta automáticamente si está en homepage o subpáginas

## 📱 Páginas Funcionales

1. **Homepage (`index.html`)**: Inicio con carrusel, productos destacados y ofertas
2. **Catálogo (`pages/catalogo.html`)**: Listado completo de productos con buscador
3. **Carrito (`pages/carrito.html`)**: Gestión del carrito con resumen de compra
4. **Checkout (`pages/pago.html`)**: Proceso de compra paso a paso
5. **Contacto (`pages/contacto.html`)**: Formulario de contacto
6. **Inspiración (`pages/inspiracion.html`)**: Galería e ideas para propietarios de gatos

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Custom Properties, Animaciones
- **JavaScript ES6+**: Módulos, Arrow functions, Async/Await
- **Libraries**: SweetAlert2, AOS (Animate On Scroll), Font Awesome
- **Fonts**: Google Fonts (Raleway + Playfair Display)

## 🎯 Conceptos de JavaScript Implementados

1. **DOM Manipulation**: Creación y modificación de elementos
2. **Event Handling**: Click, input, scroll events
3. **Storage API**: localStorage para persistencia de datos
4. **Fetch API**: Carga asíncrona de datos JSON
5. **Array Methods**: filter, map, reduce, forEach
6. **Template Literals**: Para generar HTML dinámico
7. **Destructuring**: En objetos y arrays
8. **Error Handling**: Try/catch en operaciones async

## 🐛 Testing

Para verificar que todo funciona:

1. **Homepage**: Verificar que el carrusel funcione y se carguen los productos
2. **Agregar productos**: Hacer clic en "Comprar" y verificar notificaciones
3. **Carrito**: Revisar que se actualice el contador y se muestren los productos
4. **Búsqueda**: Probar el filtro en la página de catálogo
5. **Cupones**: Probar códigos: `GATO10`, `FELINOS5`, `SUPER20`
6. **Checkout**: Completar el proceso paso a paso

## 📧 Contacto

**Desarrollador**: Francisco Haro  
**Proyecto**: Entrega 1 - JavaScript  
**Curso**: Coderhouse - Desarrollo Full Stack

---

## 🚨 Nota para el Tutor

Todos los problemas de rutas han sido solucionados. El proyecto ahora debería:

- ✅ Cargar correctamente desde cualquier página
- ✅ Mostrar todas las imágenes
- ✅ Ejecutar todos los scripts sin errores 404
- ✅ Funcionar tanto abriendo archivos directamente como en servidor local

**Recomendación**: Abrir `index.html` directamente en el navegador para una evaluación rápida.
