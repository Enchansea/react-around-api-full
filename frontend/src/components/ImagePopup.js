import React from 'react';


function ImagePopup(props) {
  return (
    <div className={`popup popup__picture-section ${props.isOpen ? "popup_visible" : ""}`} onClick={props.onClose}>
      <div className="popup__content popup__content_theme_transparent">
        <button className="popup__close-button" onClick={props.onClose}></button>
        <figure>
          <img className="popup__image" src={props.link} alt={props.title} />
  <figcaption className="popup__caption">{props.title}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
