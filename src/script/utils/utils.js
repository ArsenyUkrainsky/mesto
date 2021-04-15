export const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keyup', closeByEscape)
}
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keyup', closeByEscape)
}
// Закрытие попапа нажатием на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
