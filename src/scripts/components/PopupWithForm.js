import { settingsObject } from '../initial-data.js';
import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);

    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(settingsObject.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(settingsObject.inputSelector));
  }

  getInputValues() {
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
      this._formSubmit(this.getInputValues());
      this.close();
    });
  }

  getForm() {
    return this._form;
  }

  setInputValues(values) {
    this._inputList.forEach((inputElement) => {
      const value = values[inputElement.name];
      inputElement.value = value;
    });
  }
}
