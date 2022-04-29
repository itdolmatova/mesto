import { Card } from './Card.js';

import {
  profileTitle, profileSubtitle, placeContainer, buttonEditProfile, buttonAddPlace,
  popupList, popupImage, popupImagePhoto, popupImageCaption, nameInput,
  jobInput, initialCards, addPlaceForm, editProfileForm
} from './constants.js';

import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const formValidators = {};

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export function openPopupImage() {
  popup.open();
}

function handleCardClick(title, photo) {
  const popupWithImage = new PopupWithImage({
    link: photo,
    name: title,
    alt: title
  }, '.popup_image');
  popupWithImage.setEventListeners();
  popupWithImage.open();
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

function handleAddPlaceFormSubmit(values) {
  cardsList.addItem(createCard({ link: values.src, name: values.name }));
}

const popupAddPlace = new PopupWithForm('.popup_add-place', handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

buttonAddPlace.addEventListener('click', function () {
  formValidators.popup__form_card.resetValidation();
  popupAddPlace.open();
});

function handleProfileFormSubmit(values) {
  profileTitle.textContent = values.name;
  profileSubtitle.textContent = values.job;
}

const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit)

popupEditProfile.setEventListeners();

function initPopupProfileFields(values) {
  values.name = profileTitle.textContent;
  values.job = profileSubtitle.textContent;
}

buttonEditProfile.addEventListener('click', function (values) {
  initPopupProfileFields(values);
  formValidators.popup__form_profile.resetValidation();
  popupEditProfile.open();
});

/*function handleProfileFormSubmit(evt) {
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
*/

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