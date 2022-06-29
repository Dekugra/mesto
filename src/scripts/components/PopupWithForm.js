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

  loadingSavingProgress() {
    this._previousContent = this._submitButton.textcontent;
    this.close();
    this._submitButton.textcontent = 'Сохранение...';
    this.open();
    return () => (this._submitButton.textcontent = this._previousContent);
  }

  loadingChangimgProgress() {
    this._previousContent = this._submitButton.textcontent;
    this.close();
    this._submitButton.textcontent = 'Обновление...';
    this.open();
    return () => (this._submitButton.textcontent = this._previousContent);
  }

  loadingDeletingProgress() {
    this._previousContent = this._submitButton.textcontent;
    this.close();
    this._submitButton.textcontent = 'Удаление...';
    this.open();
    return () => (this._submitButton.textcontent = this._previousContent);
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
      this.close();
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
