export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._photo = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._title, this._photo);
          });
      
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('place__like_active');
    }

    _handleDeleteButton(evt) {
        evt.target.closest('.place').remove();
    }

}