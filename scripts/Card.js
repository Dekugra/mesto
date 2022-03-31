export class Card {
  constructor(title, source, cardTemplateSelector, handleImageClick) {
    this._name = title;
    this._link = source;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleImageClick;
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

  _setEventListeners() {
    this._cardRemove.addEventListener('click', this._handleDelete);
    this._likeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

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

    this._setEventListeners();

    return this._cardElement;
  }
}
