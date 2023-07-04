import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, cardToDelete }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(cardToDelete);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
