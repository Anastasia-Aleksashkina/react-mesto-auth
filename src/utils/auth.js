export const BASE_URL = "https://auth.nomoreparties.co";

// Шаблон запроса
function request({ url, token, method = "POST", data }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }), // Опциональное добавление свойства в объект
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

// Регистрация
export const register = (email, password ) => {
  return request({
    url: "/signup",
    data: { email, password },
  });
};

// Авторизация
export const authorization = (email, password) => {
  return request({
    url: "/signin",
    data: { email, password },
  });
};

// Проверка токена и получение данных пользователя
export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    token: token,
  });
};
