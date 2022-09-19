import React from "react";

function ImagePopup({ card, isImageOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isImageOpen ? "popup_opened" : ""}`} id="popup_image">
    <div className="popup__container popup__container_image">
      <figure className="popup__image-element">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image-src" />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  </div>
  );
}

export default ImagePopup;
