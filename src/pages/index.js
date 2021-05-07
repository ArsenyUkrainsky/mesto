import './index.css'
import {
  popupButtonAvatar,
  objectValidation,
  popupButtonEdit,
  popupButtonAdd,
  nameInput,
  jobInput,
  formElementCards,
  formElementEdit,
  formElementAvatar,
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

let myId = null

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    Authorization: 'c612ee53-bfd9-4a06-b181-f06567a06aa2',
    'Content-Type': 'application/json',
  },
})

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__characteristic',
  userAvatar: '.profile__avatar-edit',
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

const userData = api.getUser()
userData
  .then((info) => {
    userInfo.setUserInfo(info)
    myId = info._id
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных пользователя: ${err}`)
  })

const cards = api.getInitialCards()
cards
  .then((card) => {
    cardsList.renderItems(card)
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных карточек: ${err}`)
  })

const popupWithImage = new PopupWithImage('#image')
const cardInfoSubmit = new PopupWithSubmit('#card-delete')

const popupWithFormAvatar = new PopupWithForm('#edit-profile', submitEditProfileAvatar)
const popupWithFormUser = new PopupWithForm('#user', submitEditProfileForm)
const popupWithFormCard = new PopupWithForm('#cards', submitAddCardForm)

const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)
const loadAvatarFormValidator = new FormValidator(objectValidation, formElementAvatar)

popupWithImage.setEventListeners()
cardInfoSubmit.setEventListeners()
popupWithFormAvatar.setEventListeners()
popupWithFormUser.setEventListeners()
popupWithFormCard.setEventListeners()

popupButtonAvatar.addEventListener('click', () => {
  loadAvatarFormValidator.clearErrorMessage()
  popupWithFormAvatar.open()
})

function submitEditProfileAvatar(newAvatar) {
  popupWithFormAvatar.setLoadingInterface(1)
  api
    .updateAvatar(newAvatar)
    .then((data) => {
      userInfo.renderNewAvatar(data)
      popupWithFormAvatar.close()
    })
    .catch((err) => {
      console.log(`Ошибка при редактировании аватара: ${err}`)
    })
    .finally(() => popupWithFormAvatar.setLoadingInterface(0))
}

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName
  jobInput.value = userInfo.getUserInfo().userJob
  popupWithFormUser.open()
  editProfileFormValidator.clearErrorMessage()
})

function submitEditProfileForm(data) {
  popupWithFormUser.setLoadingInterface(1)
  api
    .editUserInfo(data)
    .then((inputData) => {
      userInfo.setUserInfo(inputData)
      popupWithFormUser.close()
    })
    .catch((err) => {
      console.log(`Ошибка при редактировании профиля: ${err}`)
    })
    .finally(() => popupWithFormUser.setLoadingInterface(0))
}

popupButtonAdd.addEventListener('click', () => {
  popupWithFormCard.open()
  addCardFormValidator.clearErrorMessage()
})

function submitAddCardForm(inputData) {
  popupWithFormCard.setLoadingInterface(1)
  api
    .createNewCard(inputData)
    .then((card) => {
      cardsList.addNewItem(createCard(card))
      popupWithFormCard.close()
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`)
    })
    .finally(() => popupWithFormCard.setLoadingInterface(0))
}

function createCard(data) {
  const newCardElement = new Card(
    {
      data,
      handleCardClick: (link, name) => {
        popupWithImage.open(link, name)
      },
      handleCardLike: (card, checkMyLike) => {
        if (checkMyLike) {
          return api
            .deleteLike(card._id)
            .then((newCardData) => {
              newCardElement.updateCardData(newCardData)
              newCardElement.setLikeDisabled()
              return newCardData
            })
            .catch((err) => console.log(`Ошибка при удалении лайка: ${err}`))
        }
        {
          return api
            .likeCard(card._id)
            .then((newCardData) => {
              newCardElement.updateCardData(newCardData)
              newCardElement.setLikeActive()
              return newCardData
            })
            .catch((err) => console.log(`Ошибка при доавлении лайка: ${err}`))
        }
      },
      handleCardDelete: (cardId, cardElement) => {
        cardInfoSubmit.open()
        cardInfoSubmit.setSubmitAction(() => {
          api
            .removeCard(cardId)
            .then(() => {
              cardElement.remove()
              cardInfoSubmit.close()
            })
            .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
        })
      },
    },
    '.template',
    myId
  )
  const cardElement = newCardElement.generateCard()
  return cardElement
}
addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
loadAvatarFormValidator.enableValidation()
