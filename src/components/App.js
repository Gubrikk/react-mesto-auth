import React from 'react';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { authApi } from '../utils/authApi';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isConfitmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.error(err)
      });
    }
  }, [loggedIn]);
  
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getItem(token)
      .then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(res.email);
        history.push('/');
      }
      })
      .catch(err => console.log(err));
    }
  }, [history]);

  function onRegister(data) {
    authApi.registerUser(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccessAuth(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSuccessAuth(false);
        console.log(err);
      }
    );
  }
  
  function onLogin(data) {
    authApi.loginUser(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setEmail(data.email);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }
  
  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
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

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPhotoPopupOpen(true);
  }
  
  React.useEffect(() => {
    function handleCloseByEsc (evt) {
      if (evt.key === 'Escape') {
      closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleCloseByEsc);
    return () => {
    document.removeEventListener('keydown', handleCloseByEsc);
    }
  }, []);
  
  function handleClickOnBackground(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => {
          console.error(err);
        });
  }

  function handleRemoveCard(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }
  
  function handleCardDeleteConfirm() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id))
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(user) {
    api.updateAvatar(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlace (newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPhotoPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header 
        loggedIn={loggedIn}
        onSignOut={onSignOut}
        email={email}
      />
      <Switch>
        <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn}
          cards={cards}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleRemoveCard}
        />
        <Route path='/sign-in'>
          <Login
            onLogin={onLogin}
          />
        </Route>
        <Route path='/sign-up'>
          <Register
            onRegister={onRegister}
          />
        </Route>
        <Route>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>
      <Footer 
        loggedIn={loggedIn}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onCloseOverlay={handleClickOnBackground}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onCloseOverlay={handleClickOnBackground}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onCloseOverlay={handleClickOnBackground}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ImagePopup
        card={selectedCard}
        onCloseOverlay={handleClickOnBackground}
        isOpen={isPhotoPopupOpen}
        onClose={closeAllPopups}
      />
      <ConfirmPopup
        isOpen={isConfitmPopupOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleClickOnBackground}
        onConfirmDelete={handleCardDeleteConfirm}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onCloseOverlay={handleClickOnBackground} 
        isSuccessAuth={isSuccessAuth}
      />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
