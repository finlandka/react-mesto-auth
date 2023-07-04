function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="button button_action_close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        {card && (
          <>
            <img className="popup__image" src={card.link} alt={card.name} />
            <h2 className="popup__desc">{card.name}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
