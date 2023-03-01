export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '6f350c74-9eae-4112-a46f-4d781c8a0946',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input-red',
  errorClass: 'form__input-error_active'
};

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const profileEditPopup = document.querySelector('#edit-profle');
export const cardAddPopup = document.querySelector('#add-card');
export const uploadAvatarPopup = document.querySelector('#upload-avatar');
export const inputName = document.querySelector('#name');
export const inputTitle = document.querySelector('#title');
export const buttonChangeAvatar = document.querySelector('.profile__edit-avatar');

