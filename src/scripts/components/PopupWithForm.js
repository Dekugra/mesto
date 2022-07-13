import { settingsObject } from '../utils/constants.js';
import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);

    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(settingsObject.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(settingsObject.inputSelector));
    this._submitButton = this._form.querySelector(settingsObject.submitButtonSelector);
  }

  renderLoading(isLoading) {
    if (isLoading && (this._form.classList.contains = 'popup__form_type_editavatar')) return (this._submitButton.textContent = 'Сохранение...');
    if (!isLoading && (this._form.classList.contains = 'popup__form_type_editavatar')) return (this._submitButton.textContent = 'Сохранить');
    if (isLoading && (this._form.classList.contains = 'popup__form_type_edit')) return (this._submitButton.textContent = 'Сохранение...');
    if (!isLoading && (this._form.classList.contains = 'popup__form_type_edit')) return (this._submitButton.textContent = 'Сохранить');
    if (isLoading && (this._form.classList.contains = 'popup__form_type_addcard')) return (this._submitButton.textContent = 'Создание...');
    if (!isLoading && (this._form.classList.contains = 'popup__form_type_addcard')) return (this._submitButton.textContent = 'Создать');
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputsValues[inputElement.name] = inputElement.value;
    });
    return this._inputsValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  getForm() {
    return this._form;
  }

  setInputValues(object) {
    this._inputList.forEach((inputElement) => {
      const value = object[inputElement.name];
      inputElement.value = value;
    });
  }
}
