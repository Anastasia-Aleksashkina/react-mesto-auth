import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setLink(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    onAddCard({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"new-card"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Создать"}
    >
      <div className="popup__field">
        <input
          id="city"
          type="text"
          name="name"
          className="popup__input popup__input-city"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={name}
        />
        <span id="city-error" className="popup__error-visible"></span>
      </div>
      <div className="popup__field">
        <input
          id="link"
          type="url"
          name="link"
          className="popup__input popup__input-link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={link}
        />
        <span id="link-error" className="popup__error-visible"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
