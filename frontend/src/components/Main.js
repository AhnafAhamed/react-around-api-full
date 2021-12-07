import Card from "./Card";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
})


{
  const currentUser = useContext(CurrentUserContext);
  return (
      <main className="main">
        <section className="profile">
          <div className="profile__picture" onClick={onEditAvatarClick}>
            <img
              src={currentUser.avatar}
              alt="Jacques Cousteau"
              className="profile__image"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Edit Button"
              onClick={onEditProfileClick}
            ></button>
            <p className="profile__tag">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__plus-button"
            aria-label="Plus Button"
            onClick={onAddPlaceClick}
          ></button>
        </section>
        <section>
          <ul className="elements">
              {cards.map((card) => (
                <Card key={card._id} card={card} onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} />
              ))}
          </ul>
        </section>
      </main>
  );
}

export default Main;
