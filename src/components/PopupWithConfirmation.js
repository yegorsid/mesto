import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submitBtn = this._popup.querySelector('.form__button');
    this._submit = submit;
  }

  open(id, cardLayout) {
    this._id = id;
    this._cardLayout = cardLayout;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submit(this._id, this._cardLayout)
    })
  }
}