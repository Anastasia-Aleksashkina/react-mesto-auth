import React, { useState } from "react";

const initValues = {
  email: "",
  password: "",
};

function Login({ onLogin }) {
  const [state, setState] = useState(initValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = state;
    if (!email || !password) return;

    onLogin(email, password)
      .then(() => {
        setState(initValues);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);

        setState((old) => ({
          ...old,
          message: "Что-то пошло не так!",
        }));
      });
  }

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          placeholder="Email"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="login__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
