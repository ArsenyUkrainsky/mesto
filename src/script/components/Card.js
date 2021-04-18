//класс, который хранит разметку карточки и наполняет его уникальным содержанием
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    this._imageElement = this._element.querySelector('.element__image')
    this._likeElement = this._element.querySelector('.element__like')
    this.handleCardClick = handleCardClick
  }

  _deleteButtonHandler = () => this._element.remove()

  _likeButtonHandler() {
    this._likeElement.classList.toggle('element__like_active')
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteButtonHandler()
    })
    this._likeElement.addEventListener('click', () => {
      this._likeButtonHandler()
    })
    this._imageElement.addEventListener('click', () =>
      this.handleCardClick(this._link, this._name)
    )
  }

  generateCard() {
    this._setEventListeners() // добавим обработчики
    this._element.querySelector('.element__title').textContent = this._name
    this._imageElement.alt = this._name
    this._imageElement.src = this._link
    return this._element
  }
}
