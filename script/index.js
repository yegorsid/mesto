const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let inputName = document.getElementById('name');
let inputTitle = document.getElementById('title');
let formElement = document.querySelector('.form');
let btnLikes = document.querySelectorAll('.card__like');

for(i = 0; i < btnLikes.length; i++) {
  btnLikes[i].addEventListener('click', likeDislike);
}

function submitInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  popup.classList.remove('popup_opened');
}

function likeDislike() {  
  this.classList.toggle('card__like_active'); 
}

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

formElement.addEventListener('submit', submitInfo);