import React, { useState } from 'react';
import Input from './Input';
import PopupWithForm from './PopupWithForm';

function AddCardPopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleCardName(e) {
    setName(e.target.value);
  }

  function handleLinkName(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAddCard(
      name,
      link
    );
  }

  return (
    <PopupWithForm name="add-card" title="New Place" buttonText="Create" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <Input id="popup-title" type="text" className="card-name" name="name" placeholder="Title" handleChange={handleCardName} defaultValue="" />
      <Input id="popup-url" type="url" className="card-url" name="link" placeholder="Image link" handleChange={handleLinkName} defaultValue="" />
    </PopupWithForm>
  )
}
export default AddCardPopup;
