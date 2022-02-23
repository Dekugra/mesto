const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.error-massage',
  errorClass: 'error-massage_visible',
};

function validateOpenForm(form) {
  const errorMessage = form.querySelectorAll(settingsObject.errorSelector);
  errorMessage.forEach((item) => {
    item.textContent = '';
    item.classList.remove(settingsObject.errorClass);
  });
  const errorInput = form.querySelectorAll(settingsObject.inputSelector);
  errorInput.forEach((item) => {
    item.classList.remove(settingsObject.inputErrorClass);
  });
}

function checkButtonValidity(form, button, buttonClass) {
  if (!form.checkValidity()) {
    button.setAttribute('disabled', '');
    button.classList.add(buttonClass);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(buttonClass);
  }
}

function setInputValid(item, errorMessage, inputErrorClass, messageErrorClass) {
  errorMessage.textContent = '';
  errorMessage.classList.remove(messageErrorClass);
  item.classList.remove(inputErrorClass);
}

function setInputInvalid(item, errorMessage, inputErrorClass, messageErrorClass) {
  errorMessage.textContent = item.validationMessage;
  errorMessage.classList.add(messageErrorClass);
  item.classList.add(inputErrorClass);
}

function checkInputValidity(input, settingsObject, form, button) {
  const currentForm = input.closest(settingsObject.formSelector);
  const errorMessage = currentForm.querySelector(`#error-${input.id}`);
  if (input.validity.valid) setInputValid(input, errorMessage, settingsObject.inputErrorClass, settingsObject.errorClass);
  else setInputInvalid(input, errorMessage, settingsObject.inputErrorClass, settingsObject.errorClass);
  checkButtonValidity(form, button, settingsObject.inactiveButtonClass);
}

function enableValidation(set) {
  const formList = document.querySelectorAll(set.formSelector);
  formList.forEach((formElement) => {
    const inputList = formElement.querySelectorAll(set.inputSelector);
    const submitButton = formElement.querySelector(set.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => checkInputValidity(inputElement, set, formElement, submitButton));
      inputElement.addEventListener('keydown', (evt) => evt.stopPropagation());
    });
  });
}

enableValidation(settingsObject);
