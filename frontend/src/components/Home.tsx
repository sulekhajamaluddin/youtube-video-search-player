import React from 'react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Navigate to SignUp Page

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-signup-container">
      <div>
        <Login />
      </div>
      <p>
        Want to Sign Up?{' '}
        <span>
          <button id="clickme" onClick={handleSignUp}>
            Click Me!!
          </button>
        </span>
      </p>
    </div>
  );
};
export default Home;
