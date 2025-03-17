
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const closeIcon = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link');

navLink.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.add('hidden')
  })
})

closeIcon.addEventListener('click', () => {
  navMenu.classList.add('hidden')
})

hamburger.addEventListener('click', () => {
  navMenu.classList.remove('hidden')
})

// SCROLL SECTION ACTIVE LINK
const activeLink = () => {
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

  let currrent = 'home';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (this.scrollY >= sectionTop - 60) {
      currrent = section.getAttribute('id');
    }
  })

  navLinks.forEach(item => {
    item.classList.remove('text-quaternary');
    if (item.href.includes(currrent)) {
      item.classList.add('text-quarternary');
    }
  })
} 

window.addEventListener('scroll', activeLink);

// SLIDER MARCAS
const slider = document.getElementById('slider-marcas');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPos = e.clientX;
  slider.style.cursor = 'grabbing';
  slider.style.animationPlayState = 'paused';
});

slider.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
});

slider.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    slider.style.cursor = 'grab';
    prevTranslate = currentTranslate;
    slider.style.animationPlayState = 'running';
  }
});

slider.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    slider.style.cursor = 'grab';
    slider.style.animationPlayState = 'running';
  }
});



// gsap

// Ahora, el código para implementar el scroll suave
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los enlaces que apuntan a anclas internas
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Añadir evento de clic a cada enlace
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevenir el comportamiento predeterminado
      e.preventDefault();
      
      // Obtener el destino del enlace
      const targetId = this.getAttribute('href');
      
      // Si el enlace es "#", ir al principio de la página
      if (targetId === '#') {
        gsap.to(window, {
          duration: 1, 
          scrollTo: 0,
          ease: "power2.inOut"
        });
        return;
      }
      
      // Buscar el elemento de destino
      const targetElement = document.querySelector(targetId);
      
      // Si el elemento existe, desplazarse hasta él
      if (targetElement) {
        // Usar GSAP para desplazarse suavemente
        gsap.to(window, {
          duration: 1, // Duración de la animación en segundos
          scrollTo: {
            y: targetElement,
            offsetY: 80 // Offset para tener en cuenta la barra de navegación fija
          },
          ease: "power2.inOut" // Tipo de ease para la animación
        });
        
        // Si estamos en mobile y el menú está abierto, cerrarlo
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && !navMenu.classList.contains('hidden')) {
          navMenu.classList.add('hidden');
        }
      }
    });
  });

  // Función para actualizar clase activa en enlaces de navegación
  function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-quaternary');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-quaternary');
      }
    });
  }
  
  // Actualizar enlaces activos al hacer scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Inicializar enlaces activos
  updateActiveLink();
});
