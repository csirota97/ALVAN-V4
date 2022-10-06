import React from "react";
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';

function Logo (props) {
  const {toggleMenuCard} = props;

  return (
    <div onClick={toggleMenuCard} onTouchTap={toggleMenuCard}>
      <img className='logo' alt="logo" src={logo}></img>
      <img className='logo-back' alt="logo back" src={logo2}></img>  
    </div> 
  );
}

export default Logo;