let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);
startAutoSlide();

// ======= РУЧНОЕ ПЕРЕКЛЮЧЕНИЕ =======
function currentSlide(n) {
  showSlides((slideIndex = n));
  resetAutoSlide();
}

function moveSlide(n) {
  showSlides((slideIndex += n));
  resetAutoSlide();
}

// ======= АВТОПЕРЕКЛЮЧЕНИЕ =======
function startAutoSlide() {
  slideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 10000); // каждые 10 секунд
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// ======= ПОКАЗ СЛАЙДА =======
function showSlides(n) {
  const slides = document.querySelectorAll(".review-slide");
  const dots = document.querySelectorAll(".nav-dot");

  if (!slides || slides.length === 0) return;
  if (!dots || dots.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = 0;
  });

  dots.forEach((dot) => dot.classList.remove("active"));

  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.opacity = 1;
  }

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
}

// ======= ЖЕСТЫ (ТАЧ) =======
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  if (touchStartX > touchEndX + 30) {
    moveSlide(1); // свайп влево
  } else if (touchStartX < touchEndX - 30) {
    moveSlide(-1); // свайп вправо
  }
});
