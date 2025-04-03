// Функция для переключения состояния меню
function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");

  // Переключаем классы для открытия/закрытия меню
  menuToggle.classList.toggle("open");
  mobileMenu.classList.toggle("active");

  // Если меню открылось, привязываем обработчики для ссылок
  if (mobileMenu.classList.contains("active")) {
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  } else {
    // Если меню закрывается, удаляем обработчики для ссылок
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.removeEventListener("click", closeMenu);
    });
  }
}

// Функция для закрытия меню
function closeMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");

  // Убираем классы и скрываем меню
  menuToggle.classList.remove("open");
  mobileMenu.classList.remove("active");
}

// Назначаем обработчики после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");

  // Назначаем обработчик на кнопку меню
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Назначаем обработчик на все ссылки меню
  if (mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});

document.addEventListener('click', function(event) {
  const menu = document.querySelector('.menu-mobile');
  const toggleButton = document.querySelector('.menu-toggle');
  
  if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
    closeMenu(); // Закрыть меню, если кликнули вне его
  }
  
});
