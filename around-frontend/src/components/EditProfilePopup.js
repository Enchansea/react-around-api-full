import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(
      name,
      description
    );
  }

    return (
        <PopupWithForm name="edit-profile" title="Edit Profile" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <Input id="profile-name" type="text" className="profile-name" name="name" handleChange={handleNameChange} defaultValue={currentUser.name} />
            <Input id="profile-text" type="text" className="profile-about" name="about" handleChange={handleDescriptionChange} defaultValue={currentUser.about} />
        </PopupWithForm>
    )
}

export default EditProfilePopup;
