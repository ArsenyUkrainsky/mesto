import { initialCards } from '../script/utils/constants.js'
import { objectValidation } from '../script/utils/constants.js'
import { Card } from '../script/components/Card.js'
import { FormValidator } from '../script/components/FormValidator.js'
import { openPopup } from '../script/utils/utils.js'
import { closePopup } from '../script/utils/utils.js'
import { Section } from '../script/components/Section.js'

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
const containerSelector = document.querySelector('.elements__places')
const popups = document.querySelectorAll('.popup')
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

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '.template').generateCard()
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
        const card = new Card(dataValue, '.template').generateCard()
        cardNew.addItemNew(card)
      },
    },
    containerSelector
  )
  cardNew.renderItems()
  formElementCards.reset()
  closePopup(popupCards)
}

const addCardFormValidator = new FormValidator(objectValidation, formElementCards)
const editProfileFormValidator = new FormValidator(objectValidation, formElementEdit)

addCardFormValidator.enableValidation()
editProfileFormValidator.enableValidation()
