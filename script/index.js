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

const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('#edit-profle');
const addCardPopup = document.querySelector('#add-card');
const zoomInPopup = document.querySelector('#opn-img');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards');
const createCardButton = document.querySelector('#create-card');
const cardNameInput = document.querySelector('#card-name');
const imageLinkInput = document.querySelector('#image-link');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let inputName = document.getElementById('name');
let inputTitle = document.getElementById('title');
let formElement = document.querySelector('.form');
let popupCloseButtons = document.querySelectorAll('.popup__close-button');
let closeEditing = document.getElementById('close-edit-popup');
let closeAdding = document.getElementById('close-add-popup');
let closeZooming = document.getElementById('close-img-popup');

const closePopup = (popupID) => {
  popupID.classList.remove('popup_opened');
};

function submitInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(editProfilePopup);
}

const createCard = ({name, link}) => {
  const cardTemplate = document.querySelector('#create-card-template');
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const btnLike = card.querySelector('.card__like');
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__name').textContent = name;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__like').addEventListener('click', () => {
    btnLike.classList.toggle('card__like_active');
  });
  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.card__image').addEventListener('click', () => {
    renderZoom({name, link});
  });

  return card;
};

const renderCard = ({name, link}) => {
  cardsContainer.prepend(createCard({name, link}))
}

const addCard = (event) => {
  event.preventDefault();
  const link = imageLinkInput.value;
  const name = cardNameInput.value;  
  renderCard({name, link});
  cardNameInput.value = '';
  imageLinkInput.value = '';
  closePopup(addCardPopup);
};

const zoomIn = ({name, link}) => {
  const zoomTemplate = document.querySelector('#zoom-image');
  const zoom = zoomTemplate.content.querySelector('#opn-img').cloneNode(true);
  zoom.querySelector('.popup__image').src = link;
  zoom.querySelector('.popup__title').textContent = name;
  zoom.querySelector('.popup__image').alt = name;
  zoom.querySelector('#close-img-popup').addEventListener('click', () => {
    zoom.style.opacity = '0';
    setTimeout(() => zoom.remove(), 400);
  });
  
  return zoom;
};

const renderZoom = ({name, link}) => {
  page.prepend(zoomIn({name, link}));
  setTimeout(() => document.querySelector('#opn-img').classList.add('popup_opened'), 50);
};

cardsContainer.append(...initialCards.map(createCard));

createCardButton.addEventListener('submit', addCard);

editButton.addEventListener('click', function() {
  editProfilePopup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
});

addButton.addEventListener('click', function() {
  addCardPopup.classList.add('popup_opened');
});

closeEditing.addEventListener('click', function() {
  editProfilePopup.classList.remove('popup_opened');
});

closeAdding.addEventListener('click', function() {
  addCardPopup.classList.remove('popup_opened');
});

formElement.addEventListener('submit', submitInfo);
