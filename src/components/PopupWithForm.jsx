import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, buttonText, onSubmit }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id={`popup_${name}`}
    >
      <div className="popup__container" onClick={(e) => {e.stopPropagation()}}>
        <button
          className="popup__button-close"
          id={`${name}_close`}
          type="button"
          onClick={onClose}
        />
        <form className="popup__form" name={`${name}_form`} onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            className="popup__button"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
