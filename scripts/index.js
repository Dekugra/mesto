import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards, settingsObject } from './initial-data.js';
import { openPopup, closePopup, handlePopupClose } from './utils.js';
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

function clearPopupAddInputs() {
  popupNewCardName.value = '';
  popupNewCardSource.value = '';
}

function addToProfileValues() {
  profileName.textContent = popupUserName.value;
  profileAbout.textContent = popupUserAbout.value;
}

function addToPopupEditValues() {
  popupUserName.value = profileName.textContent;
  popupUserAbout.value = profileAbout.textContent;
}

profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
  editProfileValidator.enableValidation();
  editProfileValidator.resetValidation();
  addToPopupEditValues();
});

profileAddNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  addCardValidator.deactivateSubmitButton();
  addCardValidator.enableValidation();
  addCardValidator.resetValidation();
});

function submitPopupEdit(evt) {
  evt.preventDefault();
  addToProfileValues();
  closePopup(popupEdit);
}

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

popupEditForm.addEventListener('submit', submitPopupEdit);
popupNewCardForm.addEventListener('submit', addItem);

function handlePopupShowClick(name, link) {
  popupShowImage.src = link;
  popupShowImage.alt = name;
  popupShowTitle.textContent = name;
}

function getCard(place, source) {
  const card = new Card(place, source, '.newcard-template', handlePopupShowClick(place, source));
  return card.createCard();
}

const createCard = (name, link) => {
  const cardElement = getCard(name, link);
  cardsParent.prepend(cardElement);
};

initialCards.forEach((item) => {
  createCard(item.name, item.link);
});
