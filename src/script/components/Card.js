//класс, который хранит разметку карточки и наполняет его уникальным содержанием
export class Card {
  constructor(
    data, 
    templateSelector, 
    handleCardClick,
    //handleCardLike,
    handleCardDelete,
    myId
    ) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._ownerId = data.owner._id
    this._templateSelector = templateSelector
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)
    this._imageElement = this._element.querySelector('.element__image')
    this._likeElement = this._element.querySelector('.element__like')
    this._deleteElement = this._element.querySelector('.element__delete')
    this.handleCardClick = handleCardClick
    //this.handleCardLike = handleCardLike
    this.handleCardDelete = handleCardDelete
    this._myId = myId
  }

  // _deleteButtonHandler = () => this._element.remove()

  _likeButtonHandler() {
    this._likeElement.classList.toggle('element__like_active')
  }

  _setEventListeners() {
    this._deleteElement.addEventListener('click', () => {
      // this._deleteButtonHandler()
      console.log(this._myId);
      this.handleCardDelete()
    })
    this._likeElement.addEventListener('click', () => {
      this._likeButtonHandler()
    })
    this._imageElement.addEventListener('click', () => this.handleCardClick(this._link, this._name))
  }
  //Отображение количества лайков карточки
  _setLikes() {
    if (this._likes.length) {
      const span = document.createElement('span')
      span.classList.add('element__like-count')
      this._likeElement.after(span)
      span.textContent = this._likes.length
    }
  }
  //Иконка удаления была только на созданных вами карточках
  _checkUserId () {
    if (!this._ownerId === this._myId) {this._deleteElement.remove()}
  }
  generateCard() {
    this._setEventListeners() // добавим обработчики
    this._setLikes() // если есть лайки, покажем сколько их
    this._checkUserId () // если карточка не пользователя - удалить элемент корзинка
    this._element.querySelector('.element__title').textContent = this._name
    this._imageElement.alt = this._name
    this._imageElement.src = this._link
    return this._element
  }
}
