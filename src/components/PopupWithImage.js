import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupZoomInImg = this._popup.querySelector('.popup__image');
    this._popupZoomInTxt = this._popup.querySelector('.popup__title');
  }

  open(name, link) {  
    this._popupZoomInImg.src = link;
    this._popupZoomInImg.alt = name;
    this._popupZoomInTxt.textContent = name;
    super.open();    
  }
}