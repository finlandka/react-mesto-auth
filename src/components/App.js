import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute.js";
import { api } from "../utils/Api.js";
import { getToken } from '../utils/Auth.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { LoggedInContext } from "../contexts/LoggedInContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import Register from "./Register.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import imageSuccess from "../images/success.png";
import imageFail from "../images/fail.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => { 
    chekToken();
  }, [])

  function chekToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      getToken(token).then(result => {
        if (result) {
          setLoggedIn(true);
          setEmail(result.data.email);
          navigate('/', {replace:true})
        }
      })

    }
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email);
  }

  function handleOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && card));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setCardToDelete({});
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((result) => {
        setCurrentUser({
          ...currentUser,
          name: result.name,
          about: result.about,
        });
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((result) => {
        setCurrentUser({ ...currentUser, avatar: result.avatar });
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <div className="page">
          <div className="page__container">
            <Header location={location} handleOut={handleOut} email={email} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onConfirmCardDelete={handleDeleteCardClick}
                        cards={cards}
                      />
                    }
                  />
                }
              />
              <Route path="/sign-up" element={<Register />} />
              <Route
                path="/sign-in"
                element={<Login handleLogin={handleLogin} />}
              />
            </Routes>

            <Footer />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            text="Вы успешно зарегистрировались!"
            image={imageSuccess}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            text="Что-то пошло не так! Попробуйте ещё раз."
            image={imageFail}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            cardToDelete={cardToDelete}
          />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
