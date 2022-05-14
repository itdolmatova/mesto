import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
        this._initButtonText = this._buttonSubmit.textContent;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    }

    getFormElement(){
        return this._formElement;
    }

    _getInputValues() {
        const values ={};
        this._inputList.forEach(input => values[input.name]=input.value)
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            const values = this._getInputValues();
            this._submitForm(values);
            this.close();
        });
    }

    renderLoading(isLoading){
        if(isLoading) {
            this._buttonSubmit.textContent = "Сохранение...";
        } else {
            this._buttonSubmit.textContent = this._initButtonText;
        }
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    open(values){
        this.renderLoading(false);
        if(values != null) this._inputList.forEach(input => input.value = values[input.name]);
        super.open();
    }
}