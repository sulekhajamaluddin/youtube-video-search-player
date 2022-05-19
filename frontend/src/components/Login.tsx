import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../helper/Context';

const Login = () => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const { setLoggedIn } = useContext(LoginContext);
  const [validLogin, setValidLogin] = useState(true);

  const navigate = useNavigate();

  // Set token and loggedIn 'true' in session storage

  const setSessionStorage = (token: string, loggedIn: string) => {
    sessionStorage.setItem('authentication', JSON.stringify(token));
    sessionStorage.setItem('loggedIn', loggedIn);
  };

  // Add current user to the database

  const setCurrentUser = async (userId: string, token: string) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/currentuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for Login

  const handleLoginSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      if (emailLogin !== '' && passwordLogin !== '') {
        const loginUser = {
          email: emailLogin,
          password: passwordLogin,
        };
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/home/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser),
          }
        );
        const responseData = await response.json();
        console.log(responseData.message);
        setCurrentUser(responseData.userID, responseData.authToken);
        responseData.authenticated === 'true'
          ? setLoggedIn(true)
          : setLoggedIn(false);
        setSessionStorage(responseData.authToken, 'true');
        navigate('/videoplayer');
      } else {
        setValidLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-signup">
      <h1>Login</h1>
      <form>
        <div className="inputfields">
          <input
            type="text"
            placeholder="Enter Email-ID"
            id="email-id"
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
        </div>
        <button onClick={(event) => handleLoginSubmit(event)}>Login</button>
      </form>
      <br />
      {validLogin ? (
        <span></span>
      ) : (
        <span style={{ color: 'red', marginLeft: 100 }}>Invalid Login!!!</span>
      )}
    </div>
  );
};
export default Login;
