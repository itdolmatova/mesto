//при нажатии на кнопку Редактировать профиль добавлять модификатор .popup_opened
//при нажатии на крестик в popup__ убирать класс .popup_opened
const profile = document.querySelector('.profile__info');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector(".popup");
const nameInput = formElement.querySelector(".popup__input_ctrl_name");
const jobInput = formElement.querySelector(".popup__input_ctrl_job");

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit);