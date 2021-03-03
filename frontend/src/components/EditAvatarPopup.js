import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
      avatarRef.current.value
    )
  }

  return (

    <PopupWithForm name="add-image" title="Change profile picture" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} id="popup-url" type="url" className="popup__input" placeholder="Image link"
        name="Image Link" required />
    </PopupWithForm>

  )
}

export default EditAvatarPopup;
