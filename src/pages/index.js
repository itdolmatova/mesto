import '../pages/index.css';

import Card from '../components/Card.js';

import { buttonEditProfile, buttonAddPlace, buttonEditAvatar } from '../utils/constants.js';

import FormValidator from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '7d861178-920f-471c-bb6e-3ca53a05f255',
    'Content-Type': 'application/json'
  }
});


const profileInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const initialCardsPromise = api.getCards();
const userInfoPromise = api.getUserInfo();

const cardsListPromise = Promise.all([userInfoPromise, initialCardsPromise]).then(res => {
  const userInfo = res[0];
  const initialCards = res[1];

  profileInfo.setUserInfo({ name: userInfo.name, job: userInfo.about, _id: userInfo._id});
  profileInfo.setAvatar(userInfo.avatar);

  const cardsList = new Section({
    items: initialCards,
    renderer: createCard
  },
    '.places__list'
  );

  cardsList.renderItems();
  return cardsList;
});

 


function handleProfileFormSubmit(values) {
  //api.then
  profileInfo.setUserInfo(values);
}

const popupEditProfile = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit)
popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
  validatorProfile.resetValidation();
  const values = profileInfo.getUserInfo();
  popupEditProfile.open(values);
});

function handleAvatarFormSubmit(values) {
  api.editAvatar(values.src).then(() => {
  profileInfo.setAvatar(values.src);
  });
  
};

const popupAvatar = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit)
popupAvatar.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
});

const popupConfirm = new PopupConfirm('.popup_confirm');

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(item) {
  const card = new Card(item, '#place-template', handleCardClick, profileInfo._id, popupConfirm, api);
  const cardElement = card.generateCard();
  return cardElement;
};

function handleAddPlaceFormSubmit(values) {
  cardsListPromise.then(cardsList => {
    api.postCard(values.name, values.src)
      .then((resJson) => {
        cardsList.addItem(createCard(resJson))
      })
      .catch(err => { console.log(err); })
  });
}

const popupAddPlace = new PopupWithForm('.popup_add-place', handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

buttonAddPlace.addEventListener('click', function () {
  validatorCard.resetValidation();
  popupAddPlace.open();
});

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validatorCard = new FormValidator(validationParams, popupAddPlace.getFormElement());
validatorCard.enableValidation();
const validatorProfile = new FormValidator(validationParams, popupEditProfile.getFormElement());
validatorProfile.enableValidation();