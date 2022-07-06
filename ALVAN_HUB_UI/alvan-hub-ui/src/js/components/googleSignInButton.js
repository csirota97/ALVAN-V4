import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import getConstants from '../utils/constants';

const GoogleSignInButton = (props) => {
  const { googleUser, setGoogleUser } = props;
  const CONSTANTS = getConstants();

  console.log(googleUser);
  const googleLogout = (
    <GoogleLogout
      clientId={CONSTANTS.CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={(res) => {setSignIn(googleLogin); console.log(res);}}
    />
  );
  const googleLogin = (
    <GoogleLogin
      clientId={CONSTANTS.CLIENT_ID}
      buttonText="Login"
      onSuccess={(res) => {setSignIn(googleLogout); setGoogleUser(res); console.log(res);}}
      onFailure={(res) => {console.log("failed"); console.log(res);}}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
    />
  );

  const [signIn, setSignIn] = useState(googleUser ? googleLogout : googleLogin);


  return (
    <div className='google-sign-in-button' onClick={() => {console.log("sign in")}}>
      {signIn}
    </div>
  );
}

export default GoogleSignInButton;