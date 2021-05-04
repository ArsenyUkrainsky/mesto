import './index.css'
import {
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
import { PopupWithSubmit } from '../script/components/PopupWithSubmit.js'
import { UserInfo } from '../script/components/UserInfo.js'
import { Api } from '../script/components/Api.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    Authorization: 'c612ee53-bfd9-4a06-b181-f06567a06aa2',
    'Content-Type': 'application/json',
  },
})

const cardsList = new Section(
  {
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem)
      cardsList.addItem(cardElement)
    },
  },
  containerSelector
)

const cards = api.getInitialCards()
cards
  .then((card) => {
    cardsList.renderItems(card)
  })
  .catch((err) => {
    console.log(err)
  })

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__characteristic',
  userAvatar: '.profile__avatar',
})

const userData = api.getUser()
userData
  .then((info) => {
    userInfo.setUserInfo(info)
    console.log(info._id);
    const infId = info._id
    return infId
  })
  .catch((err) => {
    console.log(err)
  })

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName
  jobInput.value = userInfo.getUserInfo().userJob
  popupWithFormUser.open()
  editProfileFormValidator.clearErrorMessage()
})

function submitEditProfileForm(data) {
  api
    .editUserInfo(data)
    .then((inputData) => {
      userInfo.setUserInfo(inputData)
    })
    .catch((err) => {
      console.log(err)
    })
  popupWithFormUser.close()
}
const popupWithImage = new PopupWithImage('#image')
const popupWithFormUser = new PopupWithForm('#user', submitEditProfileForm)
const popupWithFormCard = new PopupWithForm('#cards', submitAddCardForm)
const popupWithSubmit = new PopupWithSubmit('#card-delete')
const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

popupWithSubmit.setEventListeners()
popupWithFormCard.setEventListeners()
popupWithFormUser.setEventListeners()
popupWithImage.setEventListeners()
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()

popupButtonAdd.addEventListener('click', () => {
  popupWithFormCard.open()
  addCardFormValidator.clearErrorMessage()
})

function submitAddCardForm(inputData) {
  api
    .createNewCard(inputData)
    .then((card) => {
      cardsList.addNewItem(createCard(card))
    })
    .catch((err) => {
      console.log(err)
    })
  popupWithFormCard.close()
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name)
}

function handleCardDelete() {
  popupWithSubmit.open()
}


function createCard(cardItem) {
  const newCardElement = new Card(
    cardItem,
    '.template',
    handleCardClick,
    //handleCardLike,
    handleCardDelete,

  )
  const cardElement = newCardElement.generateCard()
  return cardElement
}
