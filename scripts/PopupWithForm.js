import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
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
            const values = this._getInputValues();
            this._submitForm(values);
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    open(values){
        this._inputList.forEach(input => input.value = values[input.name]);
        super.open();
    }
}