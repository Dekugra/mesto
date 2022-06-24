import '../pages/index.css';

import { initialCards, settingsObject } from '../scripts/initial-data';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Api } from '../scripts/components/Api';

const serverUrl = 'https://mesto.nomoreparties.co/v1/cohort-43';
const token = '0995599a-a862-4c60-8c4a-4545a98375c7';
const userDescription = new UserInfo('.profile__subtitle', '.profile__avatar', 'cohort-43', '.profile__title', '731c7aa7f23b648554e808df');
const api = new Api(serverUrl, token);
const myId = '731c7aa7f23b648554e808df';

function generateCard(cardData) {
  const card = new Card(cardData, '.newcard-template', handleCardClick, handleSubmitDeleteCard, myId);
  return card.createCard();
}

api.getInitCards().then((cards) => {
  const section = new Section(
    {
      items: cards,
      renderer: (data) => section.addItem('append', generateCard(data)),
    },
    '.elements__items'
  );
  section.renderItems();
});

api.getUserInfo().then((obj) => {
  handleSubmitEditProfileForm(obj);
});

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleSubmitEditProfileForm);
popupEditProfile.setEventListeners();
const popupAddNewCard = new PopupWithForm('.popup_type_addcard', handleSubmitAddNewCardForm);
popupAddNewCard.setEventListeners();
const popupFullImage = new PopupWithImage('.popup_type_show');
popupFullImage.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', handleSubmitNewAvatar);
popupEditAvatar.setEventListeners();
const popupDeleteCard = new PopupWithForm('.popup_type_deletecard', handleSubmitDeleteCard);

const popupEditProfileValidator = new FormValidator(settingsObject, popupEditProfile.getForm());
popupEditProfileValidator.enableValidation();

const popupAddNewCardValidator = new FormValidator(settingsObject, popupAddNewCard.getForm());
popupAddNewCardValidator.enableValidation();

const popupAddNewAvatarValidator = new FormValidator(settingsObject, popupEditAvatar.getForm());

function handleCardClick(evt) {
  popupFullImage.open(evt.target.alt, evt.target.src);
}

function handleClickProfileBtnEdit() {
  popupEditProfileValidator.resetValidation();
  popupEditProfile.open();
  popupEditProfile.setInputValues(userDescription.getUserInfo());
}

function handleSubmitEditProfileForm(data) {
  api.setNewProfileSave(data.name, data.about).then((obj) => {
    userDescription.setUserInfo(obj);
  });
}

function handleClickAvatarPhoto() {
  popupEditAvatar.open();
}

function handleSubmitNewAvatar(data) {
  api.recordNewAvatar(data).then(() => {
    userDescription.setUserInfo(data);
  });
}

function handleSubmitAddNewCardForm(data) {
  api.recordNewCard(data.name, data.link).then((obj) => {
    section.addItem('prepend', obj);
  });
}

function handleClickProfileBtnAdd() {
  popupAddNewCardValidator.resetValidation();
  popupAddNewCard.open();
}

function handleSubmitDeleteCard(cardId) {
  popupDeleteCard.setEventListeners();
  api.deleteCurrentCard(cardId.id).then(() => {
    window.location.reload();
  });
}

document.querySelector('.profile__edit-button').addEventListener('click', handleClickProfileBtnEdit);

document.querySelector('.profile__add-button').addEventListener('click', handleClickProfileBtnAdd);

document.querySelector('.profile__avatar').addEventListener('click', handleClickAvatarPhoto);
