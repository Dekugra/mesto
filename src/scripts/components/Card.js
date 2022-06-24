export class Card {
  constructor(data, cardTemplateSelector, handleImageClick, handleDelete, ownerId) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._data = data;
    this._ownerId = ownerId;
  }

  _getTemplate() {
    const card = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);

    return card;
  }

  // _handleDelete = () => {
  //   this._cardElement.remove();
  //   this._element = null;
  // };

  _getId() {
    return this._data.owner._id;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('element__like_liked');
  };

  _setEventListeners() {
    if (this._getId() === this._ownerId) return this._cardRemove.addEventListener('click', this._handleDelete(this._getId));
    this._likeButton.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', this._handleCardClick);
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
