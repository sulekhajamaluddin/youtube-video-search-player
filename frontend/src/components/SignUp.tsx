import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validSignUp, setValidSignUp] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  // Function to check if the email is of valid format

  const validateEmail = (email: string) => {
    let valid;
    const pattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    pattern.test(email) ? setValidEmail(true) : setValidEmail(false);
    pattern.test(email) ? (valid = 'true') : (valid = 'false');
    return valid;
  };

  // Function that handles the sign up

  const handleSignUpSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const valid = validateEmail(emailReg);
    if (emailReg === '' || passwordReg === '') {
      setValidSignUp(false);
    } else if (emailReg !== '' && passwordReg !== '' && valid === 'true') {
      console.log('Inside');
      try {
        const user = {
          email: emailReg,
          password: passwordReg,
        };
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/home/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          }
        );
        const data = await response.json();
        console.log(data);
        data.status === 200 ? setSignUpSuccess(true) : setSignUpSuccess(false);
      } catch (error) {
        console.log(error);
        setSignUpSuccess(false);
      }
    }
  };

  // Function that redirects to Login from the Sign up page

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-signup-container">
      <h1>Sign Up</h1>
      <form>
        <div className="inputfields">
          <input
            type="text"
            placeholder="Enter Email-ID"
            id="signup-email-id"
            onChange={(e) => setEmailReg(e.target.value)}
          />
          {validEmail === true ? (
            <span></span>
          ) : (
            <span style={{ color: 'red' }}>EmailID Invalid!!!</span>
          )}
          <input
            type="password"
            placeholder="Enter Password"
            id="signup-password"
            onChange={(e) => setPasswordReg(e.target.value)}
          />
        </div>
        <button onClick={(event) => handleSignUpSubmit(event)}>SignUp</button>
      </form>
      <br />
      {validSignUp ? (
        <span></span>
      ) : (
        <span style={{ color: 'red' }}>
          Valid EmailID and Password Required!!!
        </span>
      )}
      <br />
      {signUpSuccess ? (
        <span style={{ color: 'red' }}>
          You Have Been Signed Up!! Welcome!! Login:
          <button id="login-from-signup" onClick={handleRedirectToLogin}>
            Here
          </button>
        </span>
      ) : (
        <span></span>
      )}
      <div>
        <p>
          Already a member? Login:{' '}
          <button id="login-from-signup" onClick={handleRedirectToLogin}>
            Here
          </button>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
