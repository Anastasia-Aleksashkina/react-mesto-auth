import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  keyId,
  src,
  title,
  card,
  likeCounter,
  onCardOpen,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  return (
    <ul className="element" key={keyId}>
      <li>
        <button
          type="button"
          className={`element__delete ${
            isOwn ? "element__delete_active" : ""
          }`}
          onClick={() => {
            onCardDelete(card);
          }}
        ></button>
      </li>
      <li>
        <img
          src={src}
          alt={title}
          className="element__image"
          onClick={() => {
            onCardOpen(card);
          }}
        />
      </li>
      <li className="element__info">
        <h3 className="element__city">{title}</h3>
        <div className="element__like-container">
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_active"}`}
            onClick={() => {
              onCardLike(card);
            }}
          ></button>
          <p className="element__like-counter">{likeCounter}</p>
        </div>
      </li>
    </ul>
  );
}

export default Card;
