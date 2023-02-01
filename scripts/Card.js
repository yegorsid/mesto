class Card {
  constructor({name, link}, renderZoom) {
    this._name = name;
    this._link = link;
    this._renderZoom = renderZoom;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#create-card-template');
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);

    return card;
  }

  _setData() {
    const CardImage = this._newCard.querySelector('.card__image');
    CardImage.src = this._link;
    this._newCard.querySelector('.card__name').textContent = this._name;
    CardImage.alt = this._name;
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

    this._newCard.querySelector('.card__image').addEventListener('click', () => {
      this._renderZoom()
    });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEvtListeners();

    return this._newCard;

  }
}

export default Card;