import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ logout, userEmail }) {
  return (
    <header className="header root__header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__button">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__button">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__button" onClick={logout}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
