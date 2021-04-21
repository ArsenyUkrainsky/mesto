import './index.css'
import {
  initialCards,
  objectValidation,
  popupButtonEdit,
  popupButtonAdd,
  nameInput,
  jobInput,
  formElementCards,
  formElementEdit,
  containerSelector,
} from '../script/utils/constants.js'
import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'
import { Section } from '../script/components/Section.js'
import { PopupWithImage } from '../script/components/PopupWithImage.js'
import { PopupWithForm } from '../script/components/PopupWithForm.js'
import { UserInfo } from '../script/components/UserInfo.js'

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__characteristic',
})
const popupWithImage = new PopupWithImage('#image')
const popupWithFormUser = new PopupWithForm('#user', submitEditProfileForm)
const popupWithFormCard = new PopupWithForm('#cards', submitAddCardForm)
const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem)
      cardsList.addItem(cardElement)
    },
  },
  containerSelector
)

cardsList.renderItems()
popupWithFormCard.setEventListeners()
popupWithFormUser.setEventListeners()
popupWithImage.setEventListeners()
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName
  jobInput.value = userInfo.getUserInfo().userJob
  popupWithFormUser.open()
  editProfileFormValidator.clearErrorMessage()
})

popupButtonAdd.addEventListener('click', () => {
  popupWithFormCard.open()
  addCardFormValidator.clearErrorMessage()
})

function submitEditProfileForm(inputData) {
  userInfo.setUserInfo(inputData)
  popupWithFormUser.close()
}

function submitAddCardForm(inputData) {
  cardsList.addNewItem(createCard(inputData))
  popupWithFormCard.close()
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name)
}

function createCard(cardItem) {
  const newCardElement = new Card(cardItem, '.template', handleCardClick)
  const cardElement = newCardElement.generateCard()
  return cardElement
}
