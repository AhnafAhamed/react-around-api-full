function PopupWithForm(props) {
  return (
      <div onClick={props.onClose} className={`popup popup_${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
        <div className="popup__container">
          <h3 className={`popup__title popup__title_${props.name}`}>
            {props.title}
          </h3>
          <form
            onSubmit={props.onSubmit}
            action="POST"
            className={`popup__form popup__form_${props.name}`}
            name={`${props.name}`}
          >
            {props.children}
            <button
              type="submit"
              className="popup__btn"
              aria-label="Save Button"
            >
              {props.buttonText}
            </button>
          </form>
          <button
            type="button"
            className="popup__close-btn"
            aria-label="Close Button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
  );
}

export default PopupWithForm;
