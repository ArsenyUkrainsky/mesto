import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, callBackSubmitForm) {
    super(popupSelector)
    this._callBackSubmitForm = callBackSubmitForm
    this._form = this._popupSelector.querySelector('.popup__form')
  }

  _submitForm = (evt) => {
    evt.preventDefault()
    this._callBackSubmitForm(data)
  }
  setEventListeners() {
    super.setEventListeners()
    //this._form.addEventListener('submit', this._submitForm)
  }
}
