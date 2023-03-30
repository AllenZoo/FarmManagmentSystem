import { useState } from 'react';
import styled from 'styled-components';
import { GiWheat } from 'react-icons/gi';

import { login } from '@src/controllers/loginController';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  color: #fff;
  text-align: center;

  .wheatIcon {
    font-size: 30vh;
    color: #ff0;
    margin: 1rem 0 0 0;
    animation: pulse 5s linear infinite;

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: semibold;
    margin: 1rem 0 0 0;
    padding: 1rem;
  }

  h3 {
    margin: 0 0 1rem 0;
  }
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  gap: 2rem;
  margin: 2rem 0;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-right: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  input {
    margin: 0.5rem;
    padding: 0.5rem;
    min-width: 25vw;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 5px;
    outline: none;
    color: #fff;
    font-size: 1.5rem;
    transition: 0.4s ease;

    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.1);
      transition: 0.4s ease;
    }
  }

  button {
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 10rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background: transparent;
    outline: 2px solid #fff;
    font-weight: bold;
    color: #fff;
    transition: 0.4s ease;

    &:hover {
      outline: 2px solid #5f5;
      background: rgba(0, 255, 0, 0.1);
      transition: 0.4s ease;
    }
  }
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      // TODO: Handle response; store token somewhere
      console.log(response);
      
      document.location.href = '/dashboard';
    } catch (error) {
      console.log(error);
      window.alert(`Login failed: ${(error as Error).message}`);
    }
  };

  return (
    <StyledLoginPage>
      <h1>Totalitarian Farming System&trade; Login</h1>
      <h3>The best way to control and manage your farm!</h3>
      <GiWheat className="wheatIcon" />

      <StyledLoginForm>
        <div>
          <label htmlFor="user">Username</label>
          <input
            type="text"
            id="user"
            name="user"
            defaultValue=""
            onChange={(e) => { setUsername(e.target.value); }}
          />
        </div>

        <div>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            defaultValue=""
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </StyledLoginForm>
    </StyledLoginPage>
  );
}

export default LoginPage;