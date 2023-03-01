export default class UserInfo {
  constructor({userName, userDescription, userAvatar}) { 
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar);
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
    this._userDescription.textContent = userData.about;
    this._userAvatar.src = userData.avatar;
    this._userId = userData._id;
  }

  getUserId() {
    return this._userId;
  }
}