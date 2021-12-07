function ImagePopup({ card, onClose, isOpen }) {
  return (
      <div
        onClick={onClose}
        className={`popup popup_image-expanded ${isOpen ? "popup_open" : ""}`}
      >
        <div className="image-expanded">
          <div className="image-expanded__container">
            <img
              src={card ? card.link : "#"}
              alt={card ? card.name : ""}
              className="image-expanded__image"
            />
            <h2 className="image-expanded__title">{card ? card.name : ""}</h2>
            <button
              onClick={onClose}
              className="popup__close-btn"
              type="button"
            ></button>
          </div>
        </div>
      </div>
  );
}

export default ImagePopup;
