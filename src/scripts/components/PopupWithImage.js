import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__titleshow');
  }

  open(title, src) {
    this._image.src = src;
    this._image.alt = title;
    this._title.textContent = title;

    super.open();
  }
}
