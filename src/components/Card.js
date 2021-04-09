import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
	const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
  	`element__trash ${isOwn ? 'element__trash_active' : null}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
  	`element__info-like ${isLiked ? 'element__info-like_active' : null}`
  );

	function handleImageClick() {
  	onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleCardDelete() {
		onCardDelete(card);
	}

  return (
  	<article className="element">
    	<button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}/>
    	<img className="element__image" src={card.link} alt={card.name} onClick={handleImageClick}/>
    	<div className="element__title">
      	<h3 className="element__name">{card.name}</h3>
        <div className="element__info">
        	<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
        	<p className="element__info-like-counter">{card.likes.length}</p>
      	</div>
    	</div>
    </article>
  	);
}

export default Card;