import React from 'react';
import logo from '../../resources/images/ALVAN_LOGO_SMALL.png';
import logo2 from '../../resources/images/ALVAN_LOGO_SMALL_BLACK.png';

function Logo(props) {
  const { toggleMenuCard } = props;

  return (
    <div onClick={toggleMenuCard}>
      <img className="logo" alt="logo" src={logo} />
      <img className="logo-back" alt="logo back" src={logo2} />
    </div>
  );
}

export default Logo;
