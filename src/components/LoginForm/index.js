import React, { useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    errorMess: false,
  });
  
  const navigate = useNavigate();

  const onSubmitSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, { expires: 5 });
    navigate('/');
  };

  const submitForm = async event => {
    event.preventDefault();
    const { username, password } = state;
    const userDetails = { username, password };
    console.log(userDetails);
    
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      onSubmitSuccess(data);
    } else {
      setState(prev => ({ ...prev, errorMess: true }));
    }
  };

  const onChangeUsername = event => {
    setState(prev => ({ ...prev, username: event.target.value }));
  };

  const onChangePassword = event => {
    setState(prev => ({ ...prev, password: event.target.value }));
  };

  const renderPasswordField = () => {
    const { password } = state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={onChangePassword}
        />
      </>
    );
  };

  const renderUsernameField = () => {
    const { username } = state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    );
  };

  // Check for jwt_token before rendering the login form
  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-cointainer-lg">
      <img
        src="https://res.cloudinary.com/dtc4lwuck/image/upload/v1732869802/cfxrxlmg2tnkssrcmtzj.png"
        alt="login website logo"
      />
      <form className="form-container" onSubmit={submitForm}>
        <h1 className="form-head">login</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        {state.errorMess && (
          <p className="error-message">Password mismatch</p>
        )}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
