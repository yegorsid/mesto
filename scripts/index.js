import Card from './Card.js';
import FormValidator from './FormValidator.js';

const validationConfig = {
    inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input-red',
  errorClass: 'form__input-error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('#edit-profle');
const cardAddPopup = document.querySelector('#add-card');
const popupZoomIn = document.querySelector('#opn-img');
const cardsContainer = document.querySelector('.cards');
const formCardAddSubmit = document.querySelector('#create-card');
const cardNameInput = document.querySelector('#card-name');
const imageLinkInput = document.querySelector('#image-link');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const profileForm = profileEditPopup.querySelector('.form');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupZoomInImg = document.querySelector('.popup__image');
const popupZoomInTxt = document.querySelector('.popup__title');
const popups = document.querySelectorAll('.popup');

const escapePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

popups.forEach((popup) => {  
  popup.addEventListener('click', function(evt) {
    if(evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  });
});

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapePopup);
};

function openPopup(popup) {
  document.addEventListener('keydown', escapePopup);
  popup.classList.add('popup_opened');
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(profileEditPopup);
};

const renderZoom = ({name, link}) => {  
  popupZoomInImg.src = link;
  popupZoomInImg.alt = name;
  popupZoomInTxt.textContent = name;
  openPopup(popupZoomIn);
};

const renderCard = ({name, link}) => {
  const newCard = new Card({name, link}, '#create-card-template', function() {
    renderZoom({name, link})
  });
  cardsContainer.prepend(newCard.getView());
};

const addCard = (event) => {
  event.preventDefault();
  const link = imageLinkInput.value;
  const name = cardNameInput.value;  
  renderCard({name, link});
  event.target.reset();
  closePopup(cardAddPopup);
};

const enableAddFormValidation = new FormValidator(validationConfig, cardAddPopup);
enableAddFormValidation.enableValidation();

const enableEditFormValidation = new FormValidator(validationConfig, profileEditPopup);
enableEditFormValidation.enableValidation();

cardsContainer.append(...initialCards.map(renderCard));

formCardAddSubmit.addEventListener('submit', addCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);

buttonEditProfile.addEventListener('click', function() {  
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  enableEditFormValidation.actualizeData(true);
  openPopup(profileEditPopup);
});

buttonAddCard.addEventListener('click', function() {
  enableAddFormValidation.actualizeData(false);
  openPopup(cardAddPopup);
});