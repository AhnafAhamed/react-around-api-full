import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  function handleClick() {
    onCardClick(card);
  }
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(likedUser => likedUser._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__delete-icon' : 'elements__delete-icon_hidden'}`
  ); 

  const cardLikeButtonClassName = (
    `${isLiked ? 'elements__heart-icon_liked elements__heart-icon' : 'elements__heart-icon'}`
  )

  return (
      <li className="elements__card">
        <img
          onClick={handleClick}
          src={card.link}
          alt={card.name}
          className="elements__image"
        />
        <div className="elements__info">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__likes">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={() => onCardLike(card)}
              aria-label="Heart Button"
            ></button>
            <span className="elements__like-counter" >{card.likes.length}</span>
          </div>
        </div>
        <button
          className={cardDeleteButtonClassName}
          onClick={() => onCardDelete(card)}
          type="button"
          aria-label="Delete Button"
        ></button>
      </li>
  );
}

export default Card;
