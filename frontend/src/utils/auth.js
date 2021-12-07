class authorizationApi {
  constructor() {
    this.baseUrl = "https://register.nomoreparties.co";
    this.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  }

  registerUser({ email, password }) {
    return fetch(this.baseUrl + "/signup", {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._checkResponse(res))
  }

  authorizeUser({ email, password }) {
    return fetch(this.baseUrl + "/signin", {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((res) => this._checkResponse(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      })
  }

  checkUserToken( token ) {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    .then(data => data)
    .then((res) => this._checkResponse(res))
    
  }
}

const authApi = new authorizationApi();

export default authApi;
