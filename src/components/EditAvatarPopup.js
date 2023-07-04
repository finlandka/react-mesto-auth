import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);

  const avatar = React.createRef();

  React.useEffect(() => {
    avatar.current.value = currentUser.avatar;
  }, [currentUser, avatar]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatarUrl"
        type="url"
        placeholder="Ссылка на аватар"
        name="link"
        required
        ref={avatar}
      />
      <span className="avatarUrl-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
