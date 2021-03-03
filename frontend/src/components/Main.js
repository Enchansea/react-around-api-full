import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__img" />
          <button className="profile__avatar-overlay" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      {/* Card */}
      <section className="elements">
        <ul className="card">
          {props.cards.map((card, index) =>
            <Card
              //passed into Card.js
              key={index}
              card={card}
              src={card.link}
              name={card.name}
              onCardClick={() => props.handleCardClick(card.link, card.name)}
              likes={card.likes}
              _id={card._id}
              owner={card.owner}
              //onDeleteClick={() => props.handleDeleteClick(card)}
              onCardDelete={(card) => props.handleCardDelete(card)}
              onCardLike={(card) => props.handleCardLike(card)}
            />

          )
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;
