import '../pages/index.css';

import { settingsObject } from '../scripts/utils/constants.js';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { Card } from '../scripts/components/Card.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { Api } from '../scripts/components/Api';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

// попап редактирования аватара с интерактивным содержанием кнопки сабмита
const popupEditAvatar = new PopupWithForm('.popup_type_editavatar', (newAvatarData) => {
  popupEditAvatar.renderLoading(true);
  api
    .recordNewAvatar(newAvatarData)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
});

popupEditAvatar.setEventListeners();

// валидатор формы добавления нового аватара
const popupAddNewAvatarValidator = new FormValidator(settingsObject, popupEditAvatar.getForm());
popupAddNewAvatarValidator.enableValidation();

// листенер кнопки добавления нового аватара
const avatarEditButton = document.querySelector('.profile__avatar-editbutton');
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
  popupAddNewAvatarValidator.resetValidation();
});

// хендлер попапа редактирования профиля с интерактивным содержанием кнопки сабмита
function handlerEditProfile(profileData) {
  popupEditProfile.renderLoading(true);
  api
    .setNewProfileSave(profileData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}

// попап редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type_edit', handlerEditProfile);
popupEditProfile.setEventListeners();

// валидатор формы редактирования профиля
const popupEditProfileValidator = new FormValidator(settingsObject, popupEditProfile.getForm());
popupEditProfileValidator.enableValidation();

// листенер кнопки редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfileValidator.resetValidation();
  popupEditProfile.open();
});

// хендлер попапа добавления новой карточки с интерактивным содержанием кнопки сабмита
function handlerAddNewCard(obj) {
  popupAddNewCard.renderLoading(true);
  api
    .recordNewCard(obj)
    .then((res) => {
      section.addItem('prepend', createCard(res));
      popupAddNewCard.close();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })
    .finally(() => {
      popupAddNewCard.renderLoading(false);
    });
}

// попап добавления новой карточки
const popupAddNewCard = new PopupWithForm('.popup_type_addcard', handlerAddNewCard);
popupAddNewCard.setEventListeners();

// валидатор формы добавления новой карточки
const popupAddNewCardValidator = new FormValidator(settingsObject, popupAddNewCard.getForm());
popupAddNewCardValidator.enableValidation();

// листенер кнопки добавления новой карточки
const addNewCardButton = document.querySelector('.profile__add-button');
addNewCardButton.addEventListener('click', () => {
  popupAddNewCardValidator.resetValidation();
  popupAddNewCard.open();
});

// попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_deletecard');
popupDeleteCard.setEventListeners();

// хендлер попапа удаления карточки
function handlerDeleteCard(obj, card) {
  popupDeleteCard.open();
  popupDeleteCard.setSubmitHeandler(() => {
    popupDeleteCard.renderLoading(true);
    api
      .deleteCurrentCard(obj)
      .then((res) => {
        console.log(res);
        card.removeCard();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен', err);
      })
      .finally(() => {
        popupDeleteCard.renderLoading(false);
      });
    popupDeleteCard.open();
  });
}

// попап просмотра карточки в расширенном размере
const popupFullImage = new PopupWithImage('.popup_type_show');
popupFullImage.setEventListeners();

// хендлер удаления/добавления лайка карточки
function handleLike(obj) {
  const isLiked = obj.isLiked() ? api.deleteLike(obj.getCardId()) : api.addLike(obj.getCardId());
  isLiked
    .then((res) => obj.updateLikes(res))
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    });
}

// создание карточки с хендлерами предпросмотра/удаления/лайков
function createCard(cardData) {
  const card = new Card(
    userInfo.getOwnerId(),
    cardData,
    '.newcard-template',
    () => popupFullImage.open(cardData.name, cardData.link),
    () => handlerDeleteCard(cardData, card),
    () => handleLike(card)
  );
  return card.makeCard();
}

const section = new Section((cardData) => section.addItem('append', createCard(cardData)), '.elements__items');

// класс отправки запросов на сервер
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '3d2f6fc9-c8b6-4135-a900-76b411c920b6',
    'Content-Type': 'application/json',
  },
});

// отрисовка карточек/аватара/инфо пользователя
Promise.all([api.getUserInfo(), api.getInitCards()])
  .then((res) => {
    userInfo.setAvatar(res[0].avatar);
    userInfo.setUserInfo(res[0]);
    section.renderItems(res[1]);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен', err);
  });
