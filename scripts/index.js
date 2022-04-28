import { Card } from './Card.js';

import {
  profileTitle, profileSubtitle, placeContainer, buttonEditProfile, buttonAddPlace,
  popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, nameInput,
  jobInput, placeInput, srcInput, initialCards, addPlaceForm, editProfileForm
} from './constants.js';

import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const formValidators = {};

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
/*
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
}*/

export function openPopupImage() {
  popup.open(popupImage);
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

const cardsList = new Section({
  items: initialCards,
  renderer: createCard
}, 
  '.places__list'
);

cardsList.renderItems();

/*
function setCloseListener(popupList) {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button'))
        popup.close(popup);
    });
  });
}*/

const popup = new Popup ('.popup');
popup.setEventListeners();

buttonAddPlace.addEventListener('click', function () {
  formValidators.popup__form_card.resetValidation();
  popup.open();
});

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  cardsList.addItem(createCard({ link: srcInput.value, name: placeInput.value }));
  placeInput.value = '';
  srcInput.value = '';
  popup.close();
}

popupAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.close();
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

function initPopupProfileFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

initPopupProfileFields();

buttonEditProfile.addEventListener('click', function () {
  initPopupProfileFields();
  formValidators.popup__form_profile.resetValidation();
  popup.open(popupEditProfile);
});

function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationParams, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationParams);