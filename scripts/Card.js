import { popupShowImage, popupShowTitle, popupShow } from './constants.js';
import { openPopup } from './utils.js';
export class Card {
  constructor(name, link, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const card = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);

    return card;
  }

  _handleDelete = () => {
    this._cardElement.remove();
  };

  _handleLike = () => {
    this._likeButton.classList.toggle('element__like_liked');
  };

  _openPopupShow = () => {
    popupShowImage.src = this._link;
    popupShowImage.alt = this._name;
    popupShowTitle.textContent = this._name;

    openPopup(popupShow);
  };

  _setEventListeners() {
    this._cardRemove.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', this._openPopupShow);
    };

  _fillCard() {
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardName = this._cardElement.querySelector('.element__text');
    this._cardRemove = this._cardElement.querySelector('.element__cardremove');

    this._fillCard();

    this._setEventListeners(this._cardElement);

    return this._cardElement;
  }
}
