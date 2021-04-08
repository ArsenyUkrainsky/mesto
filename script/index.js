import { initialCards } from './initial-сards.js'
import { objectValidation } from './objectValidation.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popupButtonEdit = document.querySelector('.profile__button-edit')
const popupButtonAdd = document.querySelector('.profile__button-add')
const popupUser = document.querySelector('#user')
const popupCards = document.querySelector('#cards')

const nameInfo = document.querySelector('.profile__info-name')
const jobCharacteristic = document.querySelector('.profile__characteristic')
const formElement = document.querySelector('.popup__form')

const formElementCards = document.querySelector('.popup__form_cards')
const formElementEdit = document.querySelector('.popup__form_edit')
const inputCardName = formElementCards.querySelector('.popup__field_input_place')
const inputCardUrl = formElementCards.querySelector('.popup__field_input_url')
const nameInput = formElement.querySelector('.popup__field_input_name')
const jobInput = formElement.querySelector('.popup__field_input_characteristic')
const container = document.querySelector('.elements__places')
const popups = document.querySelectorAll('.popup')

export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keyup', closeByEscape)
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', closeByEscape)
}
// Закрытие попапа нажатием на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
// Закрытие попапа кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})
popupButtonEdit.addEventListener('click', () => {
  // занести данные в поля ввода
  nameInput.value = nameInfo.textContent
  jobInput.value = jobCharacteristic.textContent
  openPopup(popupUser)
  editProfileFormValidator.clearErrorMessage()
})
popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
  openPopup(popupCards)
  addCardFormValidator.clearErrorMessage()
})

// обратное действие, занести введенные данные
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  formElement.reset()
  closePopup(popupUser)
}
formElement.addEventListener('submit', submitEditProfileForm)
formElementCards.addEventListener('submit', submitAddCardForm)

function createCard(item, templ) {
  const card = new Card(item, templ)
  return card
}

// Создадим экземпляр карточки
initialCards.forEach((item) => {
  container.append(createCard(item, '.template').generateCard())
})
// Рендер одной новой карточки
function submitAddCardForm(evt) {
  evt.preventDefault()
  const dataValue = {
    name: inputCardName.value,
    link: inputCardUrl.value,
  }
  container.prepend(createCard(dataValue, '.template').generateCard())
  formElementCards.reset()
  closePopup(popupCards)
}

const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
