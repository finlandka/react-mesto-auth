import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [namePlace, setNamePlace] = React.useState("");
  const [urlPlace, setUrlPlace] = React.useState("");

  React.useEffect(() => {
    setNamePlace("");
    setUrlPlace("");
  }, [isOpen]);

  function handleChangeNamePlace(e) {
    setNamePlace(e.target.value);
  }

  function handleChangeUrlPlace(e) {
    setUrlPlace(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: namePlace,
      link: urlPlace,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="placeName"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        name="name"
        required
        value={namePlace}
        onChange={handleChangeNamePlace}
      />
      <span className="placeName-error popup__error"></span>
      <input
        className="popup__input"
        id="placeUrl"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        value={urlPlace}
        onChange={handleChangeUrlPlace}
      />
      <span className="placeUrl-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
