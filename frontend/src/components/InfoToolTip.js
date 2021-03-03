import React from 'react';
import success from '../images/success.png';
import fail from '../images/fail.png';

function InfoToolTip (props) {


  return (
    <div className={`popup popup__${props.name} ${props.isOpen ? "popup_visible" : ""}`} onClick={props.onClose}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__info-icon" src={props.valid ? success : fail} alt={props.valid ? 'success' : 'fail'} />
        {props.valid ? <p className="popup__info-message">Success! You have now been registered.</p> : <p className="popup__info-message">Oops, something went wrong! Please try again</p>}
      </div>
    </div>



  )
}

export default InfoToolTip;


