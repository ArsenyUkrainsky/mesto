import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._submit = this._popupSelector.querySelector('#popup-submit')
  }
  setEventListeners() {
    this._submit.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
    super.setEventListeners()
  }
  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }
}
