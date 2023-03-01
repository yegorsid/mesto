class Card {
  constructor(item, templateSelector, handleCardClick, handleConfirmation, id, handleLikes) {
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleConfirmation = handleConfirmation;
    this._userId = id;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._cardLikesNumber = item.likes.length;
    this._handleLikes = handleLikes;
    this._likes = item.likes;
  }

  _handleTrashClick() {
    this._handleConfirmation(this._cardId, this._newCard);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector);
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);

    return card;
  }

  _getCardImage() {
    const cardImage = this._newCard.querySelector('.card__image');

    return cardImage;
  }

  _setData() {
    this._cardImage.src = this._link;
    this._newCard.querySelector('.card__name').textContent = this._name;
    this._cardImage.alt = this._name;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _setEvtListeners () {
    this._btnLike.addEventListener('click', () => {
      this._btnLike.classList.toggle('card__like_active');
      if (this._btnLike.classList.contains('card__like_active')) {
        this._handleLikes('PUT', this._cardId);        
      } else {
        this._handleLikes('DELETE', this._cardId);
      }      
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleTrashClick();      
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  setLikesNumber(number) {
    this._counterElement.textContent = number;
  }

  _hasMyLike() {
    for (let i = 0; i < this._cardLikesNumber;) {
      if (this._likes[i]._id === this._userId) {
        return true;
      } else {
        i++
      }
    }
  }

  getView() {
    this._newCard = this._getTemplate();
    this._cardImage = this._getCardImage();
    this._deleteBtn = this._newCard.querySelector('.card__trash');
    this._btnLike = this._newCard.querySelector('.card__like');
    this._counterElement = this._newCard.querySelector('.card__like-counter');
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    };
    if (this._hasMyLike()) {
      this._btnLike.classList.add('card__like_active');
    };
    this._setData();
    this._setEvtListeners();
    this.setLikesNumber(this._cardLikesNumber);

    return this._newCard;
  }
}

export default Card;