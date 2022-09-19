import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(""); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="avatar"
          type="url"
          name="avatar"
          className="popup__input popup__input-link"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span id="avatar-error" className="popup__error-visible"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
