//***Окно попап */
// Переменная для выбора кнопки редактирования
let PopupButtonEdit = document.querySelector('.profile__button-edit')
// Переменная для выбора кнопки закрытия окна
let PopupButtonClose = document.querySelector('.popup__close')
// Переменная для окна попап
let popup = document.querySelector('.popup')
// Переменная для отключения скролла страницы во время просмотра окна
let scrollsw = document.querySelector('.root')
// Находим форму в DOM
let formElement = document.querySelector('.popup__container') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field_characteristic') // Воспользуйтесь инструментом .querySelector()
// Выберите элементы, куда должны быть вставлены значения полей
let NameInfo = document.querySelector('.profile__info-name')
let jobCharacteristic = document.querySelector('.profile__characteristic')

// Функция добавления, удаления классов и скролла страницы
function showPopup() {
     popup.classList.add('popup_opened')
     scrollsw.classList.toggle('root_scroll')
     NameInfo.textContent = nameInput.value
     jobCharacteristic.textContent = jobInput.value
}
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
     // NameInfo.textContent = nameInput.value
     console.log(NameInfo.textContent)
     // jobCharacteristic.textContent = jobInput.value
     hidePopup()
}
// Прикрепляем обработчик к кнопкам:
// он будет следить за событием “click” - «нажатие»
PopupButtonEdit.addEventListener('click', showPopup)
PopupButtonClose.addEventListener('click', hidePopup)
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler)
