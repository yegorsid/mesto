class Card {
  constructor({name, link}, templateSelector, renderZoom) {
    this._name = name;
    this._link = link;
    this._renderZoom = renderZoom;
    this._templateSelector = templateSelector;
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
    const btnLike = this._newCard.querySelector('.card__like');

    btnLike.addEventListener('click', () => {
      btnLike.classList.toggle('card__like_active');
    });

    this._newCard.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard()
    });

    this._cardImage.addEventListener('click', () => {
      this._renderZoom()
    });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._cardImage = this._getCardImage();
    this._setData();
    this._setEvtListeners();

    return this._newCard;

  }
}

export default Card;