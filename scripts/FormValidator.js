class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }
  
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };
  
  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll(this._config.inputSelector)).some((inputElement) => !inputElement.validity.valid);
  }
  
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._formElement.querySelector(this._config.submitButtonSelector).classList.add(this._config.inactiveButtonClass);
      this._formElement.querySelector(this._config.submitButtonSelector).disabled = true;
    } else {
      this._formElement.querySelector(this._config.submitButtonSelector).classList.remove(this._config.inactiveButtonClass);
      this._formElement.querySelector(this._config.submitButtonSelector).disabled = false;
    }
  }
  
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  actualizeData(editPopup) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();
    if (editPopup) {
      inputList.forEach((inputElement) => {
       this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    }  
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;