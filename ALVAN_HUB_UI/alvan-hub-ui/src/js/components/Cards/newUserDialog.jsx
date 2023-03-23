import React, { useEffect, useState } from 'react';
import serviceFactory from '../../utils/service-factory';

function NewUserDialog(props) {
  const {
    userInfo, setUserInfo, validationTrigger, onSubmit,
  } = props;

  const [initialRender, setInitialRender] = useState(true);
  const [results, setResults] = useState({ then: () => {} });

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

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else if (
      validateFirstName(userInfo.firstName)
        && validateLastName(userInfo.lastName)
        && validateEmail(userInfo.email)
        && validatePassword(userInfo.password)
        && validateConfirmPassword(userInfo.confirmPassword)
    ) {
      Promise.resolve(serviceFactory.createUser(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        userInfo.password,
        () => {},
      )).then(response => setResults(response));
    } else {
      setUserInfo({
        ...userInfo,
        validateFirstName: !validateFirstName(userInfo.firstName),
        validateLastName: !validateLastName(userInfo.lastName),
        validateEmail: !validateEmail(userInfo.email),
        validatePassword: !validatePassword(userInfo.password),
        validateConfirm: !validateConfirmPassword(userInfo.confirmPassword),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRender, setUserInfo, userInfo, validationTrigger]);

  return (
    <>
      {results.result === 'already exists' ? <div className="error-text">This user already exists</div> : <br />}
      <label htmlFor="firstName">First Name</label>
      <br />
      <input
        type="text"
        id="firstName"
        name="firstName"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            firstName: event.target.value,
            firstNameValid: validateFirstName(event.target.value),
          });
        }}
      />
      {userInfo.firstNameValid ? (
        <>
          <br />
          <br />
        </>
      ) : <div className="error-text">This value can not be blank</div>}
      <label htmlFor="lastName">Last Name</label>
      <br />
      <input
        type="text"
        id="lastName"
        name="lastName"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            lastName: event.target.value,
            lastNameValid: validateLastName(event.target.value),
          });
        }}
      />
      {userInfo.lastNameValid ? (
        <>
          <br />
          <br />
        </>
      ) : <div className="error-text">This value can not be blank</div>}
      <label htmlFor="emailNew">Email</label>
      <br />
      <input
        type="email"
        id="emailNew"
        name="emailNew"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            email: event.target.value,
            emailValid: validateEmail(event.target.value),
          });
        }}
      />
      {userInfo.emailValid ? (
        <>
          <br />
          <br />
        </>
      ) : <div className="error-text">Please enter a valid email address</div>}
      <label htmlFor="passwordNew">Password</label>
      <br />
      <input
        type="password"
        id="passwordNew"
        name="passwordNew"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            password: event.target.value,
            passwordValid: validatePassword(event.target.value),
          });
        }}
      />
      {userInfo.passwordValid ? (
        <>
          <br />
          <br />
        </>
      ) : <div className="error-text">Password must be at least 4 characters long and contain no spaces</div>}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <br />
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            confirmPassword: event.target.value,
            confirmPasswordValid: validateConfirmPassword(event.target.value),
          });
        }}
      />
      {userInfo.confirmPasswordValid ? (
        <>
          <br />
          <br />
        </>
      ) : <div className="error-text">The entered value does not match the entered password</div>}
    </>
  );
}

export default NewUserDialog;
