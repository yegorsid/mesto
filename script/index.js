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
const cardsContainer = document.querySelector('.cards');
const createCardButton = document.querySelector('#create-card');
const cardNameInput = document.querySelector('#card-name');
const imageLinkInput = document.querySelector('#image-link');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('name');
const inputTitle = document.getElementById('title');
const profileForm = document.querySelector('.form');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const zoomInPopupImg = document.querySelector('.popup__image');
const zoomInPopupTxt = document.querySelector('.popup__title');

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(editProfilePopup);
};

const createCard = ({name, link}) => {
  const cardTemplate = document.querySelector('#create-card-template');
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const btnLike = card.querySelector('.card__like');
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  card.querySelector('.card__name').textContent = name;
  cardImage.alt = name;
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like_active');
  });
  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });

  cardImage.addEventListener('click', () => {
    renderZoom({name, link});
  });

  return card;
};

const renderCard = ({name, link}) => {
  cardsContainer.prepend(createCard({name, link}))
};

const addCard = (event) => {
  event.preventDefault();
  const link = imageLinkInput.value;
  const name = cardNameInput.value;  
  renderCard({name, link});
  cardNameInput.value = '';
  imageLinkInput.value = '';
  closePopup(addCardPopup);
};

const renderZoom = ({name, link}) => {
  openPopup(zoomInPopup);
  zoomInPopupImg.src = link;
  zoomInPopupImg.alt = name;
  zoomInPopupTxt.textContent = name;
};

cardsContainer.append(...initialCards.map(createCard));

createCardButton.addEventListener('submit', addCard);

editButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(addCardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
