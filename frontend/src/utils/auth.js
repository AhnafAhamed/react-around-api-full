class authorizationApi {
  constructor() {
    this.baseUrl = "https://api.ahnaf.students.nomoreparties.site"
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

  checkUserToken() {
    const usertoken = localStorage.getItem('token');
    return fetch(this.baseUrl + "/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${usertoken}`,
      },
    })
    .then(data => data)
    .then((res) => this._checkResponse(res))
    
  }
}

const AuthApi = new authorizationApi();

export default AuthApi;
