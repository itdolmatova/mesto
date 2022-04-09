import { popupImage, popupImagePhoto } from './constants.js';

import { openPopupImage } from './index.js';

class Card {
    constructor(data, cardSelector) {
        this._photo = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector;
    }

    _like() {
        this.isLike = !this.isLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }


    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const placeElementPhoto = this._element.querySelector('.place__photo');
        placeElementPhoto.src = this._photo;

        const placeElementTitle = this._element.querySelector('.place__title');
        placeElementTitle.textContent = this._title;
        placeElementPhoto.alt = this._title;

        return this._element;
    }


    _setEventListeners() {
        this._element.querySelector('.place__like').addEventListener('click', (evt) => {
            this._handleLikeButton(evt);
        });


        this._element.querySelector('.place__delete-button').addEventListener('click', (evt) => {
            this._handleDeleteButton(evt);
        });

        this._element.querySelector('.place__photo').addEventListener('click', () => {
            popupImagePhoto.src = this._photo;
            popupImagePhoto.alt = this._title;
            popupImage.querySelector('.popup__image-caption').textContent = this._title;
            openPopupImage();
        });
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('place__like_active');
    }

    _handleDeleteButton(evt) {
        evt.target.closest('.place').remove();
    }

}

export { Card };