export default class FormValidator {
    constructor(validationParams, formElement) {
        this._formSelector = validationParams.formSelector;
        this._inputSelector = validationParams.inputSelector;
        this._submitButtonSelector = validationParams.submitButtonSelector;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorClass = validationParams.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        //включает валидацию формы
        this._setEventListeners();
    }

    _showInputError(inputElement, validationMessage) {
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

    _checkInputValidity(inputElement) {
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

        this._toggleButtonState(this._inputList, this._submitButton);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                evt.preventDefault();
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, submitButton) {
        if (this._hasInvalidInput(inputList)) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.disabled = false;
        }
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState(this._inputList, this._submitButton);
    }
}