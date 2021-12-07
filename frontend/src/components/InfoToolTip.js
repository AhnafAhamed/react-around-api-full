import successIcon from "../images/success.svg";
import errorIcon from "../images/error.svg";

function InfoToolTip({ onClose, isRegistered, isOpen }) {
  return (
      <div onClick={onClose} className={`popup popup__info-tool-tip ${isOpen ? 'popup_open' : '' }`}>
        <div className="popup__container popup__info-tool-tip_container">
            <img className="popup__info-tool-tip_icon" src={ isRegistered ? successIcon : errorIcon } alt="Status Icon" />
            <p className="popup__info-tool-tip_message">
              {
                isRegistered ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."
              }            
            </p>
            <button
              onClick={onClose}
              className="popup__close-btn"
              type="button"
            ></button>
        </div>
      </div>
  );
}

export default InfoToolTip;
