const popupButtonEdit = document.querySelector('.profile__button-edit') // Переменная для выбора кнопки редактирования
const popupButtonAdd = document.querySelector('.profile__button-add') // Переменная для выбора кнопки добавления
const popupUser = document.querySelector('#user') // Переменная для окна попап профиля
const popupCards = document.querySelector('#cards') // Переменная для окна попап cards
const popupImage = document.querySelector('#image')
const openedImage = popupImage.querySelector('.popup__image')
const popupImageText = popupImage.querySelector('.popup__title-img')
// const scrollsw = document.querySelector('.root') // Переменная для переключения скролла страницы во время просмотра окна
const nameInfo = document.querySelector('.profile__info-name') // Выберите элементы, куда должны быть вставлены значения полей
const jobCharacteristic = document.querySelector('.profile__characteristic') // Выберите элементы, куда должны быть вставлены значения полей
const formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector() Элемент формы в DOM
const formElementCards = document.querySelector('.popup__form_cards')
const inputCardName = formElementCards.querySelector('.popup__field_input_place')
const inputCardUrl = formElementCards.querySelector('.popup__field_input_url')
const nameInput = formElement.querySelector('.popup__field_input_name') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода имени
const jobInput = formElement.querySelector('.popup__field_input_characteristic') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода профессии
const container = document.querySelector('.elements__places')
const templateElement = document.querySelector('.template')
const popups = document.querySelectorAll('.popup')
// Открытие попапа с картинкой
function openPopupImage(item) {
  openedImage.setAttribute('src', item.link)
  openedImage.setAttribute('alt', item.name)
  popupImageText.textContent = item.name
  openPopup(popupImage)
}

// Удаление карточки
function deleteButtonHandler(evt) {
  const elementCardRemove = evt.target.closest('.element')
  elementCardRemove.remove()
}
// Лайк карточки
/* function likeButtonHandler(evt) {
  const elementCardLike = evt.target.closest('.element')
  // console.log(elementCardLike)
  const elementLike = elementCardLike.querySelector('.element__like')
  // console.log(elementLike)
  elementLike.classList.toggle('element__like_active')
} */
// через делегирование
container.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle('element__like_active')
  }
})
// console.log(templateElement)
// Создание из шаблона(template) карточки
function createCard(item) {
  // содержимое тега template целиком
  const newItem = templateElement.content.cloneNode(true)
  const title = newItem.querySelector('.element__title')
  const elementImage = newItem.querySelector('.element__image')
  const deleteButton = newItem.querySelector('.element__delete')
  // const likeButton = newItem.querySelector('.element__like')

  title.textContent = item.name
  elementImage.setAttribute('alt', item.name)
  elementImage.setAttribute('src', item.link)

  deleteButton.addEventListener('click', deleteButtonHandler)
  // likeButton.addEventListener('click', likeButtonHandler)
  elementImage.addEventListener('click', () => {
    openPopupImage(item)
  })

  // console.log(elementImage)
  return newItem
}
// console.log(createCard)
// Рендер всего списка карточек
function renderInitialCards() {
  const result = initialCards.map((item) => {
    const newCard = createCard(item)
    // console.log(item)
    return newCard
  })
  container.append(...result)
}
// Рендер одной новой карточки
function submitAddCardForm(evt) {
  evt.preventDefault()
  // получить из массива название и ссылку на картинку
  const newCard = createCard({ name: inputCardName.value, link: inputCardUrl.value })
  container.prepend(newCard)
  closePopup(popupCards)
}
renderInitialCards()
// три попапа - для создания карточки (1), для редактирования данных пользователя (2) и для при открытия картинки в большом размере (3).
// Каждый попап хранится в своей переменной функция openPopup, которая будет принимать в качестве аргумента указание, какой именно попап надо открыть или закрыть.
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}
const closePopup = (popup) => {
  clearErrorMessage(popup)
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}
popupButtonEdit.addEventListener('click', () => {
  // занести данные в поля ввода
  nameInput.value = nameInfo.textContent
  jobInput.value = jobCharacteristic.textContent
  openPopup(popupUser)
  const list = Array.from(popupUser.querySelectorAll('.popup__field'))
  const button = popupUser.querySelector('.popup__submit')
  toggleButton(list, button, objectValidation)
})
popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
  openPopup(popupCards)
  const list = Array.from(popupCards.querySelectorAll('.popup__field'))
  const button = popupCards.querySelector('.popup__submit')
  toggleButton(list, button, objectValidation)
})

// обратное действие, занести введенные данные
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  closePopup(popupUser)
}
formElement.addEventListener('submit', submitEditProfileForm)
formElementCards.addEventListener('submit', submitAddCardForm)
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

// Закрытие попапа нажатием на Esc

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
const clearErrorMessage = (popup) => {
  const errorText = popup
    .querySelectorAll('.popup__error')
    .forEach((element) => (element.textContent = ''))
  const errorArea = popup
    .querySelectorAll('.popup__field')
    .forEach((element) => element.classList.remove('popup__field_type_error'))
}
