
export default class Card {
    constructor(data, cardSelector, handleCardClick, profileId, popupConfirm, api) {
        this._photo = data.link;
        this._title = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._isOwner = profileId === data.owner._id;
        this._popupConfirm = popupConfirm;
        this._api = api;
        this._profileId = profileId;
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
        this._likesCounter = this._element.querySelector('.place__likesCounter');

        this._setEventListeners();
        
        if (this._isLikedByMe()) {
            this._likeButton.classList.add('place__like_active');
        }
        this._likesCounter.textContent = this._likes.length;

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

    _isLikedByMe(){
        return this._likes.some(e => e._id === this._profileId);
    }


    _handleLikeButton(evt) {
        if (this._isLikedByMe()) {
            this._api.deleteLike(this._id).then(resJson => {
                this._likes = resJson.likes;
                this._likesCounter.textContent = this._likes.length;
                this._likeButton.classList.remove('place__like_active');
            });
        } else {
            this._api.setLike(this._id).then(resJson => {
                this._likes = resJson.likes;
                this._likesCounter.textContent = this._likes.length;
                this._likeButton.classList.add('place__like_active');    
            })
        }
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