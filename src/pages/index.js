import '../pages/index.css';

import Card from '../components/Card.js';

import { buttonEditProfile, buttonAddPlace, initialCards } from '../utils/constants.js';

import FormValidator from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const profileInfo = new UserInfo('.profile__title', '.profile__subtitle');

function handleProfileFormSubmit(values) {
  profileInfo.setUserInfo(values);
}

const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit)

popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
  formValidators.popup__form_profile.resetValidation();
  const values = profileInfo.getUserInfo();
  popupEditProfile.open(values);
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