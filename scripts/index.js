const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const placeContainer = document.querySelector('.places__list');
const placeTitle = placeContainer.querySelector('.place__title');
const placePhoto = placeContainer.querySelector('.place__photo');
const addButton = profile.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupImage = document.querySelector('.popup_image');

const nameInput = popupEditProfile.querySelector('.popup__input_ctrl_name');
const jobInput = popupEditProfile.querySelector('.popup__input_ctrl_job');

const placeInput = popupAddPlace.querySelector('.popup__input_ctrl_name');
const srcInput = popupAddPlace.querySelector('.popup__input_ctrl_src');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(popupAddPlace);
  placeInput.value = '';
  srcInput.value = '';
});

popupEditProfile.querySelector('.popup__close-button').addEventListener('click', function () { closePopup(popupEditProfile) });
popupAddPlace.querySelector('.popup__close-button').addEventListener('click', function () { closePopup(popupAddPlace) });
popupImage.querySelector('.popup__close-button').addEventListener('click', function () { closePopup(popupImage) });

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

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

function createPlace(photoValue, titleValue) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__photo').src = photoValue;
  placeElement.querySelector('.place__title').textContent = titleValue;
  placeElement.querySelector('.place__photo').alt = titleValue;

  placeElement.querySelector('.place__photo').addEventListener('click', function () {
    openPopup(popupImage);
    popupImage.querySelector('.popup__image-photo').src = photoValue;
    popupImage.querySelector('.popup__image-caption').textContent = titleValue;
  })

  const buttonLike = placeElement.querySelector('.place__like');
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  });

  const buttonDelete = placeElement.querySelector('.place__delete-button');
  buttonDelete.addEventListener('click', function (evt) {
    const listItem = buttonDelete.closest('.place');
    listItem.remove();
  });

  return placeElement;
}

initialCards.forEach(function (item) {
  const placeElement = createPlace(item.link, item.name);
  placeContainer.append(placeElement);
});


function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeElement = createPlace(srcInput.value, placeInput.value);
  const firstElement = placeContainer.querySelector('.place');
  if (firstElement === null) placeContainer.append(placeElement); else firstElement.replaceWith(placeElement);
  closePopup(popupAddPlace);
}
popupAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);