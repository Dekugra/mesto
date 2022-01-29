const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupSubmit = document.querySelector('.popup__submit');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupUserName = document.querySelector('.popup__input_type_username');
const popupUserAbout = document.querySelector('.popup__input_type_about');
const elementLikeButton = document.querySelector('.element__like');

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

// function likedButton() {
//   elementLikeButton.classList.toggle('element__like_liked');
// }

// elementLikeButton.addEventListener('click', likedButton);
