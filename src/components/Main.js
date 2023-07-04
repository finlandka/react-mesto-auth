import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onConfirmCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => {
    return (
      <li key={card._id} className="gallery__item">
        <Card
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onConfirmCardDelete={onConfirmCardDelete}
        />
      </li>
    );
  });

  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <div
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__info">
            <div>
              <h1 className="profile__fullname">{currentUser.name}</h1>
              <button
                className="button button_action_edit"
                onClick={onEditProfile}
                aria-label="Редактировать"
              ></button>
            </div>
            <p className="profile__position">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button button_action_add"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery-section">
        <ul className="gallery">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
