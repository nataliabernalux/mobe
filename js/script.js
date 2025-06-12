// Header efecto shrink y sombra
const header = document.querySelector(".header");
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

// Cambiar tamaño del header al hacer scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Achica header
  if (scrollY > 50) {
    header.classList.add("shrink");
    header.classList.add("scrolled");
  } else {
    header.classList.remove("shrink");
    header.classList.remove("scrolled");
  }
});

// Abrir/cerrar menú hamburguesa y cambiar ícono
toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  toggle.textContent = nav.classList.contains("open") ? "✖" : "☰";
});

// Cerrar menú al hacer clic en cualquier enlace
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.textContent = "☰";
  });
});

// Autoplay slider proceso

const slider = document.getElementById("proceso-slider");
const dots = document.querySelectorAll(".slider-dots .dot");
let index = 0;

function updateDots(i) {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === i);
  });
}

function autoplaySlider() {
  const slides = document.querySelectorAll(".slide");
  index = (index + 1) % slides.length;
  slider.scrollTo({
    left: index * slider.clientWidth,
    behavior: "smooth",
  });
  updateDots(index);
}

function shouldAutoplay() {
  return window.innerWidth < 768;
}

let interval;
function startAutoplay() {
  if (shouldAutoplay()) {
    interval = setInterval(autoplaySlider, 4000);
  }
}

function stopAutoplay() {
  clearInterval(interval);
}

// Listener para redimensionar
window.addEventListener("resize", () => {
  stopAutoplay();
  startAutoplay();
});

// Listener por si el usuario interactúa
slider.addEventListener("scroll", () => {
  const slideWidth = slider.clientWidth;
  const newIndex = Math.round(slider.scrollLeft / slideWidth);
  if (newIndex !== index) {
    index = newIndex;
    updateDots(index);
  }
});

startAutoplay();

//reveal y fade up effect

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(".reveal-fade");
          elements.forEach((el) => {
            el.style.animationPlayState = "running";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.getElementById("elegirnos-texto"));
});

// reveal image al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // se ejecuta solo una vez
      }
    });
  },
  { threshold: 0.2 }
);

// Activar en cualquier clase que use reveal
document
  .querySelectorAll(".reveal-image, .reveal-fade, .reveal-left")
  .forEach((el) => observer.observe(el));

// Observador para reveal-stagger (animación escalonada)
const observerStagger = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerStagger.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

// Aplicarlo solo a los li de la sección compromiso
document
  .querySelectorAll(".compromiso-lista .reveal-stagger")
  .forEach((el) => observerStagger.observe(el));
