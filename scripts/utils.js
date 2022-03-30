export function handlePopupClose() {
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

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  handlePopupClose();
}
