import {Card} from './Card.js';

import {
  profileTitle, profileSubtitle, placeContainer, buttonEditProfile, buttonAddPlace,
  popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, nameInput, 
  jobInput, placeInput, srcInput, initialCards, addPlaceForm, editProfileForm
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


function createCard(item) {
  const card = new Card(item, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

initialCards.forEach((item) => {
  const cardElement = createCard(item)
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
  //popupAddPlace.querySelector('.popup__form').reset();
  addPlaceFormValidator.resetValidation();
  openPopup(popupAddPlace);
});

let addPlaceFormValidator;

buttonAddPlace.addEventListener('click', function () {
  //popupAddPlace.querySelector('.popup__form').reset();
  addPlaceFormValidator.resetValidation();
  openPopup(popupAddPlace);
});

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  placeContainer.prepend(createCard({link: srcInput.value, name: placeInput.value}));
  placeInput.value = '';
  srcInput.value = '';
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

let editProfileFormValidator;

buttonEditProfile.addEventListener('click', function () {
  initPopupProfileFields();
  editProfileFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

function enableValidation(validationParams) {
  editProfileFormValidator = new FormValidator (validationParams, editProfileForm);
  editProfileFormValidator.enableValidation();

  addPlaceFormValidator = new FormValidator(validationParams, addPlaceForm);
  addPlaceFormValidator.enableValidation();
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});