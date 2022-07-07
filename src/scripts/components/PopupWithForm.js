import { settingsObject } from '../utils/constants.js';
import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);

    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(settingsObject.formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(settingsObject.inputSelector));

    this._saveAvatarBatton = document.querySelector('.popup__submit_type_editavatar');
    this._editProfileBatton = document.querySelector('.popup__submit_type_editprofile');
    this._addCardBatton = document.querySelector('.popup__submit_type_addcard');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveAvatarBatton.textContent = 'Сохранение...';
      this._editProfileBatton.textContent = 'Сохранение...';
      this._addCardBatton.textContent = 'Создание...';
    } else {
      this._saveAvatarBatton.textContent = 'Сохранить';
      this._editProfileBatton.textContent = 'Сохранить';
      this._addCardBatton.textContent = 'Создать';
    }
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
