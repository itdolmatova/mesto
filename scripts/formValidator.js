export class FormValidator {
    constructor(validationParams, formElement) {
        this._formSelector = validationParams.formSelector;
        this._inputSelector = validationParams.inputSelector;
        this._submitButtonSelector = validationParams.submitButtonSelector;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorClass = validationParams.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        //включает валидацию формы
        this._setEventListeners();
    }
    
    
    _showInputError(inputElement, validationMessage){
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = validationMessage;
        errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError(inputElement) { 
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _setEventListeners() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    
        this._toggleButtonState(inputList, buttonElement);

        const validator = this;
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function (evt) {
                evt.preventDefault();
                validator._checkInputValidity(inputElement);
                validator._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }



}