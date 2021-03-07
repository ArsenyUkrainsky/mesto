const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

const popupButtonEdit = document.querySelector('.profile__button-edit') // Переменная для выбора кнопки редактирования
const popupButtonAdd = document.querySelector('.profile__button-add') // Переменная для выбора кнопки добавления
const popupButtonCloseProfile = document.querySelector('#closeProfile') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseCards = document.querySelector('#closeCards') // Переменная для выбора кнопки закрытия окна
const popupUser = document.querySelector('#user') // Переменная для окна попап профиля
const popupCards = document.querySelector('#cards') // Переменная для окна попап cards
const scrollsw = document.querySelector('.root') // Переменная для переключения скролла страницы во время просмотра окна

const nameInfo = document.querySelector('.profile__info-name') // Выберите элементы, куда должны быть вставлены значения полей
const jobCharacteristic = document.querySelector('.profile__characteristic') // Выберите элементы, куда должны быть вставлены значения полей

const formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector() Элемент формы в DOM
const formElementCards = document.querySelector('.popup__form_cards')
const nameInput = formElement.querySelector('.popup__field_input_name') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода имени
const jobInput = formElement.querySelector('.popup__field_input_characteristic') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода профессии
const container = document.querySelector('.elements__places')
const templateElement = document.querySelector('.template')


function deleteButtonHandler(evt){
  const elementCardRemove = evt.target.closest('.element')
  elementCardRemove.remove()
}


function likeButtonHandler(evt){
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

  const newCard = createCardDomNode({name: inputCardNameValue, link: inputCardUrlValue})
  

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