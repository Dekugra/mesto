import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._deleteButton = this._popup.querySelector('.popup__submit_type_deletecard');
  }

  renderLoading(isLoading) {
    if (isLoading) this._deleteButton.textContent = 'Удаление...';
    else this._deleteButton.textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this.renderLoading(true);
      this.close();
    });
  }

  submitButton() {
    return this._deleteButton;
  }
}
