import { objectValidation } from './objectValidation.js'
export class FormValidator {
  constructor(objectValidation, validationForm) {
    this._formSelector = objectValidation.formSelector
    this._inputSelector = objectValidation.inputSelector
    this._submitButtonSelector = objectValidation.submitButtonSelector
    this._inactiveButtonClass = objectValidation.inactiveButtonClass
    this._inputErrorMessage = objectValidation.inputErrorMessage
    this._inputError = objectValidation.inputError
    this._textError = objectValidation.textError
    this._validationForm = validationForm //элемент той формы, которая валидируется
  }

  _checkInputEmpty() {
    return !Array.from(this._inputList).some((inputElement) => inputElement.value.length > 0)
  }

  _hasInvalidInput() {
    //console.log(Array.isArray((this._inputList)))
    return Array.from(this._inputList).some((inputElement) => !inputElement.validity.valid)
  }

  _toggleButton() {
    if (this._hasInvalidInput() || this._checkInputEmpty()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _showError(inputElement) {
    const errorElement = inputElement.getAttribute('name')
    const errorPlace = this._validationForm.querySelector(`#${errorElement}-error`)
    errorPlace.textContent = inputElement.validationMessage
    errorPlace.classList.add(this._inputErrorMessage)
    inputElement.classList.add(this._inputError)
  }

  _hideError(inputElement) {
    const errorElement = inputElement.getAttribute('name')
    const errorPlace = this._validationForm.querySelector(`#${errorElement}-error`)
    errorPlace.textContent = ''
    errorPlace.classList.remove(this._inputErrorMessage)
    inputElement.classList.remove(this._inputError)
  }

  _checkInput(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement)
    } else {
      this._showError(inputElement)
    }
  }

  _setInputListeners() {
    this._inputList = this._validationForm.querySelectorAll(this._inputSelector)
    this._buttonElement = this._validationForm.querySelector(this._submitButtonSelector)
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInput(inputElement)
        this._checkInputEmpty()
        this._toggleButton()
      })
    })
  }

  enableValidation() {
    this._validationForm.addEventListener('submit', (evt) => evt.preventDefault())
    this._setInputListeners()
  }

  clearErrorMessage() {
    const errorText = this._validationForm
      .querySelectorAll(this._textError)
      .forEach((err) => (err.textContent = ''))
    const errorArea = this._validationForm
      .querySelectorAll(this._inputSelector)
      .forEach((err) => err.classList.remove(this._inputError))
      this._toggleButton()
  }
}
