import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../helper/Context';

const Logout = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  // Remove the user from the current users in the DB on Logout

  const removeCurrentUser = async () => {
    try {
      const value = sessionStorage.getItem('authentication');
      if (value) {
        const token = JSON.parse(value);
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/currentuser`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: token },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logic for Logout

  const logoutHandler = () => {
    removeCurrentUser();
    setLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="logout">
      <button onClick={logoutHandler} className="logout-btn">
        Logout
      </button>
    </div>
  );
};
export default Logout;
