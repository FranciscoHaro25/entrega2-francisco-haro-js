// 1. Declaración de productos como array de objetos
const productos = [
  { id: 1, nombre: "Rascador Deluxe", precio: 30 },
  { id: 2, nombre: "Cama Gatuna", precio: 40 },
  { id: 3, nombre: "Juguete con Catnip", precio: 15 },
];

// 2. Variables principales
let carrito = [];
let total = 0;
let continuar = true;

// 3. Función para mostrar el menú de productos
function mostrarMenu() {
  let mensaje = "¡Bienvenido a Gatox! \nElige un producto:\n";
  productos.forEach((p) => {
    mensaje += `${p.id}. ${p.nombre} - $${p.precio}\n`;
  });
  mensaje += "0. Finalizar compra";
  return mensaje;
}

// function mostrarMenu() {
//   let mensaje = "¡Bienvenido a Gatox!\nElige un producto:\n";
//   mensaje += "1. Rascador Deluxe - $30\n";
//   mensaje += "2. Cama Gatuna - $40\n";
//   mensaje += "3. Juguete con Catnip - $15\n";
//   mensaje += "0. Finalizar compra";
//   return mensaje;
// }

// 4. Función para agregar un producto al carrito
function agregarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (producto) {
    carrito.push(producto);
    total += producto.precio;
    alert(`Agregaste: ${producto.nombre}`);
  } else {
    alert("Opción inválida");
  }
}

// 5. Simulador principal con ciclo y condicionales
while (continuar) {
  const opcion = parseInt(prompt(mostrarMenu()));

  if (opcion === 0) {
    continuar = false;
  } else {
    agregarProducto(opcion);
  }
}

// 6. Mostrar resumen final con alert y consola
if (carrito.length > 0) {
  let resumen = "Resumen de tu compra en Gatox:\n";
  carrito.forEach((p) => {
    resumen += `- ${p.nombre} - $${p.precio}\n`;
  });
  resumen += `Total: $${total}`;
  alert(resumen);
  console.log("Productos en el carrito:", carrito);
  console.log("Total a pagar: $" + total);
} else {
  alert("No compraste nada. ¡Hasta pronto Gatox!");
}
