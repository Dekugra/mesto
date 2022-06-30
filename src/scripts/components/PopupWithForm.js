import { settingsObject } from '../initial-data.js';
import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);

    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(settingsObject.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(settingsObject.inputSelector));
    this._submitButton = this._form.querySelector('.popup__submit');
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
      setTimeout(() => {
        this.close();
        if (this._submitButton.classList.contains('popup__submit_type_editprofile')) return (this._submitButton.textContent = 'Сохранить');
        if (this._submitButton.classList.contains('popup__submit_type_addcard')) return (this._submitButton.textContent = 'Создать');
        if (this._submitButton.classList.contains('popup__submit_type_editavatar')) return (this._submitButton.textContent = 'Сохранить');
        if (this._submitButton.classList.contains('popup__submit_type_deletecard')) return (this._submitButton.textContent = 'Да');
      }, 2000);
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
