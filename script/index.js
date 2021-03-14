const popupButtonEdit = document.querySelector('.profile__button-edit') // Переменная для выбора кнопки редактирования
const popupButtonAdd = document.querySelector('.profile__button-add') // Переменная для выбора кнопки добавления
const popupButtonCloseProfile = document.querySelector('#close-profile') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseCards = document.querySelector('#close-cards') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseImage = document.querySelector('#close-image')
const popupUser = document.querySelector('#user') // Переменная для окна попап профиля
const popupCards = document.querySelector('#cards') // Переменная для окна попап cards
const popupImage = document.querySelector('#image')
const openedImage = popupImage.querySelector('.popup__image')
const popupImageText = popupImage.querySelector('.popup__title-img')
const scrollsw = document.querySelector('.root') // Переменная для переключения скролла страницы во время просмотра окна
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
// Открытие попапа с картинкой
function openPopupImage(evt) {
  // console.log(evt)
  const imageUrl = evt.target.getAttribute('src')
  const imageAltText = evt.target.getAttribute('alt')
  openedImage.setAttribute('src', imageUrl)
  openedImage.setAttribute('alt', imageAltText)
  const imageText = evt.target.closest('.element').querySelector('.element__title').textContent
  // console.log(imageText)
  // console.log(popupImageText)
  popupImageText.textContent = imageText
  togglePopupWindow(popupImage)
}
// Удаление карточки
function deleteButtonHandler(evt) {
  const elementCardRemove = evt.target.closest('.element')
  elementCardRemove.remove()
}
// Лайк карточки
function likeButtonHandler(evt) {
  const elementCardLike = evt.target.closest('.element')
  // console.log(elementCardLike)
  const elementLike = elementCardLike.querySelector('.element__like')
  // console.log(elementLike)
  elementLike.classList.toggle('element__like_active')
}
// console.log(templateElement)
// Создание из шаблона(template) карточки
function createCard(item) {
  // содержимое тега template целиком
  const newItem = templateElement.content.cloneNode(true)
  const title = newItem.querySelector('.element__title')
  const elementImage = newItem.querySelector('.element__image')
  const deleteButton = newItem.querySelector('.element__delete')
  const likeButton = newItem.querySelector('.element__like')

  title.textContent = item.name
  elementImage.setAttribute('alt', item.name)
  elementImage.setAttribute('src', item.link)

  deleteButton.addEventListener('click', deleteButtonHandler)
  likeButton.addEventListener('click', likeButtonHandler)
  elementImage.addEventListener('click', openPopupImage)

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
  togglePopupWindow(popupCards)
}
renderInitialCards()
// три попапа - для создания карточки (1), для редактирования данных пользователя (2) и для при открытия картинки в большом размере (3).
// Каждый попап хранится в своей переменной функция togglePopupWindow, которая будет принимать в качестве аргумента указание, какой именно попап надо открыть или закрыть.
const togglePopupWindow = (popup) => {
  popup.classList.toggle('popup_opened')
  scrollsw.classList.toggle('root_scroll')
}
popupButtonEdit.addEventListener('click', () => {
  // занести данные в поля ввода
  nameInput.value = nameInfo.textContent
  jobInput.value = jobCharacteristic.textContent
  togglePopupWindow(popupUser)
})
popupButtonAdd.addEventListener('click', () => {
  inputCardName.value = ''
  inputCardUrl.value = ''
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
// обратное действие, занести введенные данные
function submitEditProfileForm(evt) {
  evt.preventDefault()
  nameInfo.textContent = nameInput.value
  jobCharacteristic.textContent = jobInput.value
  togglePopupWindow(popupUser)
}
formElement.addEventListener('submit', submitEditProfileForm)
formElementCards.addEventListener('submit', submitAddCardForm)
