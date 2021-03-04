import React from 'react';
import { Link } from 'react-router-dom';
import aroundtheus from '../images/aroundtheus.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={aroundtheus} alt="Around the U.S. logo" className="header__logo" />
      <div className="header__container">
        <p className="header__user">{props.email}</p>
        <Link to={props.link} className="header__user header__user-nav"><span onClick={props.onClick}>{props.linkText}</span></Link>
      </div>
    </header>
  )
}

export default Header;
