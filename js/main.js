document.addEventListener("DOMContentLoaded", function () {
  // Находим все иконки с нужным классом
  const toggles = document.querySelectorAll(".faq__item-flex-questom-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      // Находим следующий элемент после родителя (.faq__item-flex) — это .faq__item-flex-answer
      const currentAnswer = this.closest(".faq__item-flex").nextElementSibling;
      // Получаем все возможные ответы
      const allAnswers = document.querySelectorAll(".faq__item-flex-answer");

      // Сначала закрываем все
      allAnswers.forEach((answer) => {
        answer.style.display = "none";
      });

      // Если текущий ответ не был открыт — открываем его
      if (currentAnswer) {
        currentAnswer.style.display = "block";
      }
    });
  });
});

// Обработка бургер кнопки
const burgerBtn = document.querySelector(".burger-btn");
const headerNav = document.querySelector(".header__nav");

burgerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  headerNav.classList.toggle("active");
  burgerBtn.classList.toggle("active");
});

// Закрытие меню при клике вне его
document.addEventListener("click", (e) => {
  if (!burgerBtn.contains(e.target) && !headerNav.contains(e.target)) {
    headerNav.classList.remove("active");
    burgerBtn.classList.remove("active");
  }
});

// Ввод номера телефона
const phoneInput = document.getElementById("phone");

// Разрешаем только + и цифры, применяем маску
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/[^+\d]/g, ""); // Оставляем только + и цифры

  if (value.startsWith("+")) {
    // Удаляем лишние плюсы
    value = "+" + value.slice(1).replace(/\+/g, "");
  } else {
    // Если нет + — убираем его вообще
    value = value.replace(/\+/, "");
  }

  // Применяем маску для формата +7 (999) 999-99-99
  let formatted = "";
  if (value) {
    if (value.startsWith("+")) {
      formatted = "+";
      value = value.slice(1);
    } else {
      formatted = "+";
    }

    // Берём не более 11 цифр после +
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length > 0) {
      formatted += digits[0];
      if (digits.length > 1) {
        formatted += " (";
        formatted += digits.substring(1, 4).padEnd(3, "_");
        formatted += ") ";
        formatted += digits.substring(4, 7).padEnd(3, "_");
        if (digits.length > 7) {
          formatted += "-";
          formatted += digits.substring(7, 9).padEnd(2, "_");
          if (digits.length > 9) {
            formatted += "-";
            formatted += digits.substring(9, 11).padEnd(2, "_");
          }
        }
      }
    }
  }

  // Обновляем значение поля
  e.target.value = formatted;

  // Сохраняем позицию каретки (опционально, но полезно)
  // Здесь упрощённо — можно улучшить при необходимости
});

// Защита от вставки мусора
phoneInput.addEventListener("paste", function (e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData).getData("text");
  const clean = pasted.replace(/[^+\d]/g, "");
  document.execCommand("insertText", false, clean);
});
