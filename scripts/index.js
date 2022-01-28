let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupSubmit = document.querySelector('.popup__submit');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');
let popupUserName = document.querySelector('.popup__input_username');
let popupUserAbout = document.querySelector('.popup__input_about');
let elementLikeButton = document.querySelector('.element__like');

function openPopup() {
  popup.classList.add('popup_opened');
  popupUserName.value = profileName.textContent;
  popupUserAbout.value = profileAbout.textContent;
}

profileOpenPopupButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

function submitPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupUserName.value;
  profileAbout.textContent = popupUserAbout.value;
  closePopup();
}

popupForm.addEventListener('submit', submitPopup);

// popup.addEventListener('click', function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup()
//   }
// })

function likedButton() {
  elementLikeButton.classList.toggle('element__like_liked');
}

elementLikeButton.addEventListener('click', likedButton);
