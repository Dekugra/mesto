const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const profileAddNewCardButton = document.querySelector('.profile__add-button');
const templateContent = document.querySelector('.newcard-template').content;
const templatelist = document.querySelector('.element');
const templateText = document.querySelector('.element__text');
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
const popupShowCloseButton = document.querySelector('.popup__close_type_show');
const popupShow = document.querySelector('.popup_type_show');
const popupShowImage = document.querySelector('.popup__image');
const popupShowTitle = document.querySelector('.popup__titleshow');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
// Open
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function addToPopupEditValues() {
  popupUserName.value = profileName.textContent;
  popupUserAbout.value = profileAbout.textContent;
}

function addToProfileValues() {
  profileName.textContent = popupUserName.value;
  profileAbout.textContent = popupUserAbout.value;
}

function addToPopupAddValues() {
  popupNewCardName.value = initialCards[0].name;
  popupNewCardSource.value = initialCards[0].link;
}

profileEditButton.addEventListener('click', function () {
  addToPopupEditValues();
  popupOpen(popupEdit);
});

profileAddNewCardButton.addEventListener('click', function () {
  popupOpen(popupNewCard);
  addToPopupAddValues();
});
// Close
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

popupEditCloseButton.addEventListener('click', function () {
  popupClose(popupEdit);
});

popupNewCardCloseButton.addEventListener('click', function () {
  popupClose(popupNewCard);
});

popupShowCloseButton.addEventListener('click', function () {
  popupClose(popupShow);
});
// Submit
function submitPopupEdit(evt) {
  evt.preventDefault();
  addToProfileValues();
  popupClose(popupEdit);
}

function submitPopupAdd(evt) {
  addItem();
  popupClose(popupNewCard);
}

popupEditForm.addEventListener('submit', submitPopupEdit);
popupNewCardForm.addEventListener('submit', addItem);

function render() {
  initialCards.forEach(renderItem);
}

function renderItem(item) {
  const newItem = templateContent.cloneNode(true);
  newItem.querySelector('.element__text').textContent = item.name;
  newItem.querySelector('.element__image').src = item.link;
  newItem.querySelector('.element__image').alt = item.name;
  addListeners(newItem);
  cardsParent.prepend(newItem);
}

function addListeners(el) {
  el.querySelector('.element__cardremove').addEventListener('click', handlDelete);
  el.querySelector('.element__like').addEventListener('click', handlLike);
  el.querySelector('.element__image').addEventListener('click', handlShow);
}

function handlDelete(event) {
  event.target.closest('.element').remove();
}

function handlLike(event) {
  event.target.classList.toggle('element__like_liked');
}

function handlShow(event) {
  popupOpen(popupShow);
  popupShowImage.src = event.target.src;
  popupShowTitle.textContent = event.target.alt;
}

function addItem(event) {
  const newCard = templateContent.cloneNode(true);
  event.preventDefault();
  newCard.querySelector('.element__text').textContent = popupNewCardName.value;
  newCard.querySelector('.element__text').alt = popupNewCardName.value;
  newCard.querySelector('.element__image').src = popupNewCardSource.value;
  addListeners(newCard);
  cardsParent.prepend(newCard);
  popupClose(popupNewCard);
}

render();
