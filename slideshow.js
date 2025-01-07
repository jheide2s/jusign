document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.nav-dot');

  let currentSlide = 0;
  const totalSlides = dots.length;

  // Automatische Slideshow
  const changeSlide = (index) => {
    currentSlide = index;
    slides.style.transform = `translateX(-${currentSlide * 20}%)`; // 20% pro Bild
    updateDots();
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    changeSlide(currentSlide);
  };

  let slideInterval = setInterval(nextSlide, 5000);

  // Update Dots
  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  };

  // Manuelles Wechseln
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval); // Automatik pausieren
      changeSlide(index);
      slideInterval = setInterval(nextSlide, 5000); // Automatik neu starten
    });
  });

  // Initiale Einstellung
  updateDots();
});
