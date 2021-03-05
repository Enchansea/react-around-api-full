import React, { useEffect, useState, useMemo } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Api from '../utils/Api';
import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddCardPopup from './AddCardPopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';
import * as aroundAuth from '../utils/aroundAuth';



function App() {
  const [cards, setCards] = useState([]);

  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedImageOpen] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [selectedCardLink, setSelectedCardLink] = useState("");
  //const [isDeleteOpen, setDeletePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const api = useMemo(() => {
    return new Api({
      baseUrl: "http://localhost:3000",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }, [token]);


  const history = useHistory();

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));

    api.getCardList()
      .then(res => {
        setCards(res.map((card) => ({
          link: card.link,
          name: card.name,
          likes: card.likes,
          owner: card.owner,
          _id: card._id
        })))

      })
      .catch(err => console.log(err));
  }, [api])

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      aroundAuth.checkToken(jwt)
      .then((res) => {
        if (res.err) {
          console.log('Error!');
        }
        setLoggedIn(true);
        setUserEmail(res.email);
        setToken(jwt);
        history.push('/');
      })
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    handleTokenCheck();
  })


  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/signin');
  }

  function handleAvatarClick() {
    setIsEditAvatarOpen(true);
  }
  function handleProfileClick() {
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }
  function handleCardClick(link, title) {
    setSelectedCardLink(link);
    setSelectedCardTitle(title);
    setSelectedImageOpen(true);
  }

  function handleCardLike(card) {
    debugger
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log('here');
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const cardCopy = cards.filter((c) => c._id !== card._id);
        setCards(cardCopy)
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(name, link) {
    debugger
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => setIsAddPlaceOpen(false))
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.setUserInfo({ name, about })
      .then(() => {
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar
        })
      })
      .then(() => setIsEditProfileOpen(false))
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar })
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar
        })
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch(err => console.log(err));
  }

  function handleSignup(email, password) {
    aroundAuth.register(email, password)
    .then((res) => {
      if (res.err || !res) {
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      } else {
        setIsSuccessful(true);
        setIsInfoToolTipOpen(true);
        history.push('/signin');
      }
    })
    .catch(err => console.log(err));
    setIsSuccessful(false);
    setIsInfoToolTipOpen(true);
  }

  function handleLogin(email, password) {
    aroundAuth.authorize(email, password)
    .then((res) => {
      if (!res) {
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      } if (res.err) {
        console.log(res.error);
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      }
      handleTokenCheck()
    })
    .catch((err) => {
      console.log(err);
      setIsSuccessful(false);
      setIsInfoToolTipOpen(true);
    })
  }

  function closeAllPopups(evt) {
    if (evt.target !== evt.currentTarget) return
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setSelectedImageOpen(false);
    setIsInfoToolTipOpen(false);
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/signup">
              <Header link="/signin" linkText={'Login'} />
              <Register handleSignup={handleSignup} />
            </Route>
            <Route path="/signin">
              <Header link="/signup" linkText={'Signup'} />
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute path="/"
              loggedIn={loggedIn}
              signOut={onSignOut}
              component={Main}
              userEmail={userEmail}
              cards={cards}
              onEditAvatar={handleAvatarClick}
              onEditProfile={handleProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={(data) => { handleCardClick(data) }}
              handleCardClick={handleCardClick}
              onCardDelete={(card) => { handleCardDelete(card) }}
              handleCardDelete={handleCardDelete}
              onCardLike={(card) => { handleCardLike(card) }}
              handleCardLike={handleCardLike}
              onClose={closeAllPopups}
               />
            <Route path="/*">
              <Redirect to="/signin" />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>

            {/*Add avatar img popup*/}
            <EditAvatarPopup
              isOpen={isEditAvatarOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            {/*Edit profile name and about popup*/}
            <EditProfilePopup
              isOpen={isEditProfileOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />

            {/*Add-card popup with card name and url */}
            <AddCardPopup
              isOpen={isAddPlaceOpen}
              onClose={closeAllPopups}
              onUpdateAddCard={handleAddPlace} />

            {/*Image popup*/}
            <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} title={selectedCardTitle} link={selectedCardLink} />

            {/*Popup Fail/Success*/}
            <InfoToolTip name="info-section" valid={isSuccessful} isOpen={isInfoToolTipOpen} onClose={closeAllPopups}/>


    </CurrentUserContext.Provider>
  );
}

export default App;
