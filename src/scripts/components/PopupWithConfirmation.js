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

  _handlePopupClick(event) {
    const targetObject = event.target.classList;
    if (targetObject.contains('popup_opened') || targetObject.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', (ev) => {
      this.renderLoading(true);
    });
  }
}
