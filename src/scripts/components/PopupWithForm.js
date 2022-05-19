import { settingsObject } from '../initial-data.js';
import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);

    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(settingsObject.formSelector);
    this._inputList = Array.from(this._form.querySelector(settingsObject.inputSelector));
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((inputElement) => {
      this._values[inputElement.name] = inputElement.value;
    });
    return this._values;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  setInputValues(item) {
    this._inputList.forEach((inputElement) => {
      const value = item[inputElement.name];
      if (value) {
        inputElement.value = value;
      }
    });
  }

  getForm() {
    return this._form;
  }
}
