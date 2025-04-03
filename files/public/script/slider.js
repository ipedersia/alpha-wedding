let slideIndex = 1;
showSlides(slideIndex);

// Функция для изменения текущего слайда
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Функция для отображения слайдов
function showSlides(n) {
  let slides = document.querySelectorAll(".review-slide");
  let dots = document.querySelectorAll(".nav-dot");

  // Проверяем, если слайды и точки навигации не пусты
  if (!slides || slides.length === 0) {
    return;
  }
  if (!dots || dots.length === 0) {
    console.error("Точки навигации не найдены.");
    return;
  }

  // Проверяем, чтобы индекс был в пределах допустимых значений
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Убираем класс "active" со всех слайдов и точек
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = 0; // Прячем все слайды
  });

  dots.forEach((dot) => dot.classList.remove("active"));

  // Добавляем класс "active" для текущего слайда и точки
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.opacity = 1; // Делаем слайд видимым
  } else {
    console.error("Не удалось найти слайд с индексом " + (slideIndex - 1));
  }

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  } else {
    console.error("Не удалось найти точку навигации с индексом " + (slideIndex - 1));
  }
}

// Функция для автоматического переключения слайдов
function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

// Интервал для автоматического переключения слайдов (каждые 5 секунд)
setInterval(autoSlide, 10000);

// Добавление функционала для жестов
let touchStartX = 0; 
let touchEndX = 0;   

// Функция для перемещения слайда влево/вправ
function moveSlide(n) {
  showSlides((slideIndex += n));
}

// Обработчик события начала касания
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

// Обработчик события завершения касания
document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  // Определяем направление свайпа
  if (touchStartX > touchEndX + 30) {
    // Свайп влево
    moveSlide(1);
  } else if (touchStartX < touchEndX - 30) {
    // Свайп вправо
    moveSlide(-1);
  }
});
