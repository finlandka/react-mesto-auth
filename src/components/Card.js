import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default React.memo(function Card({
  card,
  onCardClick,
  onCardLike,
  onConfirmCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button heart ${
    isLiked && "heart_status_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmCardDelete(card);
  }

  return (
    <>
      {isOwn && (
        <button
          className="button gallery__delete"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="gallery__pic"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="gallery__desc">
        <h2 className="gallery__title">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="gallery__count">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
});
