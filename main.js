// ------------------------------------ //
// Menu hamburguer open-close & buttons //
// ------------------------------------ //
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const overlay = document.getElementById("overlay");

// Función para abrir y cerrar el menú móvil con overlay
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  overlay.style.display = isOpen ? "block" : "none";
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  document.body.style.overflow = isOpen ? "hidden" : ""; // Bloquea scroll en fondo
}

// Evento para el botón de menú
menuBtn.addEventListener("click", (e) => {
  toggleMenu();
  e.stopPropagation();
});

// Cierra el menú al hacer clic en un enlace dentro de él
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    overlay.style.display = "none";
    menuBtnIcon.setAttribute("class", "ri-menu-line");
    document.body.style.overflow = ""; // Desbloquea el scroll
  }
});

// Cierra el menú y el overlay al hacer clic fuera del menú
overlay.addEventListener("click", () => {
  navLinks.classList.remove("open");
  overlay.style.display = "none";
  menuBtnIcon.setAttribute("class", "ri-menu-line");
  document.body.style.overflow = ""; // Desbloquea el scroll
});

// ------------------------------------ //
// SLIDER CONTROL & TOUCH EVENTS //
// ------------------------------------ //
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots-container');
const slider = document.querySelector('.slider');
let startX = 0;
let startY = 0;
let isDragging = false;

// Crear puntos de navegación
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === currentSlide) dot.classList.add('active');
  dot.addEventListener('click', () => moveToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

function moveToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
  prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
  nextButton.style.display = currentSlide === totalSlides - 1 ? 'none' : 'block';
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

// Iniciar auto-slide
slideInterval = setInterval(autoSlide, 150000);

// Pausar el auto-slide al hacer hover
document.querySelector('.slider-container').addEventListener('mouseenter', () => clearInterval(slideInterval));
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
  slideInterval = setInterval(autoSlide, 150000);
});

// Flechas de navegación
prevButton.addEventListener('click', () => {
  clearInterval(slideInterval);
  currentSlide = Math.max(currentSlide - 1, 0);
  updateSlider();
});

nextButton.addEventListener('click', () => {
  clearInterval(slideInterval);
  currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
  updateSlider();
});

// Eventos touch y mouse para desplazamiento
function touchStart(e) {
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  startY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
  isDragging = true;
}

function touchEnd(e) {
  if (!isDragging) return;
  
  const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
  const endY = e.type.includes('mouse') ? e.pageY : e.changedTouches[0].clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Solo mover el slider si el desplazamiento horizontal es mayor que el vertical
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      currentSlide = Math.max(currentSlide - 1, 0); // Deslizar hacia la izquierda
    } else {
      currentSlide = Math.min(currentSlide + 1, totalSlides - 1); // Deslizar hacia la derecha
    }
    updateSlider();
  }

  isDragging = false;
}

// Agregar los eventos
slider.addEventListener('mousedown', touchStart);
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchend', touchEnd);

// Actualizar al cargar
updateSlider();


/* ------------------------------ ------------------------------ */
// SCROLL BUTTON
/* ------------------------------ ------------------------------ */
// Selecciona el botón de scroll
const scrollArrow = document.querySelector('.scroll__arrow');

// Muestra el botón solo cuando el usuario se desplaza hacia abajo
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    scrollArrow.classList.add('visible');
  } else {
    scrollArrow.classList.remove('visible');
  }
});

// Selecciona el elemento y actualiza el año
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* ------------------------------ ------------------------------ */
/* FAQ Accordeon  */ 
/* ------------------------------ ------------------------------ */
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
        item.classList.toggle('active');

        // Cerrar los otros elementos
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

/* ------------------------------ ------------------------------ */
/* Animation Map Section  */ 
/* ------------------------------ ------------------------------ */
const observer = new IntersectionObserver((entries) => { 
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
        entry.target.classList.remove('show');
      }
    });
  });
    
  const hiddenElements = document.querySelectorAll('.hidden'); 
  hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('touchstart', function (event) {
    // Detecta si hay más de un punto de contacto (para bloquear pinch-to-zoom)
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function (event) {
    // Bloquea el zoom cuando se detectan múltiples dedos en movimiento
    if (event.scale && event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });

// 
/* ------------------------------ ------------------------------ */
// Year in footer copyright
/* ------------------------------ ------------------------------ */
const currentYearSpan = document.getElementById('currentYear');
currentYearSpan.textContent = new Date().getFullYear();

/* ------------------------------ ------------------------------ */
/* Print viewport size... debugging use 
/* ------------------------------ ------------------------------ */
// Show viewport size
function updateViewportSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'H' : 'V';
    const footer__viewportSize = document.getElementById('footer__viewportSize');
    footer__viewportSize.textContent = `${width}px * ${height}px | ${orientation}`;
  }

  // Update info in recharging or redimention page
  updateViewportSize();
  window.addEventListener('resize', updateViewportSize);