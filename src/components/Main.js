import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
	const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
  	<section className="profile">
    	<div className="profile__avatar">
    		<img className="profile__avatar-ellipse" src={currentUser.avatar} alt="Фото" />
    		<button className="profile__avatar-edit-button" 
						  	type="button" 
							  aria-label="Редактировать аватар"
							  onClick={onEditAvatar}>
				</button>
      </div>
      	<div className="profile__info">
      		<div className="profile__name-container">
        		<h1 className="profile__name">{currentUser.name}</h1>
        		<button className="profile__edit-button"
								    type="button" 
								    aria-label="Edit"  
								    onClick={onEditProfile}>
						</button>
          </div>
        	<p className="profile__job">{currentUser.about}</p>
        </div>
      <button className="profile__add-button"
				    	type="button" 
						  aria-label="Add" 
						  onClick={onAddPlace}>
			</button>
    </section>

    <section className="elements">
			{cards.map((card) => 
      	<Card
          key={card._id}
					card={card}
        	onCardClick={onCardClick}
					onCardLike={onCardLike}
					onCardDelete={onCardDelete}
      	/>
			)}
		</section>
    </main>
  );
}

export default Main;