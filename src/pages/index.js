import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig,
  buttonEditProfile,
  buttonAddCard,
  profileEditPopup,
  cardAddPopup,
  inputName,
  inputTitle
} from '../utils/constants.js';

const enableAddFormValidation = new FormValidator(validationConfig, cardAddPopup);
enableAddFormValidation.enableValidation();

const enableEditFormValidation = new FormValidator(validationConfig, profileEditPopup);
enableEditFormValidation.enableValidation();

const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__title'
})

const popupWithImage = new PopupWithImage('#opn-img');

const defaultCards = new Section({
  items: initialCards,
  renderer: ({name, link}) => {
    const newCard = new Card({name, link}, '#create-card-template', function() {
      popupWithImage.open({name, link})
    });
    
    defaultCards.addItem(newCard.getView());
  }
}, '.cards');

const profileEditing = new PopupWithForm('#edit-profle', function(userData) {
  userInfo.setUserData(userData)
});

const cardsAdding = new PopupWithForm('#add-card', function({name, link}) {
  const newCard = new Card({name, link}, '#create-card-template', function() {
    popupWithImage.open({name, link})
  });
  
  defaultCards.addItem(newCard.getView());
});

defaultCards.renderItems();

buttonEditProfile.addEventListener('click', function() {  
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputTitle.value = data.description;
  enableEditFormValidation.actualizeData(true);
  profileEditing.open();
});

buttonAddCard.addEventListener('click', function() {
  enableAddFormValidation.actualizeData(false);
  cardsAdding.open();
});

profileEditing.setEventListeners();

cardsAdding.setEventListeners();

popupWithImage.setEventListeners();