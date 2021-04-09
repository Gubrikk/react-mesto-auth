class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
    .then(this._checkResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
            avatar: data.avatar
      })
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
              name: data.name,
              link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
        })
        .then(this._checkResponse);
        } else {
          return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
          })
        .then(this._checkResponse)    
    }
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    'content-type': 'application/json',
    'authorization': '80281606-7e64-45b0-a996-6277fb44273c',
  }
})