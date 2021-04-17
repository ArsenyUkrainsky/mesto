import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._openedImage = this._popupSelector.querySelector('.popup__image')
    this._popupImageText = this._popupSelector.querySelector('.popup__title-img')
  }
  open(src, alt) {
    super.open()
    this._openedImage.src = src
    this._popupImageText.alt = alt
    this._popupImageText.textContent = alt
  }
}
