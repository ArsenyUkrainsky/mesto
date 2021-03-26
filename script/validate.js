const objectValidation = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__field', // селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit', // селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__submit_disabled', // класс модификатор для дизэйбла кнопки
  inputErrorMessage: 'popup__error_active', // селектор контейнеров для ошибок этой формы
  inputError: 'popup__field_type_error', // класс модификатор для инпутов при возникновении ошибки
}
// 8. функция проверит по списку инпутов все ли они пустые или нет
const checkInputEmpty = (inputList) => {
  //   return !inputList.some(inputElement => inputElement.value.length > 0)
  for (index in inputList) {
    if (inputList[index].value.length > 0) {
      return false
    }
  }
  return true
}
// 7. хотя бы один из инпутов невалидный
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}
// 6. переключить состояние кнопки в форме
const toggleButton = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList) || checkInputEmpty(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}
// 5. показать ошибки
const showError = (formElement, inputElement, object) => {
  const errorElement = inputElement.getAttribute('name')
  const errorPlace = formElement.querySelector(`#${errorElement}-error`)
  //   console.log(errorPlace)
  errorPlace.textContent = inputElement.validationMessage
  errorPlace.classList.add(object.inputErrorMessage)
  inputElement.classList.add(object.inputError)
}
// 4. скрыть ошибки
const hideError = (formElement, inputElement, object) => {
  const errorElement = inputElement.getAttribute('name')
  const errorPlace = formElement.querySelector(`#${errorElement}-error`)
  //   console.log(errorPlace)
  errorPlace.textContent = ''
  errorPlace.classList.remove(object.inputErrorMessage)
  inputElement.classList.remove(object.inputError)
}

// 3. проверка валидности данных
const checkInput = (formElement, inputElement, object) => {
  if (inputElement.validity.valid) {
    // поле валидно
    hideError(formElement, inputElement, object)
  } else {
    // не прошло валидацию
    showError(formElement, inputElement, object)
  }
}
// 2. обработчики на все поля форм
const setInputListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector))
  const buttonElement = formElement.querySelector(object.submitButtonSelector)
  // Навесить обработчики событий полей
  // функция внутри каждой формы проходит по всем инпутам и
  // накладывает на них обработчики события ввода текста в поле
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // проверить состояние поля валидно или не валидно поле
      // а так же переключить состояние кнопки
      checkInput(formElement, inputElement, object) // проверка валидности конкретно этого инпута
      toggleButton(inputList, buttonElement, object) // переключение состояния кнопки
      checkInputEmpty(inputList) // проверка на то, есть ли невалидные поля в форме
    })
    //     checkInput(formElement, inputElement, object)
    /* toggleButton(inputList, buttonElement, object)
    checkInputEmpty(inputList)
    hideError(formElement, inputElement, object) */
    
  })
}
// 1. включить валидацию из списка форм получить один элемент формы
// все настройки передаются при вызове
// универсально для всех форм
// отменить событие по умолчанию
const enableValidation = (object) => {
  // найти все формы
  const formList = Array.from(document.querySelectorAll(object.formSelector))
  formList.forEach((formElement) => {
    // обработчик для каждой формы чтобы она не сабмитилась
    formElement.addEventListener('submit', (evt) => evt.preventDefault())
    //  console.log(formElement)
    // навесить слушатели полей
    setInputListeners(formElement, object)
  })
}
enableValidation(objectValidation)
