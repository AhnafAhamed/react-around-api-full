import { useEffect, useState } from "react/cjs/react.development";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard}) {
  const [cardName, setCardName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setCardName("")
    setLink("")
  },[isOpen])

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: cardName,
      link: link
    })
  }

  return (
      <PopupWithForm
        name="card"
        title="New Place"
        buttonText="Save"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="card-title-input"
          onChange={handleCardNameChange}
          name="name"
          type="text"
          className="popup__input popup__input_place_name"
          placeholder="Name"
          value={cardName}
          minLength="2"
          maxLength="250"
          required
        />
        <span id="card-title-input-error" className="popup__input-error"></span>
        <input
          id="card-link-input"
          onChange={handleLinkChange}
          name="link"
          type="url"
          className="popup__input popup__input_place_image-url"
          placeholder="Image URL"
          value={link}
          minLength="2"
          maxLength="250"
          required
        />
        <span id="card-link-input-error" className="popup__input-error"></span>
      </PopupWithForm>
  );
}

export default AddPlacePopup;
