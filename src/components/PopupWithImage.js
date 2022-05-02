import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePhoto = this._popup.querySelector('.popup__image-photo');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(name, link) {

        this._popupImagePhoto.src = link;
        this._popupImageCaption.textContent = name;
        this._popupImagePhoto.alt = name;

        super.open();
    }
}