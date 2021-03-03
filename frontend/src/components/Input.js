import React from 'react';

function Input(props) {
  return(
  <>
    <input required minLength="2" id={props.name}
      type={props.type}
      className={`popup__input popup__input_${props.name}`}
      name={props.name}
      placeholder={props.name}
      onChange={props.handleChange}
      defaultValue={props.defaultValue}
    />
    <span
      id={`${props.name}-error`}
      className={"popup__error"}
    />

  </>)
}

export default Input;
