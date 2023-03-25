import React, { useEffect, useState } from 'react';
import serviceFactory from '../../utils/service-factory';

function LogInDialog(props) {
  const {
    userInfo, setUserInfo, validationTrigger, onSubmit,
  } = props;

  const [initialRender, setInitialRender] = useState(true);
  const [results, setResults] = useState({ then: () => {} });

  const validateEmail = (email) => (email || '').length >= 5 && email.includes('@');
  const validatePassword = (password) => (password || '').length >= 4 && !password.includes(' ');

  useEffect(() => {
    if (results.result !== 'Incorrect Email or Password' && results.result?.length === 1) {
      localStorage.setItem('userToken', results.result[0]);
      onSubmit(results.result[0]);
    }
  });

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else if (
      validateEmail(userInfo.email)
        && validatePassword(userInfo.password)
    ) {
      Promise.resolve(serviceFactory.findUser(userInfo.email, userInfo.password, () => {})).then(
        response => setResults(response),
      );
    } else {
      setUserInfo({
        ...userInfo,
        validateEmail: !validateEmail(userInfo.email),
        validatePassword: !validatePassword(userInfo.password),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationTrigger]);

  return (
    <>
      {
        results.result === 'Incorrect Email or Password'
          ? <div className="error-text">Incorrect Email or Password</div>
          : <br />
      }
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        id="email"
        name="email"
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
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        id="password"
        name="password"
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
    </>
  );
}

export default LogInDialog;
