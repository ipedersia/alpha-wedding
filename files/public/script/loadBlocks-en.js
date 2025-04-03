// Упрощенная функция для загрузки блоков HTML
async function loadBlock(blockId, filePath, callback = () => {}) {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const blockHtml = await response.text();
      const blockElement = document.getElementById(blockId);
      if (blockElement) {
        blockElement.innerHTML = blockHtml;
        callback();
      }
    } else {
      console.error(`Ошибка при загрузке ${filePath}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Ошибка при загрузке ${filePath}: ${error.message}`);
  }
}

// Инициализация контактной формы
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const closeButton = document.getElementById("closeButton");
  const contactSection = document.getElementById("contactSection");

  if (form) {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const nameError = document.getElementById("nameErrorEn");
    const phoneError = document.getElementById("phoneErrorEn");

    const iti = window.intlTelInput(phoneInput, {
      autoPlaceholder: "aggressive",
      initialCountry: "ru",
      preferredCountries: ["ru", "kz", "by", "ge", "us"],
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js",
    });

    // Валидация имени
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim()) {
        nameError.style.display = "none";
      }
    });

    // Валидация телефона
    phoneInput.addEventListener("input", () => {
      const phonePattern =
        /^(\+?\d{1,4})?\s?(\(?\d{1,4}\)?[\s.-]?)?[\d\s.-]{7,15}$/;
      if (iti.isValidNumber() && phonePattern.test(phoneInput.value)) {
        phoneError.style.display = "none";
      } else {
        phoneError.style.display = "block";
        phoneError.textContent = "Enter the correct phone number";
      }
    });

    function validateForm() {
      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.style.display = "block";
        nameError.textContent = "Please enter your name";
        isValid = false;
      } else {
        nameError.style.display = "none";
      }

      if (!iti.isValidNumber()) {
        phoneError.style.display = "block";
        phoneError.textContent = "Enter the correct number";
        isValid = false;
      } else {
        phoneError.style.display = "none";
      }

      return isValid;
    }

    // Добавляем обработчик события для отправки формы
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = nameInput.value;
      const phone = phoneInput.value;

      if (!validateForm(name, phone)) return;

      // Получаем страну из intl-tel-input
      const countryData = iti.getSelectedCountryData();
      const countryCode = countryData.iso2.toUpperCase();

      // Данные для отправки на сервер
      const formData = {
        name,
        phone,
        countryCode,
      };

      try {
        const serverUrl = "https://iris-ultra-amphibian.glitch.me/sendMessage";
        
        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          showSuccessMessage();
          form.reset();
        } else {
          alert(result.message || "Ошибка при отправке. Попробуйте позже.");
        }
      } catch (error) {
        console.error("Ошибка при отправке:", error);
        alert("Ошибка при отправке. Попробуйте позже.");
      }
    });
    // Функция для показа сообщения об успешной отправке
    function showSuccessMessage() {
      successMessage.style.display = "block";
      contactSection.style.display = "none";
    }
    // Обработчик для закрытия сообщения
    closeButton.addEventListener("click", () => {
      successMessage.style.display = "none";
      contactSection.style.display = "block";
      form.reset();
    });
  } else {
    console.error("Форма не найдена");
  }
}

// Загружаем все блоки на страницу
function loadAllBlocks() {
  const blocks = [
    {
      id: "hero-section-en",
      path: "components/hero-section/hero-section-en.html",
    },
    { id: "about-en", path: "components/about/about-en.html" },
    { id: "questions-en", path: "components/questions/questions-en.html" },
    { id: "services-en", path: "components/services/services-en.html" },
    { id: "venues-en", path: "components/venues/venues-en.html" },
    {
      id: "recommendation-en",
      path: "components/recommendation/recommendation-en.html",
    },
    { id: "reviews-en", path: "components/reviews/reviews-en.html" },
    { id: "partners-en", path: "components/partners/partners-en.html" },
    { id: "footer-en", path: "components/footer/footer-en.html" },
    {
      id: "contacts-en",
      path: "components/contacts/contacts-en.html",
      callback: () => {
        initContactForm();

        const scrollToContacts = document.getElementById(
          "scroll-to-contacts-en"
        );
        const scrollToContactsMob = document.querySelector(
          "#scroll-to-contacts-mob-en"
        );
        const contactsSection = document.getElementById("contacts-en");

        // Функция для плавной прокрутки
        const scrollToContactSection = (event) => {
          event.preventDefault();
          contactsSection.scrollIntoView({
            behavior: "smooth",
            block: "center", // Прокручивает к центру блока
          });
        };

        // Добавляем обработчики для кнопок с id (например, для desktop)
        if (scrollToContacts && contactsSection) {
          scrollToContacts.addEventListener("click", scrollToContactSection);
        }

        // Добавляем обработчик для кнопок на мобильных устройствах
        if (scrollToContactsMob && contactsSection) {
          scrollToContactsMob.addEventListener("click", scrollToContactSection);
        }

        // Находим все кнопки и ссылки с якорем #contacts или атрибутом data-scroll-to="contacts"
        const contactLinks = document.querySelectorAll(
          'a[href="#contacts-en"], button[data-scroll-to="contacts-en"]'
        );

        // Добавляем обработчик для всех таких ссылок и кнопок
        contactLinks.forEach((link) => {
          link.addEventListener("click", scrollToContactSection);
        });

        // Теперь добавим обработчик для всех ссылок с якорем #contacts
        const allAnchorLinks = document.querySelectorAll(
          'a[href="#contacts-en"]'
        );
        allAnchorLinks.forEach((anchor) => {
          anchor.addEventListener("click", scrollToContactSection);
        });
      },
    },
  ];

  blocks.forEach((block) => loadBlock(block.id, block.path, block.callback));
}

// Инициализируем загрузку всех блоков
loadAllBlocks();
