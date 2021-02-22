// Переменная для выбора кнопки редактирования
let PopupButtonEdit = document.querySelector('.profile__button-edit');
// Переменная для выбора кнопки закрытия окна
let PopupButtonClose = document.querySelector('.popup__close');
// Переменная для окна
let popup = document.querySelector('.popup');

let scrollsw = document.querySelector('.root');

// Функция добавления, удаления классов
function showPopup(){

popup.classList.toggle('popup_opened');
scrollsw.classList.toggle('root_scroll');
}

PopupButtonEdit.addEventListener('click', showPopup);
PopupButtonClose.addEventListener('click', showPopup);




