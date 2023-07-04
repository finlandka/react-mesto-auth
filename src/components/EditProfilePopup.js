import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="formName"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        name="name"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="formName-error popup__error"></span>
      <input
        className="popup__input"
        id="formPosition"
        type="text"
        placeholder="Вид деятельности"
        minLength="2"
        maxLength="200"
        name="position"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="formPosition-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
