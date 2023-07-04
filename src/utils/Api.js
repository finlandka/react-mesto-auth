class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.userId = null;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then((res) =>
      this._getResponseData(res)
    );
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return this._request("users/me", { headers: this._headers }).then(
      (data) => {
        this.userId = data._id;
        return data;
      }
    );
  }

  getCards() {
    return this._request("cards", { headers: this._headers });
  }

  setUserInfo(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  setUserAvatar(data) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLike) {
    return this._request(`cards/${cardId}/likes`, {
      method: `${isLike ? "PUT" : "DELETE"}`,
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "18f7db66-c3a4-4e8d-a393-391bdf601f7c",
    "Content-Type": "application/json",
  },
});

export { api };
