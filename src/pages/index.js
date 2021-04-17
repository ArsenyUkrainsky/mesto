import { initialCards, objectValidation } from '../script/utils/constants.js'

import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'

import { Section } from '../script/components/Section.js'
import { Popup } from '../script/components/Popup.js'
import { PopupWithImage } from '../script/components/PopupWithImage.js'

const popupButtonEdit = document.querySelector('.profile__button-edit')
const popupButtonAdd = document.querySelector('.profile__button-add')
const popupUser = document.querySelector('#user')
const popupCards = document.querySelector('#cards')
const popupImage = document.querySelector('#image')
const nameInfo = document.querySelector('.profile__info-name')
const jobCharacteristic = document.querySelector('.profile__characteristic')
const formElement = document.querySelector('.popup__form')

const formElementCards = document.querySelector('.popup__form_cards')
const formElementEdit = document.querySelector('.popup__form_edit')
const inputCardName = formElementCards.querySelector('.popup__field_input_place')
const inputCardUrl = formElementCards.querySelector('.popup__field_input_url')
const nameInput = formElement.querySelector('.popup__field_input_name')
const jobInput = formElement.querySelector('.popup__field_input_characteristic')
const containerSelector = document.querySelector('.elements__places')

function handleCardClick(link, name) {
  const popupWithImage = new PopupWithImage(popupImage)
  popupWithImage.open(link, name)
}

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = nameInfo.textContent
  jobInput.value = jobCharacteristic.textContent

  new Popup(popupUser).open()
  editProfileFormValidator.clearErrorMessage()
})
popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
  new Popup(popupCards).open()
  addCardFormValidator.clearErrorMessage()
})

// обратное действие, занести введенные данные
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  formElement.reset()
  new Popup(popupUser).close()
}
formElement.addEventListener('submit', submitEditProfileForm)
formElementCards.addEventListener('submit', submitAddCardForm)

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.template', handleCardClick).generateCard()
      cardsList.addItem(card)
    },
  },
  containerSelector
)
cardsList.renderItems()

// Рендер одной новой карточки
function submitAddCardForm(evt) {
  evt.preventDefault()
  const dataValue = [
    {
      name: inputCardName.value,
      link: inputCardUrl.value,
    },
  ]

  const cardNew = new Section(
    {
      items: dataValue,
      renderer: (dataValue) => {
        const card = new Card(dataValue, '.template', handleCardClick).generateCard()
        cardNew.addItemNew(card)
      },
    },
    containerSelector
  )
  cardNew.renderItems()
  formElementCards.reset()

  new Popup(popupCards).close()
}

const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
