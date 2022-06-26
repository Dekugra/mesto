export class Card {
  constructor(myId, { _id, name, link, owner,  likes }, cardTemplateSelector, handleCardClick, handleDelete, handleLike) {
    this._myId = myId;
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._likes = likes;
    this._id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleike = handleLike;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
  }

  getCardId() {
    return this._id;
  }

  removeCard() {
    this._cardElement.remove();
  }

  isLiked() {
    return this._likes.find((like) => like._id === this._myId);
  }

  updateLikes({ likes }) {
    this._likes = likes;
    this._renderLikes();
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__image').addEventListener('click', this._handleCardClick);
    this._cardElement.querySelector('.element__cardremove').addEventListener('click', this._handleDelete);
    this._cardElement.querySelector('.element__like').addEventListener('click', this._handleike);
  }

  _renderLikes() {
    const likeElement = this._cardElement.querySelector('.element__like');
    if (this.isLiked()) {
      likeElement.classList.add('element__like_liked');
    }
    // else
    // {
    //   likeElement.classList.remove('element__like_liked');
    // }
    // this._cardElement.querySelector('.element__like-total').textContent = this._likes.length;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.element__title').textContent = this._name;

    const cardImage = this._cardElement.querySelector('.element__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;

    if (this._myId === this._ownerId) {
      const delButton = this._cardElement.querySelector('.element__cardremove');
      delButton.classList.remove('element__cardremove_hidden');
    }

    this._renderLikes();

    return this._cardElement;
  }
}
