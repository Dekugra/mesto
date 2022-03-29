import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards, settingsObject } from './initial-data.js';
import { openPopup, closePopup, closePopupByEscape, handleOverlayPopup } from './utils.js';
import {
  profileEditButton,
  profileName,
  profileAbout,
  profileAddNewCardButton,
  templateContent,
  cardsParent,
  elementLikeButton,
  popupEditCloseButton,
  popupEdit,
  popupEditForm,
  popupUserName,
  popupUserAbout,
  popupNewCard,
  popupNewCardForm,
  popupNewCardName,
  popupNewCardSource,
  popupNewCardCloseButton,
  popupNewCardSubmitButton,
  popupShowCloseButton,
  popupShow,
  popupShowImage,
  popupShowTitle,
} from './constants.js';

const editProfileValidator = new FormValidator(settingsObject, popupEditForm);
const addCardValidator = new FormValidator(settingsObject, popupNewCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function validateOpenForm(form) {
  const errorMessage = form.querySelectorAll(settingsObject.errorSelector);
  errorMessage.forEach((item) => {
    item.textContent = '';
    item.classList.remove(settingsObject.errorClass);
  });
  const errorInput = form.querySelectorAll(settingsObject.inputSelector);
  errorInput.forEach((item) => {
    item.classList.remove(settingsObject.inputErrorClass);
  });
}

function clearPopupAddInputs() {
  popupNewCardName.value = '';
  popupNewCardSource.value = '';
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

function submitPopupEdit(evt) {
  evt.preventDefault();
  addToProfileValues();
  closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', submitPopupEdit);
popupNewCardForm.addEventListener('submit', addItem);

function openPopupShow(name, link) {
  popupShowImage.src = link;
  popupShowImage.alt = name;
  popupShowTitle.textContent = name;

  openPopup(popupShow);
}

function handleCardClick() {
  popupShow.addEventListener('click', () => {
    openPopupShow(name, link);
  });
}

const createCard = (name, link) => {
  const card = new Card(name, link, '.newcard-template');
  const cardElement = card.createCard();

  cardsParent.prepend(cardElement);
  return cardElement;
};

function addItem(event) {
  event.preventDefault();
  const cardData = {
    name: '',
    link: '',
  };
  cardData.name = popupNewCardName.value;
  cardData.link = popupNewCardSource.value;
  createCard(cardData.name, cardData.link);
  clearPopupAddInputs();
  closePopup(popupNewCard);
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
});
