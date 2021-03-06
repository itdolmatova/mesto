export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeByClick = this._closeByClick.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClick(evt){
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button'))
            this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._closeByClick);
    }
}