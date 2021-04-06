import { openPopupImage } from './index.js'
//класс, который хранит разметку карточки и наполняет его уникальным содержанием
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  _deleteButtonHandler = () => this._element.remove()

  _likeButtonHandler = () =>
    this._element.querySelector('.element__like').classList.toggle('element__like_active')

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteButtonHandler()
    })
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeButtonHandler()
    })
    this._element.querySelector('.element__image').addEventListener('click', openPopupImage)
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners() // добавим обработчики
    this._element.querySelector('.element__title').textContent = this._name
    this._element.querySelector('.element__image').alt = this._name
    this._element.querySelector('.element__image').src = this._link
    return this._element
  }
}
