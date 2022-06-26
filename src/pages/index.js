import '../pages/index.css';

import { settingsObject } from '../scripts/initial-data';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Api } from '../scripts/components/Api';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

function loadingProcess(form) {
  const submitButton = form.querySelector('.popup__submit');
  const previousContent = submitButton.textcontent;
  submitButton.textcontent = 'Сохранение...';
  return () => (submitButton.textcontent = previousContent);
}

const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', (newAvatarData) => {
  const data = loadingProcess(popupEditAvatar.getForm());
  api
    .recordNewAvatar(newAvatarData)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(data);
});

popupEditAvatar.setEventListeners();

const popupAddNewAvatarValidator = new FormValidator(settingsObject, popupEditAvatar.getForm());
popupAddNewAvatarValidator.enableValidation();

const avatarEditButton = document.querySelector('.profile__avatar');
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
  popupEditAvatar.setInputValues({
    avatar: userInfo.getAvatar(),
  });
  popupAddNewAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

const popupEditProfile = new PopupWithForm('.popup_type_edit', (profileData) => {
  const data = loadingProcess(popupEditProfile.getForm());
  api
    .setNewProfileSave(profileData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(data);
});

popupEditProfile.setEventListeners();

const popupEditProfileValidator = new FormValidator(settingsObject, popupEditProfile.getForm());
popupEditProfileValidator.enableValidation();

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfileValidator.resetValidation();
  popupEditProfile.open();
});

const popupAddNewCard = new PopupWithForm('.popup_type_addcard', (cardData) => {
  const data = loadingProcess(popupAddNewCard.getForm());
  api
    .recordNewCard(cardData)
    .then((res) => {
      section.addItem('prepend', createCard(res));
      popupAddNewCard.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(data);
});

popupAddNewCard.setEventListeners();

const popupAddNewCardValidator = new FormValidator(settingsObject, popupAddNewCard.getForm());
popupAddNewCardValidator.enableValidation();

const addNewCardButton = document.querySelector('.profile__add-button');
addNewCardButton.addEventListener('click', () => {
  popupAddNewCardValidator.resetValidation();
  popupAddNewCard.open();
});

const popupDeleteCard = new Popup('.popup_type_deletecard');
popupDeleteCard.setEventListeners();

const popupFullImage = new PopupWithImage('.popup_type_show');
popupFullImage.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    userInfo.getOwnerId(),
    cardData,
    '.newcard-template',
    () => popupFullImage.open(cardData.name, cardData.link),
    () =>
      popupDeleteCard.open(() => {
        api
          .deleteCurrentCard(card.getCardId())
          .then(() => {
            card.removeCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен', err);
          });
      }),
    () => {
      const isLiked = card.isLiked() ? api.deleteLike(card.getCardId()) : api.addLike(card.getCardId());
      isLiked.then((res) => card.updateLikes(res)).catch(err);
    }
  );
  return card.createCard();
}

const section = new Section((cardData) => section.addItem('prepend', createCard(cardData)), '.elements__items');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '0995599a-a862-4c60-8c4a-4545a98375c7',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitCards()])
  .then((res) => {
    userInfo.setAvatar(res[0].avatar);
    userInfo.setUserInfo(res[0]);
    section.renderItems(res[1]);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен', err);
  });
