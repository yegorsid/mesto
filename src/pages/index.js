import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  buttonEditProfile,
  buttonAddCard,
  buttonChangeAvatar,
  profileEditPopup,
  cardAddPopup,
  uploadAvatarPopup,
  inputName,
  inputTitle,
  apiConfig
} from '../utils/constants.js';

const enableAddFormValidation = new FormValidator(validationConfig, cardAddPopup);
enableAddFormValidation.enableValidation();

const enableEditFormValidation = new FormValidator(validationConfig, profileEditPopup);
enableEditFormValidation.enableValidation();

const enableEditAvatarValidation = new FormValidator(validationConfig, uploadAvatarPopup);
enableEditAvatarValidation.enableValidation();

const api = new Api(apiConfig);

Promise.all([
  api.getUserData(),
  api.getCards()  
])
.then((res) => {
  const [ resUserData, resCardsArray ] = res;
  userInfo.setUserData(resUserData);
  defaultCards.renderItems(resCardsArray);
})
.catch((error) => {
  console.log(`Ошибка ${error} при добавлении дефолтных карточек`)
});

const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__title',
  userAvatar: '.profile__avatar'
})

const popupWithImage = new PopupWithImage('#opn-img');

function returnCard(item) {
  const newCard = new Card(item, '#create-card-template', 
  function() { 
    popupWithImage.open(item.name, item.link) 
  },
  function(id, cardLayout) {
    popupConfirmation.open(id, cardLayout)
  },
  userInfo.getUserId(),
  function(request, cardId) {
    api.enableLikeCounting(request, cardId)
    .then((res) => {
      newCard.setLikesNumber(res.likes.length);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} в лайках`)
    })
  }
  );

  const cardElement = newCard.getView();
  return cardElement;
}

const defaultCards = new Section(
  (item) => {defaultCards.addItem(returnCard(item))}, '.cards');

const popupAddCard = new PopupWithForm('#add-card', function(item) {
  popupAddCard.toggleBtnText(true, `Создать`);
  api.createCard(item)
  .then((res) => {
    defaultCards.addItem(returnCard(res))
  })
  .then(() => {
    popupAddCard.close();
  })
  .catch((error) => {
    console.log(`Ошибка ${error} в попапе добавления карточки`)
  })
  .finally(() => {
    popupAddCard.toggleBtnText(false, `Создать`);
  })
});

const popupEditProfile = new PopupWithForm('#edit-profle', function(userData) {
  popupEditProfile.toggleBtnText(true, `Сохранить`);
  api.applyUserData(userData)
  .then((res) => {
    userInfo.setUserData(res)
  })
  .then(() => {
    popupEditProfile.close();
  })
  .catch((error) => {
    console.log(`Ошибка ${error} в попапе изменения текста профиля`)
  })
  .finally(() => {
    popupEditProfile.toggleBtnText(false, `Сохранить`);
  })
});

const popupUpdateAvatar = new PopupWithForm('#upload-avatar', function(avatar) {
  popupUpdateAvatar.toggleBtnText(true, `Сохранить`);
  api.changeAvatarImg(avatar.link)
  .then((res) => {
    userInfo.setUserData(res);
  })
  .then(() => {
    popupUpdateAvatar.close();
  })
  .catch((error) => {
    console.log(`Ошибка ${error} в попапе изменения автара`)
  })
  .finally(() => {
    popupUpdateAvatar.toggleBtnText(false, `Сохранить`);
  })
});

const popupConfirmation = new PopupWithConfirmation('#confirm', function(id, cardLayout) {
  api.deleteCard(id)
  .then(() => {
    cardLayout.remove();
  })
  .then(() => {
    popupConfirmation.close();
  })
  .catch((error) => {
    console.log(`Ошибка ${error} в попапе подтверждения`);
  })
});

buttonEditProfile.addEventListener('click', function() {  
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputTitle.value = data.description;
  enableEditFormValidation.actualizeData(true);
  popupEditProfile.open();
});

buttonAddCard.addEventListener('click', function() {
  enableAddFormValidation.actualizeData(false);
  popupAddCard.open();
});

buttonChangeAvatar.addEventListener('click', function() {
  enableEditAvatarValidation.actualizeData(false);
  popupUpdateAvatar.open();
});

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners();

popupWithImage.setEventListeners();

popupUpdateAvatar.setEventListeners();

popupConfirmation.setEventListeners();