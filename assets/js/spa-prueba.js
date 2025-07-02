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

// Practicas
let fruits = { a: "apple", b: "banana", c: "cherry" };
for (let key in fruits) {
  console.log(fruits[key]);
}
let fruit = ["apple", "banana", "cherry"];
for (let elem of fruit) {
  console.log(elem);
}
for (let i = 0; i < fruit.length; i++) {
  console.log(fruit[i]);
}

function* generadorEjemplo() {
  yield "Paso 1";
  yield "Paso 2";
  yield "Paso 3";
}
const gen = generadorEjemplo();

console.log(gen.next()); // { value: "Paso 1", done: false }
console.log(gen.next()); // { value: "Paso 2", done: false }
console.log(gen.next()); // { value: "Paso 3", done: false }
console.log(gen.next()); // { value: undefined, done: true }

function* contar() {
  yield 1;
  yield 2;
  yield 3;
}

const contador = contar();

console.log(contador.next()); // { value: 1, done: false }
console.log(contador.next()); // { value: 2, done: false }
console.log(contador.next()); // { value: 3, done: false }
console.log(contador.next()); // { value: undefined, done: true }

function* contadorInfinito() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const iter = contadorInfinito();

console.log(iter.next().value); // 1
console.log(iter.next().value); // 2
console.log(iter.next().value); // 3
console.log(iter.next().value); // 4
// Ejemplo de uso de un generador para iterar sobre un array
function* iterarArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}
const numeros = [10, 20, 30, 40];
const iteradorNumeros = iterarArray(numeros);
console.log(iteradorNumeros.next().value); // 10
console.log(iteradorNumeros.next().value); // 20
console.log(iteradorNumeros.next().value); // 30
