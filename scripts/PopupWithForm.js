import Popup from './Popup.js';

import {
    profileTitle, profileSubtitle, placeContainer, buttonEditProfile, buttonAddPlace,
    popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, nameInput,
    jobInput, placeInput, srcInput, initialCards, addPlaceForm, editProfileForm
} from './constants.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const values ={};
        const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        inputList.forEach(input => values[input.name]=input.value)
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const values = this._getInputValues();
            this._submitForm(values);
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}

/* при сабмите формы
     this._element.addEventListener('submit', (evt) => {
        // отменим стандартное поведение
        evt.preventDefault();
  
        // и сбросим её поля
        this._element.reset();
      })
      */