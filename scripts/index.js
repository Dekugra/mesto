let profileOpenPopupButton = document.querySelector('.profile__edit-button')
let popupCloseButton = document.querySelector('.popup__close')
let popup = document.querySelector('.popup')
let popupSubmit = document.querySelector('.popup__submit')
let profileName = document.querySelector('.profile__title')
let profileAbout = document.querySelector('.profile__subtitle')
let popupUserName = document.querySelector('.popup__username')
let popupUserAbout = document.querySelector('.popup__about')

function openPopup(e) {
  popup.classList.add('popup_opened')
}

function closePopup(e) {
  popup.classList.remove('popup_opened')
}

profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
})

popupSubmit.addEventListener('click', function () {
  let inputNameLength = popupUserName.value.length
  let inputAboutLength = popupUserAbout.value.length

  if (inputNameLength > 0 && inputAboutLength > 0) {
    closePopup()
    profileName.textContent = popupUserName.value
    profileAbout.textContent = popupUserAbout.value
  }
})
