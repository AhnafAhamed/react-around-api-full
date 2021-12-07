import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value)
  }

  return (
      <PopupWithForm
        name="avatar"
        title="Change Profile Picture"
        buttonText="Save"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          ref={avatarRef}
          id="image-link-input"
          name="avatar"
          type="url"
          className="popup__input popup__input_profile_link"
          placeholder="url"
          defaultValue=""
          minLength="2"
          maxLength="250"
          required
        />
        <span
          id="image-link-input-error"
          className="popup__input-error popup__input-error_profile-image"
        ></span>
        <span
          id="profile-about-input-error"
          className="popup__input-error"
        ></span>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
