export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  _handlePopupClick(event) {
    const targetObject = event.target.classList;
    if (targetObject.contains('popup_opened') || targetObject.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => this._handlePopupClick(evt));
  }
}
