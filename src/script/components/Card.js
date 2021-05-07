//класс, который хранит разметку карточки и наполняет его уникальным содержанием
export class Card {
  constructor({ data, handleCardClick, handleCardLike, handleCardDelete }, templateSelector, myId) {
    this._data = data
    this._name = this._data.name
    this._link = this._data.link
    this._likes = data.likes //все все все лайки
    this._cardId = this._data._id
    this._ownerId = this._data.owner._id
    this._templateSelector = templateSelector
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    this._imageElement = this._element.querySelector('.element__image')
    this._likeElement = this._element.querySelector('.element__like')
    this._deleteElement = this._element.querySelector('.element__delete')
    this._likeCount = this._element.querySelector('.element__like-count')
    this.handleCardClick = handleCardClick
    this.handleCardLike = handleCardLike
    this.handleCardDelete = handleCardDelete
    this._myId = myId
  }

  updateCardData(newCardData) {
    const counter = newCardData.likes.length
    this._likeCount.textContent = counter
    if (counter == 0) {
      this._likeCount.textContent = ''
    }
    return (this._likes = newCardData.likes)
  }

  setLikeActive() {
    this._likeElement.classList.add('element__like_active')
  }

  setLikeDisabled() {
    this._likeElement.classList.remove('element__like_active')
  }

  _checkLikeId() {
    return this._likes.some((elm) => {
      return elm._id === this._myId
    })
  }

  _setEventListeners() {
    this._deleteElement.addEventListener('click', () => {
      this.handleCardDelete(this._cardId, this._element)
    })
    this._likeElement.addEventListener('click', () => {
      this.handleCardLike(this._data, this._checkLikeId())
    })
    this._imageElement.addEventListener('click', () => this.handleCardClick(this._link, this._name))
  }

  //Отображение количества лайков карточки(если есть лайки, мои - закрасить)
  _setLikes() {
    if (this._likes.length) {
      this._likeCount.textContent = this._likes.length
      if (this._checkLikeId()) {
        this.setLikeActive()
      }
      return
    }
  }

  //Если карточка не моя удалить удалить
  _checkUserId() {
    if (!(this._ownerId == this._myId)) {
      this._deleteElement.remove()
    }
  }

  generateCard() {
    this._setEventListeners() // добавим обработчики
    this._setLikes() // если есть лайки
    this._checkUserId() // если карточка не пользователя - удалить элемент корзинка
    this._element.querySelector('.element__title').textContent = this._name
    this._imageElement.alt = this._name
    this._imageElement.src = this._link
    return this._element
  }
}
