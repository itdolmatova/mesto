import Popup from './Popup.js';

import {
    profileTitle, profileSubtitle, placeContainer, buttonEditProfile, buttonAddPlace,
    popupList, popupEditProfile, popupAddPlace, popupImage, popupImagePhoto, popupImageCaption, nameInput,
    jobInput, placeInput, srcInput, initialCards, addPlaceForm, editProfileForm
} from './constants.js';

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._link = data.link;
        this._name = data.name;
        this._alt = data.alt;
    }

    open() {

        popupImagePhoto.src = this._link;
        popupImageCaption.textContent = this._name;
        popupImagePhoto.alt = this._name;

        super.open();
    }
}