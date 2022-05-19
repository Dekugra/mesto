export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._input = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorSelector = settings.errorSelector;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _setInputValid(input) {
    this._errorMessage = this._form.querySelector(`#error-${input.id}`);

    this._errorMessage.textContent = '';
    this._errorMessage.classList.remove(this._errorClass);
  }

  _setInputInvalid = (input) => {
    this._errorMessage = this._form.querySelector(`#error-${input.id}`);

    this._errorMessage.textContent = input.validationMessage;
    this._errorMessage.classList.add(this._errorClass);
  };

  deactivateSubmitButton = () => {
    this._submitButton.setAttribute('disabled', '');
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _activateSubmitButton = () => {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  _checkButtonValidity = () => {
    if (!this._form.checkValidity()) this.deactivateSubmitButton();
    else this._activateSubmitButton();
  };

  _checkInputValidity = (input) => {
    if (input.validity.valid) this._setInputValid(input);
    else this._setInputInvalid(input);
    this._checkButtonValidity();
  };

  _setEventListener = () => {
    this._checkButtonValidity();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    });
  };

  enableValidation = () => {
    this._setEventListener();
  };

  resetValidation = () => {
    this._checkButtonValidity();
    this._inputList.forEach((inputRlement) => {
      this._setInputValid(inputRlement);
    });
  };
}
