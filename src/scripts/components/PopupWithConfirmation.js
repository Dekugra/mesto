import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._deleteButton = this._popup.querySelector('.popup__submit_type_deletecard');
    this._textSubmitButton = this._deleteButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) this._deleteButton.textContent = 'Удаление...';
    else this._deleteButton.textContent = this._textSubmitButton;
  }

  setSubmitHeandler(heandleSubmit) {
    this._heandleSubmit = heandleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this.renderLoading(true);
      this._heandleSubmit();
    });

    return this._deleteButton;
  }
}
