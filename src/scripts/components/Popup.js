export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.addEventListener('keydown', this._handlePopupClick);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('keydown', this._handlePopupClick);
  }

  _handlePopupClick(event) {
    const targetObject = event.target.classList;
    if (targetObject.contains('popup_opened') || targetObject.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => this._handlePopupClick(evt));
  }
}
