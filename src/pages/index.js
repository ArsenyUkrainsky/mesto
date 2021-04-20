import './index.css'
import {
  initialCards,
  objectValidation,
  popupButtonEdit,
  popupButtonAdd,
  popupUser,
  popupCards,
  popupImage,
  nameInput,
  jobInput,
  formElementCards,
  formElementEdit,
  inputCardName,
  inputCardUrl,
  containerSelector,
} from '../script/utils/constants.js'
import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'
import { Section } from '../script/components/Section.js'
import { Popup } from '../script/components/Popup.js'
import { PopupWithImage } from '../script/components/PopupWithImage.js'
import { PopupWithForm } from '../script/components/PopupWithForm.js'
import { UserInfo } from '../script/components/UserInfo.js'

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__characteristic',
})
const profilePopup = new Popup(popupUser)
const cardPopup = new Popup(popupCards)
const popupWithImage = new PopupWithImage(popupImage)
const popupWithFormUser = new PopupWithForm(popupUser, submitEditProfileForm)
const popupWithFormCard = new PopupWithForm(popupCards, submitAddCardForm)
const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName
  jobInput.value = userInfo.getUserInfo().userJob
  profilePopup.open()
  profilePopup.setEventListeners()
  editProfileFormValidator.clearErrorMessage()
})

popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
  cardPopup.open()
  cardPopup.setEventListeners()
  addCardFormValidator.clearErrorMessage()
})

function submitEditProfileForm(inputData) {
  userInfo.setUserInfo(inputData)
  profilePopup.close()
}

function submitAddCardForm(inputData) {
  const cardNew = new Section(
    {
      items: inputData,
      renderer: () => {
        const cardElement = new Card(inputData, '.template', handleCardClick).generateCard()
        cardNew.addNewItem(cardElement)
      },
    },
    containerSelector
  )
  cardNew.renderItems()
  popupWithFormCard.close()
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name)
  popupWithImage.setEventListeners()
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = new Card(cardItem, '.template', handleCardClick).generateCard()
      cardsList.addItem(cardElement)
    },
  },
  containerSelector
)
cardsList.renderItems()

addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
popupWithFormCard.setEventListeners()
popupWithFormUser.setEventListeners()
