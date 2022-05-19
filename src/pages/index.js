import '../pages/index.css';

import { initialCards, settingsObject } from '../scripts/initial-data';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const profilePopup = new PopupWithForm('.popup_type_edit', (data) => userInfo.setUserInfo(data));
profilePopup.setEventListeners();

const editProfileValidator = new FormValidator(settingsObject, profilePopup.getForm());
editProfileValidator.enableValidation();

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidation();
  profilePopup.open();
});

const showPopup = new PopupWithImage('.popup_type_show');
showPopup.setEventListeners();

function generateCard(cardData) {
  const card = new Card(cardData.name, cardData.link, '.newcard-template', () => showPopup.open(cardData.name, cardData.link));
  return card.createCard();
}

const newCardPopup = new PopupWithForm('.popup_type_addcard', (data) => section.addItem('append', generateCard(data)));
newCardPopup.setEventListeners();

const newCardValidator = new FormValidator(settingsObject, newCardPopup.getForm());
newCardValidator.enableValidation();

const newCardAddButton = document.querySelector('.profile__add-button');
newCardAddButton.addEventListener('click', () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => section.addItem('append', generateCard(data)),
  },
  '.elements__items'
);

section.renderItems();
