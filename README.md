# 🐱 Gatox - Tienda de Accesorios para Gatos

## 📋 Descripción del Proyecto

**Gatox** es una tienda online especializada en accesorios y productos para gatos desarrollada con **JavaScript ES6+**. Este proyecto representa un e-commerce completo con funcionalidades avanzadas incluyendo carrito de compras persistente, sistema de checkout multi-paso, validación de formularios, y una experiencia de usuario optimizada.

## 🚀 Cómo ejecutar el proyecto

### ✅ Método Recomendado: Live Server (VS Code)

1. **Abrir proyecto en VS Code**
2. **Instalar extensión Live Server** si no la tienes
3. **Clic derecho** en `index.html` → **"Open with Live Server"**
4. **¡Listo!** Se abrirá automáticamente en `http://localhost:5500`

### 📂 Alternativa: Apertura directa

1. Descomprimir el archivo del proyecto
2. Hacer doble clic en `index.html`
3. ⚠️ **Nota**: Algunas funcionalidades pueden estar limitadas por CORS

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

- ✅ **Catálogo dinámico**: Productos cargados desde JSON con Fetch API
- ✅ **Carrito persistente**: localStorage con gestión avanzada de cantidades
- ✅ **Sistema de descuentos**: Cupones funcionales (`GATO10`, `FELINOS5`, `SUPER20`)
- ✅ **Checkout multi-paso**: Proceso guiado con validaciones
- ✅ **Gestión de stock**: Control de cantidades y disponibilidad
- ✅ **Búsqueda en tiempo real**: Filtrado por nombre y marca

### 🎨 **Interfaz de Usuario**

- ✅ **Diseño responsive**: Mobile-first con breakpoints optimizados
- ✅ **Micro-interacciones**: Animaciones fluidas y transiciones suaves
- ✅ **Hero carousel**: Slider automático con controles manuales
- ✅ **Notificaciones premium**: SweetAlert2 con temas personalizados
- ✅ **Esquema visual coherente**: Variables CSS y tipografía profesional
- ✅ **Lazy loading**: Optimización de carga de imágenes

### ⚙️ **Funcionalidades JavaScript Avanzadas**

- ✅ **Manipulación del DOM**: Renderizado dinámico optimizado
- ✅ **Fetch API**: Carga asíncrona con manejo de errores
- ✅ **Web Storage**: localStorage para persistencia de datos
- ✅ **Event Delegation**: Gestión eficiente de eventos
- ✅ **Form Validation**: Validación en tiempo real con UX mejorada
- ✅ **Performance**: Debouncing, caching y optimizaciones
- ✅ **Intersection Observer**: Animaciones lazy para mejor rendimiento

### 🔧 **Arquitectura del Código**

- ✅ **Modularización**: Separación clara de responsabilidades
- ✅ **ES6+ Features**: Arrow functions, destructuring, template literals
- ✅ **Error Handling**: Try/catch y validaciones robustas
- ✅ **Context Detection**: Auto-detección de rutas y contexto
- ✅ **Clean Code**: Comentarios, naming conventions y estructura

## 📱 Páginas Funcionales

1. **Homepage (`index.html`)**: Inicio con carrusel, productos destacados y ofertas
2. **Catálogo (`pages/catalogo.html`)**: Listado completo de productos con buscador
3. **Carrito (`pages/carrito.html`)**: Gestión del carrito con resumen de compra
4. **Checkout (`pages/pago.html`)**: Proceso de compra paso a paso
5. **Contacto (`pages/contacto.html`)**: Formulario de contacto
6. **Inspiración (`pages/inspiracion.html`)**: Galería e ideas para propietarios de gatos

## 🛠️ Stack Tecnológico

### Frontend Core

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript ES6+**: Sintaxis moderna y funcionalidades avanzadas

### Librerías y Frameworks

- **SweetAlert2**: Notificaciones y alertas personalizadas
- **AOS (Animate On Scroll)**: Animaciones de scroll optimizadas
- **Font Awesome**: Iconografía profesional
- **Normalize.css**: Reset CSS cross-browser

### Fuentes y Tipografía

- **Google Fonts**: Raleway (sans-serif) + Playfair Display (serif)
- **Sistema de tipografía**: Escalado modular y responsive

### Herramientas de Desarrollo

- **VS Code**: Editor principal con Live Server
- **Git**: Control de versiones
- **Chrome DevTools**: Debugging y performance

## 🎯 Conceptos de JavaScript Implementados

### 📝 **Manipulación del DOM**

```javascript
// Renderizado dinámico de productos
function renderizarProductos(lista) {
  const contenedor = document.querySelector(".grid-temporada");
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "card-producto";
    div.innerHTML = `...`; // Template literal
    contenedor.appendChild(div);
  });
}
```

### 🔄 **Asincronía y Fetch API**

```javascript
// Carga de datos con manejo de errores
async function cargarProductos() {
  try {
    const response = await fetch("./assets/data/productos.json");
    const productos = await response.json();
    renderizarProductos(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
```

### 💾 **Web Storage y Persistencia**

```javascript
// Gestión del carrito con localStorage
const guardarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

const cargarCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];
```

### 🎪 **Event Handling Avanzado**

```javascript
// Event delegation y debouncing
document.getElementById("busqueda")?.addEventListener(
  "input",
  debounce((e) => {
    const filtrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderizarProductos(filtrados);
  }, 300)
);
```

### 🔍 **Array Methods y Funcional**

```javascript
// Métodos de array para manipulación de datos
const totalCarrito = carrito.reduce(
  (acc, item) => acc + item.precio * item.cantidad,
  0
);

const productosDestacados = productos
  .filter((p) => p.reviews > 50)
  .map((p) => ({ ...p, destacado: true }))
  .sort((a, b) => b.reviews - a.reviews);
```

### ✅ **Validación y UX**

```javascript
// Validación de formularios con feedback visual
function validarCampo(campo, valor) {
  const elemento = elementos.campos[campo];
  const error = validadores[campo](valor);

  elemento.classList.toggle("valido", !error);
  elemento.classList.toggle("invalido", !!error);

  return !error;
}
```

## 🐛 Testing y Verificación

### 🏠 **Homepage (index.html)**

- [ ] ✅ Carrusel funciona automáticamente cada 6 segundos
- [ ] ✅ Navegación entre slides con botones prev/next
- [ ] ✅ Productos se cargan dinámicamente desde JSON
- [ ] ✅ Contador del carrito se actualiza correctamente

### 🛒 **Funcionalidad de Carrito**

- [ ] ✅ Botón "Comprar" agrega productos
- [ ] ✅ Notificación SweetAlert2 al agregar
- [ ] ✅ Contador visual se actualiza
- [ ] ✅ Carrito persiste al recargar página
- [ ] ✅ Gestión de cantidades (+ / -)

### 🔍 **Catálogo y Búsqueda**

- [ ] ✅ Página catálogo muestra todos los productos
- [ ] ✅ Buscador filtra en tiempo real
- [ ] ✅ Resultados se actualizan dinámicamente
- [ ] ✅ Imágenes cargan correctamente

### 💳 **Sistema de Cupones**

Probar estos códigos en el carrito:

- [ ] ✅ `GATO10` → Descuento de $10.00
- [ ] ✅ `FELINOS5` → Descuento de $5.00
- [ ] ✅ `SUPER20` → Descuento de $20.00
- [ ] ✅ Código inválido muestra error

### 📝 **Checkout Multi-paso**

- [ ] ✅ Paso 1: Login/Registro o continuar como invitado
- [ ] ✅ Paso 2: Información de envío
- [ ] ✅ Paso 3: Información de pago
- [ ] ✅ Paso 4: Confirmación y procesamiento
- [ ] ✅ Validaciones en cada paso

### 📧 **Formulario de Contacto**

- [ ] ✅ Validación en tiempo real
- [ ] ✅ Contadores de caracteres
- [ ] ✅ Estados visuales (válido/inválido)
- [ ] ✅ Animaciones y feedback
- [ ] ✅ Simulación de envío

### 📱 **Responsive Design**

- [ ] ✅ Mobile (≤ 480px)
- [ ] ✅ Tablet (481px - 768px)
- [ ] ✅ Desktop (≥ 769px)
- [ ] ✅ Navegación mobile funcional

---
