import { openPopup } from '../index.js'

const popupImage = document.querySelector('#image')
const openedImage = popupImage.querySelector('.popup__image')
const popupImageText = popupImage.querySelector('.popup__title-img')
// Открытие попапа с картинкой
export function openPopupImage(evt) {
  openedImage.setAttribute('src', evt.target.getAttribute('src'))
  openedImage.setAttribute('alt', evt.target.getAttribute('alt'))
  popupImageText.textContent = evt.target.getAttribute('alt')
  openPopup(popupImage)
}
