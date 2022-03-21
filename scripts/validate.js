const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (validationParams, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationParams.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationParams.inactiveButtonClass);
    }
}

const showInputError = (validationParams, formElement, inputElement, validationMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationParams.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(validationParams.errorClass);
};

const hideInputError = (validationParams, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationParams.inputErrorClass);
    errorElement.classList.remove(validationParams.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (validationParams, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(validationParams, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationParams, formElement, inputElement);
    }
}

function setEventListeners(validationParams, formElement) {
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
    const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);

    toggleButtonState(validationParams, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function (evt) {
            evt.preventDefault();
            checkInputValidity(validationParams, formElement, inputElement);
            toggleButtonState(validationParams, inputList, buttonElement);
        });
    });
}

function enableValidation(validationParams) {
    const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

    formList.forEach((formElement) => { setEventListeners(validationParams, formElement) });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});