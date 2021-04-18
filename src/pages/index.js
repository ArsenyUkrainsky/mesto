import { initialCards, objectValidation } from '../script/utils/constants.js'

import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'

import { Section } from '../script/components/Section.js'
import { Popup } from '../script/components/Popup.js'
import { PopupWithImage } from '../script/components/PopupWithImage.js'
import { PopupWithForm } from '../script/components/PopupWithForm.js'
import { UserInfo } from '../script/components/UserInfo.js'

const popupButtonEdit = document.querySelector('.profile__button-edit')
const popupButtonAdd = document.querySelector('.profile__button-add')
const popupUser = document.querySelector('#user')
const popupCards = document.querySelector('#cards')
const popupImage = document.querySelector('#image')

const formElement = document.querySelector('.popup__form')

const nameInput = formElement.querySelector('.popup__field_input_name')

const jobInput = formElement.querySelector('.popup__field_input_characteristic')

const formElementCards = document.querySelector('.popup__form_cards')
const formElementEdit = document.querySelector('.popup__form_edit')
const inputCardName = formElementCards.querySelector('.popup__field_input_place')
const inputCardUrl = formElementCards.querySelector('.popup__field_input_url')

const containerSelector = document.querySelector('.elements__places')

const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

const profilePopup = new Popup(popupUser)
const cardPopup = new Popup(popupCards)
const popupWithImage = new PopupWithImage(popupImage)
const popupWithFormUser = new PopupWithForm(popupUser, )
const popupWithFormCard = new PopupWithForm(popupCards, )
const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__characteristic',
})

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
popupButtonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName
  jobInput.value = userInfo.getUserInfo().userJob
  profilePopup.open()
  profilePopup.setEventListeners()
  editProfileFormValidator.clearErrorMessage()
})
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
  cardPopup.open()
  cardPopup.setEventListeners()
  addCardFormValidator.clearErrorMessage()
})
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  formElement.reset()
  profilePopup.close()
}
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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
        const cardElement = new Card(dataValue, '.template', handleCardClick).generateCard()
        cardNew.addItemNew(cardElement)
      },
    },
    containerSelector
  )
  cardNew.renderItems()
  formElementCards.reset()
  cardPopup.close()
}
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
formElement.addEventListener('submit', submitEditProfileForm)
formElementCards.addEventListener('submit', submitAddCardForm)
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function handleCardClick(link, name) {
  popupWithImage.open(link, name)
}
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
