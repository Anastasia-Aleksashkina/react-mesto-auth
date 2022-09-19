class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Приватный метод обработки ответа
  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }
    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение данных профиля с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Отправка на сервер новой карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getJsonOrError);
  }

  // Обновление данных профиля на сервере
  changeProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getJsonOrError);
  }

  // Обновление аватара на сервере
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJsonOrError);
  }

  // Удаление карточки на сервере
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Постановка лайка
  putLikeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  // Снятие лайка
  deleteLikeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOrError);
  }

  changeLikeCardStatus(card, isLiked) {
    return isLiked ? this.putLikeCard(card) : this.deleteLikeCard(card)
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "57fe7532-adaf-4e02-b40f-30da1bce78cd",
    "Content-Type": "application/json",
  },
});