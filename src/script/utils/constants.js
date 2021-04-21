export const objectValidation = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__field', // селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit', // селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__submit_disabled', // класс модификатор для дизэйбла кнопки
  inputErrorMessage: 'popup__error_active', // селектор контейнеров для ошибок этой формы
  inputError: 'popup__field_type_error',
  textError: '.popup__error',
}
export const initialCards = [
  {
    name: 'Вакаяма, Япония',
    link:
      'https://images.unsplash.com/photo-1614913501059-9fb836fe1769?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80',
  },
  {
    name: 'Копенгаген, Дания',
    link:
      'https://images.unsplash.com/photo-1613724131628-a20a5b0a4b91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80',
  },
  {
    name: 'Эгюий-дю-Миди, Шамони-Монблан, Франция',
    link:
      'https://images.unsplash.com/photo-1612993232871-47e86e7de1f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'озеро Брайес',
    link:
      'https://images.unsplash.com/photo-1604598879394-87da8999e7bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]
const popupButtonEdit = document.querySelector('.profile__button-edit')
const popupButtonAdd = document.querySelector('.profile__button-add')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__field_input_name')
const jobInput = formElement.querySelector('.popup__field_input_characteristic')
const formElementCards = document.querySelector('.popup__form_cards')
const formElementEdit = document.querySelector('.popup__form_edit')
const containerSelector = document.querySelector('.elements__places')

export {
  popupButtonEdit,
  popupButtonAdd,
  nameInput,
  jobInput,
  formElementCards,
  formElementEdit,
  containerSelector,
}
