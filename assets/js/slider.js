// SLIDER HERO

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let index = 0;

function mostrarSlide(i) {
  slides.forEach((slide) => slide.classList.remove("activo"));
  slides[i].classList.add("activo");
}

next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  mostrarSlide(index);
});

setInterval(() => {
  index = (index + 1) % slides.length;
  mostrarSlide(index);
}, 6000);
