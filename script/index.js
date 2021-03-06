const popupButtonEdit = document.querySelector('.profile__button-edit') // Переменная для выбора кнопки редактирования
const popupButtonAdd = document.querySelector('.profile__button-add') // Переменная для выбора кнопки добавления
const popupButtonCloseProfile = document.querySelector('#closeProfile') // Переменная для выбора кнопки закрытия окна
const popupButtonCloseCards = document.querySelector('#closeCards') // Переменная для выбора кнопки закрытия окна
const popupUser = document.querySelector('#user') // Переменная для окна попап профиля
const popupCards = document.querySelector('#cards') // Переменная для окна попап cards
const scrollsw = document.querySelector('.root') // Переменная для переключения скролла страницы во время просмотра окна
const formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector() Элемент формы в DOM
const nameInfo = document.querySelector('.profile__info-name') // Выберите элементы, куда должны быть вставлены значения полей
const jobCharacteristic = document.querySelector('.profile__characteristic') // Выберите элементы, куда должны быть вставлены значения полей
const nameInput = formElement.querySelector('.popup__field_input_name') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода имени
const jobInput = formElement.querySelector('.popup__field_input_characteristic') // Воспользуйтесь инструментом .querySelector() Из формы выбираем поле ввода профессии





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
// переменная куда вставлять результат
const container = document.querySelector('.elements__places')
function createCard(item) {
  return `
  <li class="element">
    <img src=${item.link} alt=${item.name} class="element__image" />
    <div class="element__group">
      <h2 class="element__title">${item.name}</h2>
      <button type="button" class="element__like"></button>
    </div>
  </li>
  `
}
// перебор массива
// на выходе нужен измененный массив
// результирующий массив - строки
// нужно отрендерить массив, на каждом объекте шаблонная строка
function renderList() {
  const result = initialCards.map(createCard).join('')
  //  превращает строку в разметку
  container.insertAdjacentHTML('afterbegin', result)
}

renderList()



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


function addCardListener(evt) {
  evt.preventDefault()
  const inputCardName = formElement.querySelector('.popup__field_input_place')
  const inputCardUrl = formElement.querySelector('.popup__field_input_url')
  const inputTitle = inputCardName.value
  const inputUrl = inputCardUrl.value

  const newCardName = createCard({name: inputTitle})
  container.insertAdjacentHTML('afterbegin', newCardName)

  inputCardName.value = ''
}

popupButtonAdd.addEventListener('submit', addCardListener)