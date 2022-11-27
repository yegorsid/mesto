const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let inputName = document.getElementById('name');
let inputTitle = document.getElementById('title');

inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;

function submitInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  popup.classList.remove('popup_opened');
}

let formElement = document.querySelector('.form');
formElement.addEventListener('submit', submitInfo); 

let btnLikes = document.querySelectorAll('.card__like');
for(i = 0; i < btnLikes.length; i++) {
  btnLikes[i].addEventListener('click', likeDislike);
}

function likeDislike() {  
  this.classList.toggle('card__like_active'); 
}
