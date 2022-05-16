const profile =  document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddPlace = profile.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-editButton');
const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {
  buttonEditProfile, buttonAddPlace, buttonEditAvatar, validationParams 
};
