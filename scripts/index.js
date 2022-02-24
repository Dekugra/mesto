const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const profileAddNewCardButton = document.querySelector('.profile__add-button');
const templateContent = document.querySelector('.newcard-template').content;
const cardsParent = document.querySelector('.elements__items');
const elementLikeButton = document.querySelector('.element__like');
const popupEditCloseButton = document.querySelector('.popup__close_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupUserName = document.querySelector('.popup__input_type_username');
const popupUserAbout = document.querySelector('.popup__input_type_about');
const popupNewCard = document.querySelector('.popup_type_addcard');
const popupNewCardForm = document.querySelector('.popup__form_type_addcard');
const popupNewCardName = document.querySelector('.popup__input_type_cardname');
const popupNewCardSource = document.querySelector('.popup__input_type_source');
const popupNewCardCloseButton = document.querySelector('.popup__close_type_addcard');
const popupNewCardSubmitButton = document.querySelector('.popup__submit_type_addcard');
const popupShowCloseButton = document.querySelector('.popup__close_type_show');
const popupShow = document.querySelector('.popup_type_show');
const popupShowImage = document.querySelector('.popup__image');
const popupShowTitle = document.querySelector('.popup__titleshow');

function clearPopupAddInputs() {
  popupNewCardName.value = '';
  popupNewCardSource.value = '';
}

// Close
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  document.removeEventListener('keydown', handleOverlayPopup);
}

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEdit);
});

popupNewCardCloseButton.addEventListener('click', function () {
  closePopup(popupNewCard);
});

popupShowCloseButton.addEventListener('click', function () {
  closePopup(popupShow);
});

function closePopupByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handlePopup(popup) {
  window.onkeydown = (event) => closePopupByEscape(event);
}

function handleOverlayPopup(popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) closePopup(popup);
  });
}

// Open
function openPopup(popup) {
  popup.classList.add('popup_opened');
  handlePopup(popup);
  handleOverlayPopup(popup);
  document.addEventListener('keydown', closePopupByEscape);
}

function addToProfileValues() {
  profileName.textContent = popupUserName.value;
  profileAbout.textContent = popupUserAbout.value;
}

function addToPopupEditValues() {
  popupUserName.value = profileName.textContent;
  popupUserAbout.value = profileAbout.textContent;
}

function disableSubmitButton() {
  popupNewCardSubmitButton.setAttribute('disabled', true);
  popupNewCardSubmitButton.classList.add('popup__submit_disabled');
}

profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
  validateOpenForm(popupEdit);
  addToPopupEditValues();
});

profileAddNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  disableSubmitButton();
  validateOpenForm(popupNewCard);
});

// Submit
function submitPopupEdit(evt) {
  evt.preventDefault();
  addToProfileValues();
  closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', submitPopupEdit);
popupNewCardForm.addEventListener('submit', addItem);

function render() {
  initialCards.forEach(renderItem);
}

function createCard(card) {
  const cardElement = templateContent.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardName = cardElement.querySelector('.element__text');
  cardName.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  addListeners(cardElement);
  return cardElement;
}

function renderItem(item) {
  const newItem = createCard(item);
  cardsParent.prepend(newItem);
}

function handleDelete(event) {
  event.target.closest('.element').remove();
}

function handleLike(event) {
  event.target.classList.toggle('element__like_liked');
}

function openImagePopup(event) {
  openPopup(popupShow);
  popupShowImage.src = event.target.src;
  popupShowImage.alt = event.target.alt;
  popupShowTitle.textContent = event.target.alt;
}

function addListeners(el) {
  el.querySelector('.element__cardremove').addEventListener('click', handleDelete);
  el.querySelector('.element__like').addEventListener('click', handleLike);
  el.querySelector('.element__image').addEventListener('click', openImagePopup);
}

function addItem(event) {
  event.preventDefault();
  const cardData = {
    name: '',
    link: '',
  };
  cardData.name = popupNewCardName.value;
  cardData.link = popupNewCardSource.value;
  renderItem(cardData);
  clearPopupAddInputs();
  closePopup(popupNewCard);
}

render();
