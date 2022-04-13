import {Card} from './Cards.js';

import {
  profile, profileTitle, profileSubtitle, placeContainer, placeTitle, placePhoto, buttonEditProfile, buttonAddPlace,
  popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, buttonSubmitPlace, nameInput, jobInput, placeInput,
  srcInput, placeTemplate, placeElementTemplate, initialCards
} from './constants.js';

import {FormValidator} from './FormValidator.js';

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopup(popup) {
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add('popup_opened');
}

export function openPopupImage() {
  openPopup(popupImage);
}

function handleCardClick(name, link) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
  openPopupImage();
};

/* 

*/

initialCards.forEach((item) => {
  const card = new Card(item, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  placeContainer.append(cardElement);
});


function setCloseListener(popupList) {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button'))
      closePopup(popup);
    });
  });
}

setCloseListener(popupList);

buttonAddPlace.addEventListener('click', function () {
  popupAddPlace.querySelector('.popup__form').reset();
  buttonSubmitPlace.classList.add('popup__button_disabled');
  openPopup(popupAddPlace);
});

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card({link: srcInput.value, name:placeInput.value}, '#place-template', handleCardClick);
  placeContainer.prepend(card.generateCard());
  closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

function initPopupProfileFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

initPopupProfileFields();


buttonEditProfile.addEventListener('click', function () {
  initPopupProfileFields();
  openPopup(popupEditProfile);
});

function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  const popupContainer = document.querySelector('.popup__container');

  formList.forEach((formElement) => { 
    const formValidator = new FormValidator (validationParams, formElement);
    formValidator.enableValidation();
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});