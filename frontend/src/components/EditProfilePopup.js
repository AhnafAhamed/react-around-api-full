import { useEffect, useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])
  
  return (
      <PopupWithForm
        onSubmit={handleSubmit}
        name="profile"
        title="Edit Profile"
        buttonText="Save"
        isOpen={isOpen}
        onClose={onClose}
      >
        <input
          id="profile-title-input"
          name="name"
          type="text"
          className="popup__input popup__input_value_name"
          placeholder="Name"
          value={name || ""}
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          required
        />
        <span
          id="profile-title-input-error"
          className="popup__input-error"
        ></span>
        <input
          id="profile-about-input"
          name="about"
          type="text"
          className="popup__input popup__input_value_about"
          placeholder="About Me"
          value={description || ""}
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
          required
        />
        <span
          id="profile-about-input-error"
          className="popup__input-error"
        ></span>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
