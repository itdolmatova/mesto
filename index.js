//при нажатии на кнопку Редактировать профиль добавлять модификатор .popup_opened
//при нажатии на крестик в edit-form убирать класс .popup_opened
let profile = document.querySelector('.profile__info');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.edit-button');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

let formElement = document.querySelector(".edit-form");
let nameInput = formElement.querySelector(".edit-form__input_ctrl_name");
let jobInput = formElement.querySelector(".edit-form__input_ctrl_job");

function popupOpened () {
  popup.classList.add('popup_opened');
}

editButton.addEventListener ('click', popupOpened);

function popupClosed () {
  popup.classList.remove('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

closeButton.addEventListener ('click', popupClosed);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);