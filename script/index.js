const initialCards = [
  {
    name: 'Вакаяма, Япония',
    link: 'https://images.unsplash.com/photo-1614913501059-9fb836fe1769?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80',
  },
  {
    name: 'Копенгаген, Дания',
    link:
      'https://images.unsplash.com/photo-1613724131628-a20a5b0a4b91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80',
  },
  {
    name: 'Эгюий-дю-Миди, Шамони-Монблан, Франция',
    link: 'https://images.unsplash.com/photo-1612993232871-47e86e7de1f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'озеро Брайес',
    link:
      'https://images.unsplash.com/photo-1604598879394-87da8999e7bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

const popupButtonEdit = document.querySelector('.profile__button-edit') // Переменная для выбора кнопки редактирования
const popupButtonAdd = document.querySelector('.profile__button-add') // Переменная для выбора кнопки добавления
const popupButtonCloseProfile = document.querySelector('#close-profile') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseCards = document.querySelector('#close-cards') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseImage = document.querySelector('#close-image')
const popupUser = document.querySelector('#user') // Переменная для окна попап профиля
const popupCards = document.querySelector('#cards') // Переменная для окна попап cards
const popupImage = document.querySelector('#image')
const scrollsw = document.querySelector('.root') // Переменная для переключения скролла страницы во время просмотра окна

const nameInfo = document.querySelector('.profile__info-name') // Выберите элементы, куда должны быть вставлены значения полей
const jobCharacteristic = document.querySelector('.profile__characteristic') // Выберите элементы, куда должны быть вставлены значения полей

const formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector() Элемент формы в DOM
const formElementCards = document.querySelector('.popup__form_cards')
const nameInput = formElement.querySelector('.popup__field_input_name') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода имени
const jobInput = formElement.querySelector('.popup__field_input_characteristic') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода профессии
const container = document.querySelector('.elements__places')
const templateElement = document.querySelector('.template')

function openPopupImage(evt) {
  // console.log(evt)
  const openedImage = popupImage.querySelector('.popup__image')
  const imageUrl = evt.target.getAttribute('src')
  openedImage.setAttribute('src', imageUrl)
  const imageText = evt.target.closest('.element').querySelector('.element__title').textContent
  // console.log(imageText)
  const popupImageText = popupImage.querySelector('.popup__title')
  // console.log(popupImageText)
  popupImageText.textContent = imageText
  togglePopupWindow(popupImage)
}

function deleteButtonHandler(evt) {
  const elementCardRemove = evt.target.closest('.element')
  elementCardRemove.remove()
}

function likeButtonHandler(evt) {
  const elementCardLike = evt.target.closest('.element')
  // console.log(elementCardLike)
  const elementLike = elementCardLike.querySelector('.element__like')
  // console.log(elementLike)
  elementLike.classList.toggle('element__like_active')
}

function addCardListeners(card) {
  // console.log('события на месте=:-)')
  deleteButton = card.querySelector('.element__delete')
  deleteButton.addEventListener('click', deleteButtonHandler)
  likeButton = card.querySelector('.element__like')
  likeButton.addEventListener('click', likeButtonHandler)
}

// console.log(templateElement)

// Создание из шаблона карточки
function createCardDomNode(item) {
  const newItem = templateElement.content.cloneNode(true)
  const title = newItem.querySelector('.element__title')
  const elementImage = newItem.querySelector('.element__image')
  title.textContent = item.name
  elementImage.setAttribute('alt', item.name)
  elementImage.setAttribute('src', item.link)
  elementImage.addEventListener('click', openPopupImage)

  // console.log(elementImage)

  return newItem
}
// Рендер всего списка карточек
function renderCards() {
  const result = initialCards.map((item) => {
    const newCard = createCardDomNode(item)
    addCardListeners(newCard)
    // console.log(item)
    return newCard
  })
  container.append(...result)
}
// Рендер одной новой карточки
function addFormCardListener(evt) {
  evt.preventDefault()

  const inputCardName = formElementCards.querySelector('.popup__field_input_place')
  const inputCardNameValue = inputCardName.value
  const inputCardUrl = formElementCards.querySelector('.popup__field_input_url')
  const inputCardUrlValue = inputCardUrl.value

  const newCard = createCardDomNode({ name: inputCardNameValue, link: inputCardUrlValue })

  addCardListeners(newCard)

  container.prepend(newCard)
  togglePopupWindow(popupCards)
}
renderCards()

const togglePopupWindow = (popup) => {
  popup.classList.toggle('popup_opened')
  scrollsw.classList.toggle('root_scroll')
}
popupButtonEdit.addEventListener('click', () => {
  togglePopupWindow(popupUser)
})
popupButtonAdd.addEventListener('click', () => {
  togglePopupWindow(popupCards)
})
popupButtonCloseProfile.addEventListener('click', () => {
  togglePopupWindow(popupUser)
})
popupButtonCloseCards.addEventListener('click', () => {
  togglePopupWindow(popupCards)
})
popupButtonCloseImage.addEventListener('click', () => {
  togglePopupWindow(popupImage)
})

nameInput.value = nameInfo.textContent
jobInput.value = jobCharacteristic.textContent

function formSubmitHandler(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  togglePopupWindow(popupUser)
}

formElement.addEventListener('submit', formSubmitHandler)

formElementCards.addEventListener('submit', addFormCardListener)
