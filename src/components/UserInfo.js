export default class UserInfo {
  constructor({userName, userDescription}) { 
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent     
    };

    return userInfo;
  }

  setUserData(userData) {
    this._userName.textContent = userData.name;
    this._userDescription.textContent = userData.description;
  }
}