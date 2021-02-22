//***Окно попап */
// Переменная для выбора кнопки редактирования
let PopupButtonEdit = document.querySelector('.profile__button-edit')
// Переменная для выбора кнопки закрытия окна
let PopupButtonClose = document.querySelector('.popup__close')
// Переменная для окна
let popup = document.querySelector('.popup')
// Переменная для scrollOff
let scrollsw = document.querySelector('.root')
// Функция добавления, удаления классов и скролла страницы
function showPopup() {
     popup.classList.toggle('popup_opened')
     scrollsw.classList.toggle('root_scroll')
}
PopupButtonEdit.addEventListener('click', showPopup)
PopupButtonClose.addEventListener('click', showPopup)

// Находим форму в DOM
let formElement = document.querySelector('.popup__container')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__field_name')// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__field_characteristic')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
     // Так мы можем определить свою логику отправки.
     // О том, как это делать, расскажем позже.

     // Получите значение полей jobInput и nameInput из свойства value
     nameInput.value
     jobInput.value
     // Выберите элементы, куда должны быть вставлены значения полей
     let NameInfo = document.querySelector('.profile__info-name')
     let jobCharacteristic = document.querySelector('.profile__characteristic')
     // Вставьте новые значения с помощью textContent
     NameInfo.textContent = nameInput.value
     jobCharacteristic.textContent = jobInput.value

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 