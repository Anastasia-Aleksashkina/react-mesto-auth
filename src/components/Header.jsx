import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ logout, userEmail, isLoggedIn }) {
  const location = useLocation();
  const isLoginPage = location?.pathname === "/sign-in";

  return (
    <header className="header root__header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {isLoginPage ? (
        <Link to="/sign-up" className="header__button header__button_log">
          Регистрация
        </Link>
      ) : isLoggedIn ? undefined : (
        <Link to="/sign-in" className="header__button header__button_log">
          Войти
        </Link>
      )}
      {isLoggedIn && (
        <div className="header__user-info">
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__button" onClick={logout}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
