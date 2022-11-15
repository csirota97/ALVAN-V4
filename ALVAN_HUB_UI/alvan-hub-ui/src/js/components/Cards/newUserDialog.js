import React, { useEffect, useState } from "react";
import serviceFactory from "../../utils/service-factory";

const NewUserDialog = (props) => {
  const {userInfo, setUserInfo, validationTrigger, onSubmit} = props;
  
  const [initialRender, setInitialRender] = useState(true);
  const [results, setResults] = useState({then: () => {}});

  const validateFirstName = (name) => (name || '').length >= 1;
  const validateLastName = (name) => (name || '').length >= 1;
  const validateEmail = (email) => (email || '').length >= 5 && email.includes('@');
  const validatePassword = (password) => (password || '').length >= 4 && !password.includes(' ');
  const validateConfirmPassword = (confirm) => (confirm || '') === userInfo.password;

  useEffect(() => {
    if (results.result !== 'already exists' && results.result?.length >= 1) {
      localStorage.setItem('userToken', results.result[0][0]);
      onSubmit(results.result[0][0]);
    }
  });

  useEffect(async () => {
    if(initialRender) {
      setInitialRender(false);
    } else {
      if (
        validateFirstName(userInfo.firstName) &&
        validateLastName(userInfo.lastName) &&
        validateEmail(userInfo.email) &&
        validatePassword(userInfo.password) &&
        validateConfirmPassword(userInfo.confirmPassword)
      ) {
        setResults(await serviceFactory.createUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.password, () => {}));
      } else {
        setUserInfo({
          ...userInfo,
          validateFirstName: !validateFirstName(userInfo.firstName),
          validateLastName: !validateLastName(userInfo.lastName),
          validateEmail: !validateEmail(userInfo.email),
          validatePassword: !validatePassword(userInfo.password),
          validateConfirm: !validateConfirmPassword(userInfo.confirmPassword),
        })
      }
    }
  }, [validationTrigger])
  
  return (
    <>
      {results.result === 'already exists' ? <div className='error-text'>This user already exists</div> : <><br /></>}
      <label for="firstName">First Name</label><br/>
      <input 
        type="text" 
        id="firstName" 
        name="firstName" 
        onChange={(event) => {setUserInfo({
          ...userInfo,
          firstName: event.target.value,
          firstNameValid: validateFirstName(event.target.value)
        })}}
      />
      {userInfo.firstNameValid ? <><br /><br /></> : <div className='error-text'>This value can not be blank</div>}
      <label for="lastName">Last Name</label><br/>
      <input 
        type="text" 
        id="lastName" 
        name="lastName" 
        onChange={(event) => {setUserInfo({
          ...userInfo,
          lastName: event.target.value,
          lastNameValid: validateLastName(event.target.value)
        })}}
      />
      {userInfo.lastNameValid ? <><br /><br /></> : <div className='error-text'>This value can not be blank</div>}
      <label for="emailNew">Email</label><br/>
      <input 
        type="email" 
        id="emailNew" 
        name="emailNew" 
        onChange={(event) => {setUserInfo({
          ...userInfo,
          email: event.target.value,
          emailValid: validateEmail(event.target.value)
        })}}
      />
      {userInfo.emailValid ? <><br /><br /></> : <div className='error-text'>Please enter a valid email address</div>}
      <label for="passwordNew">Password</label><br/>
      <input 
        type="password" 
        id="passwordNew" 
        name="passwordNew" 
        onChange={(event) => {setUserInfo({
          ...userInfo,
          password: event.target.value,
          passwordValid: validatePassword(event.target.value)
        })}}
      />
      {userInfo.passwordValid ? <><br /><br /></> : <div className='error-text'>Password must be at least 4 characters long and contain no spaces</div>}
      <label for="confirmPassword">Confirm Password</label><br/>
      <input 
        type="password" 
        id="confirmPassword" 
        name="confirmPassword" 
        onChange={(event) => {setUserInfo({
          ...userInfo,
          confirmPassword: event.target.value,
          confirmPasswordValid: validateConfirmPassword(event.target.value)
        })}}
      />
      {userInfo.confirmPasswordValid ? <><br /><br /></> : <div className='error-text'>The entered value does not match the entered password</div>}
    </>
  );
}

export default NewUserDialog;