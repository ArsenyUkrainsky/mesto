//***Окно попап */
// Переменная для выбора кнопки редактирования
const popupButtonEdit = document.querySelector('.profile__button-edit');
// Переменная для выбора кнопки закрытия окна
const popupButtonClose = document.querySelector('.popup__close');
// Переменная для окна попап
const popup = document.querySelector('#user');
// Переменная для отключения скролла страницы во время просмотра окна
const scrollsw = document.querySelector('.root');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector() Элемент формы 
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__field_input_name'); // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода имени
const jobInput = formElement.querySelector('.popup__field_input_characteristic'); // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода профессии
// Выберите элементы, куда должны быть вставлены значения полей
const nameInfo = document.querySelector('.profile__info-name');
const jobCharacteristic = document.querySelector('.profile__characteristic');

// Функция добавления, удаления классов и скролла страницы, получение исходных данных текстовых полей
function showPopup() {
  popup.classList.add('popup_opened');
  scrollsw.classList.toggle('root_scroll');
  nameInput.value = nameInfo.textContent
  jobInput.value = jobCharacteristic.textContent
}
// Лучше все же явно добавлять класс, а при закрытии явно его убирать.
function hidePopup() {
     popup.classList.remove('popup_opened')
     scrollsw.classList.toggle('root_scroll')
}
// Функция
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Получите значение полей jobInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  nameInfo.textContent = nameInput.value
  // console.log(NameInfo.textContent)
  jobCharacteristic.textContent = jobInput.value
  hidePopup()
}
// Прикрепляем обработчик к кнопкам:
// он будет следить за событием “click” - «нажатие»
popupButtonEdit.addEventListener('click', showPopup);
popupButtonClose.addEventListener('click', hidePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);