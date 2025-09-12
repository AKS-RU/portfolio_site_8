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
