import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__titleshow');
  }

  open({ name, link }) {
    this._image.alt = name;
    this._image.src = link;
    this._title.textContent = name;

    super.open();
  }
}
