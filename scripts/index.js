import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards, settingsObject } from './initial-data.js';
import { openPopup, closePopup } from './utils.js';
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

function handlePopupClose() {
  const popups = document.querySelectorAll('.popup');

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

handlePopupClose();

profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
  editProfileValidator.resetValidation();
  addToPopupEditValues();
});

profileAddNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  addCardValidator.deactivateSubmitButton();
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

  openPopup(popupShow);
}

function getCard(place, source) {
  const card = new Card(place, source, '.newcard-template', handlePopupShowClick);
  return card.createCard();
}

const createCard = (name, link) => {
  const cardElement = getCard(name, link);
  cardsParent.prepend(cardElement);
};

initialCards.forEach((item) => {
  createCard(item.name, item.link);
});
