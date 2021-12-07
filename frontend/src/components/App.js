import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import InfoToolTip from "./InfoToolTip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthApi from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopuOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    api
      .renderUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .renderCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthApi.checkUserToken(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  function handleUserRegistration({ email, password }) {
    if (!email || !password) {
      return;
    }
    AuthApi.registerUser({ email, password })
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          history.push("/login");
        }
      })
      .catch((err) => {
        setIsRegistered(false);
        console.log(err + "error");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function handleUserLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    AuthApi.authorizeUser({ email, password })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setEmail(email);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUserLogout() {
    setLoggedIn(false);
    setEmail("");
    localStorage.removeItem("token");
    history.push("/login");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    let likeStatus =
      isLiked === false
        ? api.addLike(card._id).catch((err) => {
            console.log(err);
          })
        : api.removeLike(card._id).catch((err) => {
            console.log(err);
          });

    likeStatus
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const cardList = cards.filter((c) => c._id !== card._id);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard({ name, link }) {
    api
      .addCard({ name, link })
      .then((data) => {
        setCards([data, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopuOpen(true);
  }

  function closePopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopuOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }

  function handleClosePopups(e) {
    if (
      e.target.classList.contains("popup_open") ||
      e.target.classList.contains("popup__close-btn")
    ) {
      closePopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header email={email} loggedIn={loggedIn} logOut={handleUserLogout} />
        <div className="homepage">
          <Switch>
            <ProtectedRoute
              path="/home"
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditProfileClick={handleEditProfileClick}
              onEditAvatarClick={handleEditAvatarClick}
              onAddPlaceClick={handleAddPlaceClick}
              component={Main}
              loggedIn={loggedIn}
            />
            <Route path="/register">
              <Register onRegisterUser={handleUserRegistration} />
            </Route>
            <Route path="/login">
              <Login onLoginUser={handleUserLogin} />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>
          </Switch>
          {loggedIn ? <Footer /> : ""}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClosePopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClosePopups}
            onAddCard={handleAddCard}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={handleClosePopups}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            isRegistered={isRegistered}
            onClose={handleClosePopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
