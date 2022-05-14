
export default class Card {
    constructor(data, cardSelector, handleCardClick, isOwner, popupConfirm, api) {
        this._photo = data.link;
        this._title = data.name;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._isOwner = isOwner;
        this._popupConfirm = popupConfirm;
        this._api = api;
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
        this._likeButton = this._element.querySelector('.place__like');
        this._deleteButton = this._element.querySelector('.place__delete-button'); 
        if (!this._isOwner) {
            this._deleteButton.remove();
        }
        
        this._setEventListeners();

        const placeElementPhoto = this._element.querySelector('.place__photo');
        placeElementPhoto.src = this._photo;

        const placeElementTitle = this._element.querySelector('.place__title');
        placeElementTitle.textContent = this._title;
        placeElementPhoto.alt = this._title;

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            this._handleLikeButton(evt);
        });


        this._deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteButton(evt);
        });

        this._element.querySelector('.place__photo').addEventListener('click', () => {
            this._handleCardClick(this._title, this._photo);
          });
      
    }

    _handleLikeButton(evt) {
        this._likeButton.classList.toggle('place__like_active');
    }

    _handleDeleteButton(evt) {
        this._popupConfirm.setEventListeners(()=>{
            this._api.deleteCard(this._id)
              .then(() => {
                this._element.remove();
                this._element = null;
              })
              .catch(err => { console.log(err); })
        });
        this._popupConfirm.open();

    }

}