class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()])
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
  }

  changeLikeCardStatus(cardId, like) {
    if(like) {
      return fetch(`${this._baseUrl}/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
        body: JSON.stringify({
          like
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    } else {
      return fetch(`${this._baseUrl}/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE"
      })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    }
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
    //.then(res => console.log("post", res))
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))

  }
}


export default Api;
