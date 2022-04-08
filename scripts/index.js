import {Card} from './cards.js';

import {
  profile, profileTitle, profileSubtitle, placeContainer, placeTitle, placePhoto, buttonEditProfile, buttonAddPlace,
  popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, buttonSubmitPlace, nameInput, jobInput, placeInput,
  srcInput, placeTemplate, placeElementTemplate, initialCards
} from './constants.js';


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

initialCards.forEach((item) => {
  const card = new Card(item, '#place-template');
  const cardElement = card.generateCard();
  placeContainer.append(cardElement);
});


function setCloseListener(popupList) {
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
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
  const card = new Card({link: srcInput.value, name:placeInput.value}, '#place-template');
  //const placeElement = createPlace(srcInput.value, placeInput.value);
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

/*версия отрисовки карточки без применения ООП
function createPlace(photoValue, titleValue) {
  const placeElement = placeElementTemplate.cloneNode(true);
  const placeElementPhoto = placeElement.querySelector('.place__photo');
  const buttonLike = placeElement.querySelector('.place__like');
  const buttonDelete = placeElement.querySelector('.place__delete-button');

  placeElementPhoto.src = photoValue;
  placeElement.querySelector('.place__title').textContent = titleValue;
  placeElementPhoto.alt = titleValue;
  
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  });
  
  buttonDelete.addEventListener('click', function (evt) {
    const listItem = buttonDelete.closest('.place');
    listItem.remove();
  });
  
  return placeElement;
}*/