import React, { useState } from "react";
import { Link } from "react-router-dom";

const initValues = {
  email: "",
  password: "",
};

function Register({ onRegister }) {
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

    onRegister(email, password)
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
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          placeholder="Email"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__login-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
