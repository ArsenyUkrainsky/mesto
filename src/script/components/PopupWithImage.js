import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._openedImage = this._popup.querySelector('.popup__image')
    this._popupImageText = this._popup.querySelector('.popup__title-img')
  }
  open(link, name) {
    this._openedImage.src = link
    this._popupImageText.alt = name
    this._popupImageText.textContent = name
    super.open()
  }
}
