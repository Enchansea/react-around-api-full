import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  // Checking to see if I own the current card
  const isOwn = props.owner === currentUser._id;

  // Creating a variable for the delete button
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__remove-button_visible' : 'card__remove-button'}`
  );

  console.log(props.card.likes);
  // Check if the card was liked by the current users
  const isLiked = props.card.likes.some(i => i === currentUser._id );

  // Creating a variable for the like button
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_clicked' : 'card__like-button'}`
  )

   // handeling the like heart click of a card
   function handleLikeClick() {
    props.onCardLike(props.card);
    // console.log('props.card', props.card);
  };
  // handeling the delete click of a card
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (

    <li className="card__group">
      <img className="card__image" src={props.src} alt={props.alt} onClick={props.onCardClick} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <h2 className="card__title">{props.name}</h2>
      <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
      <h5 className="card__like-count">{props.likes.length}</h5>
    </li>

  )

}

export default Card;
