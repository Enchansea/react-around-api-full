import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {
  console.log(props);

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card)
  }

  return (
    <PopupWithForm name="delete-confirm" title="Are you sure?" buttonText="Yes" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />
  )
}
export default DeletePopup;
