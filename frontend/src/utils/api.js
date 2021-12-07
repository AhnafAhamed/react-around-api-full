class Api {
  constructor(params) {
    this.baseUrl = params.baseUrl;
    this.headers = params.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  }

  renderUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  renderCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  addCard({name, link}) {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo({name, about}) {
    return fetch(this.baseUrl + "/users/me/", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    }).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      headers: this.headers,
      method: "PUT"
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      headers: this.headers,
      method: "DELETE"
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      headers: this.headers,
      method: "DELETE"
    }).then((res) => this._checkResponse(res));
  }

  
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-13",
  headers: {
    authorization: "4bb4f649-ce49-4e5f-81c2-ac119aac9e7d",
    "Content-Type": "application/json",
  },
});

export default api;
