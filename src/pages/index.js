import '../pages/index.css';

import { initialCards, settingsObject } from '../scripts/initial-data';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';

const userDescription = new UserInfo('.profile__title', '.profile__subtitle');

function generateCard(cardData) {
  const card = new Card(cardData.name, cardData.link, '.newcard-template', handleCardClick);
  return card.createCard();
}

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleSubmitEditProfileForm);
popupEditProfile.setEventListeners();
const popupAddNewCard = new PopupWithForm('.popup_type_addcard', handleSubmitAddNewCardForm);
popupAddNewCard.setEventListeners();
const popupFullImage = new PopupWithImage('.popup_type_show');
popupFullImage.setEventListeners();

const popupEditProfileValidator = new FormValidator(settingsObject, popupEditProfile.getForm());
popupEditProfileValidator.enableValidation();

const popupAddNewCardValidator = new FormValidator(settingsObject, popupAddNewCard.getForm());
popupAddNewCardValidator.enableValidation();

function handleCardClick(evt) {
  popupFullImage.open(evt.target.alt, evt.target.src);
}

function handleClickProfileBtnEdit() {
  popupEditProfileValidator.resetValidation();
  popupEditProfile.open();
}

function handleSubmitEditProfileForm() {
  popupEditProfile.getForm().addEventListener('submit', userDescription.setUserInfo(popupEditProfile.getInputValues()));
}

function handleSubmitAddNewCardForm() {
  let newCardInfo = popupAddNewCard.getInputValues();
  popupAddNewCardValidator.resetValidation();

  const sectionNewCard = new Section({ items: newCardInfo, renderer: generateCard }, '.elements__items');
  sectionNewCard.addItem('prepend', generateCard(newCardInfo));
}

function handleClickProfileBtnAdd() {
  popupAddNewCardValidator.resetValidation();
  popupAddNewCard.open();
}

document.querySelector('.profile__edit-button').addEventListener('click', handleClickProfileBtnEdit);

document.querySelector('.profile__add-button').addEventListener('click', handleClickProfileBtnAdd);

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => section.addItem('append', generateCard(data)),
  },
  '.elements__items'
);
section.renderItems();
