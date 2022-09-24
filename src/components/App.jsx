import "../index.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isProve, setIsProve] = useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setIsInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => card._id !== c._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(card) {
    api
      .changeProfile(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(card) {
    api
      .changeAvatar(card)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddCard(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(email, password) {
    return auth
      .authorization(email, password)
      .then((data) => {
        if (!data.token) return;
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        history.push("/");
        setUserEmail(email);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip(true);
        setIsProve(false);
      });
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltip(true);
        setIsProve(true);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip(true);
        setIsProve(false);
      });
  }

  function logout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
  }

  function tokenCheck() {
    if (!localStorage.getItem("jwt")) return;
    const jwt = localStorage.getItem("jwt");
    // Проверяем токен пользователя
    return auth.getContent(jwt).then((data) => {
      if (data) {
        setUserEmail(data.email)
        setIsLoggedIn(true);
        history.push("/");
      }
    });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header logout={logout} userEmail={userEmail} isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardOpen={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isProve={isProve}
            confirmText="Вы успешно зарегистрировались!"
            rejectText="Что-то пошло не так! Попробуйте ещё раз."
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
          />
          <PopupWithForm
            title={"Вы уверены?"}
            name={"accept"}
            buttonText={"Да"}
          ></PopupWithForm>
          <ImagePopup
            card={selectedCard}
            isImageOpen={isImageOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
