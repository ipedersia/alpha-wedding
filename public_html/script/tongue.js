function toggleLanguage() {
  var button = document.getElementById("language-button");

  // Проверяем текущий текст на кнопке
  if (button.textContent === "EN") {
    button.textContent = "RU";
    // Переключаем на английскую версию сайта
    window.location.href = "index-en.html";
  } else {
    button.textContent = "EN";
    // Переключаем на русскую версию сайта
    window.location.href = "index.html";
  }
}
