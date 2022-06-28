export class Card {
  constructor(myId, { likes, link, name, owner, _id }, cardTemplateSelector, handleCardClick, handleDelete, handleLike) {
    this._myId = myId;
    this._likes = likes;
    this._link = link;
    this._name = name;
    this._ownerObj = owner;
    this.card_id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleike = handleLike;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector);
    const card = cardTemplate.content.querySelector('.element').cloneNode(true);
    this._templateElement = card;
    return this._templateElement;
  }

  getCardId() {
    return this.card_id;
  }

  removeCard() {
    this._templateElement = this._getTemplate();
    cardElement.remove();
  }

  isLiked() {
    return this._likes.find((like) => like._id === this._myId);
  }

  updateLikes({ likes }) {
    this._likes = likes;
    this._renderLikes();
  }

  _setEventListeners() {
    this._templateElement.querySelector('.element__image').addEventListener('click', this._handleCardClick);
    this._templateElement.querySelector('.element__cardremove').addEventListener('click', this._handleDelete);
    this._templateElement.querySelector('.element__like').addEventListener('click', this._handleike);
  }

  _renderLikes() {
    const elementTitle = this._templateElement.querySelector('.element__title');
    this._likeElement = this._templateElement.querySelector('.element__like');
    if (this.isLiked()) {
      this._likeElement.classList.add('element__like_liked');
    } else {
      this._likeElement.classList.remove('element__like_liked');
    }
    this._templateElement.querySelector('.element__like-total').textContent = this._likes.length;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._templateElement.querySelector('.element__title').textContent = this._name;

    const cardImage = this._templateElement.querySelector('.element__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;

    if (this._myId === this._ownerObj._id) {
      const delButton = this._templateElement.querySelector('.element__cardremove');
      delButton.classList.remove('element__cardremove_hidden');
    }

    this._renderLikes();

    return this._templateElement;
  }
}
