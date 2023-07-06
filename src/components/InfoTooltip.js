function InfoTooltip({ onClose, text, image }) {
  return (
    <div className={`popup info-tooltip popup_opened`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="button button_action_close"
          aria-label="Закрыть"
        />
        <img src={image} alt="" className="info-tooltip__image"/>
        <p className="info-tooltip__text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
