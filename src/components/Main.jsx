import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardOpen, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext

  return (
    <>
      <section className="profile root__profile">
        <div className="profile__wrapper">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar-img"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__button-edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__user-about">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-edd"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements root__elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            src={card.link}
            title={card.name}
            likeCounter={card.likes.length}
            onCardOpen={onCardOpen}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </>
  );
}

export default Main;
