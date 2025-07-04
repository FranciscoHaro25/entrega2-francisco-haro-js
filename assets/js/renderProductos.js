// 1. Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let todosLosProductos = [];

const contenedor = document.querySelector(".grid-temporada");
const carritoCantidad = document.querySelector(".carrito-cantidad");

// 2. Funciones de carrito
const guardarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

const actualizarCarrito = () => {
  carritoCantidad.textContent = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );
  guardarCarrito();
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

// 4. Renderizar productos desde JSON
fetch("/assets/data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    todosLosProductos = productos;
    const listaAMostrar = estaEnCatalogo
      ? productos
      : productos.filter((p) => p.id >= 1 && p.id <= 6);
    renderizarProductos(listaAMostrar);
  });

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
  if (!contenedor) return;
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const precioDolar = producto.precio.toFixed(2);
    const div = document.createElement("div");
    div.className = "card-producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
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
}

// 7. Inicializar contador
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// 8. Mostrar carrito
document.querySelector(".carrito-icono")?.addEventListener("click", (e) => {
  e.preventDefault();
  const panel = document.getElementById("carrito-detalle");
  if (!carrito.length) {
    Swal.fire({
      icon: "info",
      title: "Tu carrito está vacío 🛒",
      text: "Agrega productos para poder visualizar tu pedido.",
      background: "#fff7f0",
      color: "#333",
      iconColor: "#EC6A37",
      confirmButtonText: "Ir al Catálogo",
      customClass: {
        popup: "swal-popup-gatox",
        title: "swal-title-gatox",
        htmlContainer: "swal-html-gatox",
        confirmButton: "swal-btn-ok-gatox",
      },
    }).then(() => {
      window.location.href = "/pages/catalogo.html";
    });
    return;
  }
  if (panel) {
    panel.classList.toggle("visible");
    renderizarCarrito();
  }
});

// 9. Renderizar carrito
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const panel = document.getElementById("carrito-detalle");
  if (!lista || !panel) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const precio = Number(item.precio);
    const cantidad = Number(item.cantidad);
    const totalProducto = precio * cantidad;
    total += totalProducto;

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "1rem";
    li.innerHTML = `
      <strong>${item.nombre}</strong> x ${cantidad}
      <span>$${totalProducto.toFixed(2)}</span>
    `;
    lista.appendChild(li);
  });

  const footer = document.createElement("div");
  footer.style.borderTop = "1px solid #ddd";
  footer.style.marginTop = "1.5rem";
  footer.style.paddingTop = "1rem";

  const totalTexto = document.createElement("p");
  totalTexto.style.fontWeight = "bold";
  totalTexto.style.fontSize = "1.4rem";
  totalTexto.style.marginBottom = "1rem";
  totalTexto.textContent = `Total: $${total.toFixed(2)}`;

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "🗑 Vaciar Carrito";
  btnVaciar.className = "btn-carrito outline";
  btnVaciar.style.marginBottom = "0.8rem";
  btnVaciar.style.width = "100%";
  btnVaciar.onclick = () => {
    carrito = [];
    actualizarCarrito();
    renderizarCarrito();
  };

  const btnCheckout = document.createElement("a");
  btnCheckout.textContent = "✅ Finalizar Compra";
  btnCheckout.href = "/pages/carrito.html";
  btnCheckout.className = "btn-carrito";
  btnCheckout.style.display = "inline-block";
  btnCheckout.style.width = "100%";
  btnCheckout.style.textAlign = "center";

  footer.appendChild(totalTexto);
  footer.appendChild(btnVaciar);
  footer.appendChild(btnCheckout);
  lista.appendChild(footer);
}
