import React from 'react';

function PopupWithForm(props) {

  return (

    <div className={`popup popup__${props.name} ${props.isOpen ? "popup_visible" : ""}`} onClick={props.onClose}>
      <div className={`popup__content`}>
        <button type="button" className={`popup__close-button`} onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form action="#" className={`popup__form`} noValidate name={props.name} onSubmit={props.onSubmit}>
          {props.children}
  <button type="submit" className={`popup__button popup__submit-button`}>{props.buttonText} </button>
        </form>
      </div>
    </div>

  )
}

export default PopupWithForm;
