const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const placeContainer = document.querySelector('.places__list');
const placeTitle = placeContainer.querySelector('.place__title');
const placePhoto = placeContainer.querySelector('.place__photo');

const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddPlace = profile.querySelector('.profile__add-button');

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupImage = document.querySelector('.popup_image');
const popupImagePhoto = popupImage.querySelector('.popup__image-photo');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');

const buttonSubmitPlace = popupAddPlace.querySelector('.popup__submit-button');

const nameInput = popupEditProfile.querySelector('.popup__input_ctrl_name');
const jobInput = popupEditProfile.querySelector('.popup__input_ctrl_job');

const placeInput = popupAddPlace.querySelector('.popup__input_ctrl_name');
const srcInput = popupAddPlace.querySelector('.popup__input_ctrl_src');

const placeTemplate = document.querySelector('#place-template').content;
const placeElementTemplate = placeTemplate.querySelector('.place');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {profile, profileTitle, profileSubtitle, placeContainer, placeTitle, placePhoto, buttonEditProfile, 
    buttonAddPlace, popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, buttonSubmitPlace, 
    nameInput, jobInput, placeInput, srcInput, placeTemplate, placeElementTemplate, initialCards};
