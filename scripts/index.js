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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function createPlace(photoValue, titleValue) {
  const placeElement = placeElementTemplate.cloneNode(true);
  const placeElementPhoto = placeElement.querySelector('.place__photo');
  const buttonLike = placeElement.querySelector('.place__like');
  const buttonDelete = placeElement.querySelector('.place__delete-button');

  placeElementPhoto.src = photoValue;
  placeElement.querySelector('.place__title').textContent = titleValue;
  placeElementPhoto.alt = titleValue;

  placeElementPhoto.addEventListener('click', function () {
    openPopup(popupImage);
    popupImagePhoto.src = photoValue;
    popupImagePhoto.alt = titleValue;
    popupImage.querySelector('.popup__image-caption').textContent = titleValue;
  })

  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  });

  buttonDelete.addEventListener('click', function (evt) {
    const listItem = buttonDelete.closest('.place');
    listItem.remove();
  });

  return placeElement;
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeElement = createPlace(srcInput.value, placeInput.value);
  placeContainer.prepend(placeElement);
  closePopup(popupAddPlace);
}

function setCloseListener(popupList) {
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button'))
        closePopup(popup);
    });
  });
}

setCloseListener(popupList);

initialCards.forEach(function (item) {
  const placeElement = createPlace(item.link, item.name);
  placeContainer.append(placeElement);
});

function initPopupProfileFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

initPopupProfileFields();


popupAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

buttonEditProfile.addEventListener('click', function () {
  initPopupProfileFields();
  openPopup(popupEditProfile);
});

buttonAddPlace.addEventListener('click', function () {
  popupAddPlace.querySelector('.popup__form').reset();
  buttonSubmitPlace.classList.add('popup__button_disabled');
  openPopup(popupAddPlace);
});


