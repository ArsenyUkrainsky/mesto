import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('#popup-submit')
    this._submitButton = this._form.querySelector('.popup__submit')
    this._submitButtonTextDefault = this._submitButton.textContent
  }

  setLoadingInterface(state, buttonText = `Удаление...`) {
    if (state) {
      this._submitButton.textContent = buttonText
    } else {
      this._submitButton.textContent = this._submitButtonTextDefault
    }
    return
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
    super.setEventListeners()
  }
  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }
}
