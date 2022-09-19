import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setAbout(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: name,
      about: about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <div className="popup__field">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input popup__input-name"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={name || ""}
        />
        <span id="name-error" className="popup__error-visible"></span>
      </div>
      <div className="popup__field">
        <input
          id="about"
          type="text"
          name="about"
          placeholder="Занятие"
          className="popup__input popup__input-about"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={about || ""}
        />
        <span id="about-error" className="popup__error-visible"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
