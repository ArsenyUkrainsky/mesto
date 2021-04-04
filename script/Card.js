//класс, который хранит разметку карточки и наполняет его уникальным содержанием
class Card {
  constructor(data, templateSelector) {
    this._data = data
    this._name = data.name
    this._link = data.link
  }
  _getTemplate() {
    const cardElement = document
      .querySelector('.template')
      .content.querySelector('element')
      .cloneNode(true)

    return cardElement
  }
  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.element__title').textContent = this._name
    this._element.querySelector('.element__image').alt = this._name
    this._element.querySelector('.element__image').src = this._link
    return this._element
  }
}
console.log(new Card())
