export async function initSlideshow() {
  console.log("Slideshow initialisiert"); // Debugging-Hinweis

  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.nav-dot');

  if (slides.length === 0 || dots.length === 0) {
    console.error("Keine Slides oder Dots gefunden!"); 
    return; 
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  const changeSlide = (index) => {
    currentSlide = index;
    console.log(`Aktueller Slide: ${currentSlide}`); 
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    changeSlide(currentSlide);
  };

  let slideInterval = setInterval(nextSlide, 5000);

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      changeSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  updateDots();
}