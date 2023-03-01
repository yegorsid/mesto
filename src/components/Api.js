export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Произошла ошибка'))
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }

  createCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then((res) => this._handleResponse(res));
  }

  enableLikeCounting(request, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: request,
      headers: this._headers,
    })
    .then(err => {
      return this._handleResponse(err)
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(err => {
      return this._handleResponse(err)
    })
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }

  changeAvatarImg(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._handleResponse(res))
  }

  applyUserData({name, description}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then((res) => this._handleResponse(res));
  }
}