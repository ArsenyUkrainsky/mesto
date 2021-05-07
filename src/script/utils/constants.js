export const objectValidation = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__field', // селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit', // селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__submit_disabled', // класс модификатор для дизэйбла кнопки
  inputErrorMessage: 'popup__error_active', // селектор контейнеров для ошибок этой формы
  inputError: 'popup__field_type_error',
  textError: '.popup__error',
}
const popupButtonAvatar = document.querySelector('.profile__avatar-edit')
const popupButtonEdit = document.querySelector('.profile__button-edit')
const popupButtonAdd = document.querySelector('.profile__button-add')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__field_input_name')
const jobInput = formElement.querySelector('.popup__field_input_characteristic')
const formElementCards = document.querySelector('.popup__form_cards')
const formElementEdit = document.querySelector('.popup__form_edit')
const formElementAvatar = document.querySelector('.popup__form_avatar')
const containerSelector = document.querySelector('.elements__places')

export {
  popupButtonAvatar,
  popupButtonEdit,
  popupButtonAdd,
  nameInput,
  jobInput,
  formElementCards,
  formElementEdit,
  formElementAvatar,
  containerSelector,
}
