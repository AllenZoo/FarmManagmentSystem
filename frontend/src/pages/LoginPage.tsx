import { useState } from 'react';
import styled from 'styled-components';
import { GiWheat } from 'react-icons/gi';

import {
  login,
  TOTALLY_SECRET_USERNAME,
  TOTALLY_SECRET_PASSWORD
} from '@src/controllers/loginController';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: #fff;
  text-align: center;

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
  height: 100vh;
  width: 100vw;
  gap: 2rem;
  margin-top: 2rem;

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
    width: 25vw;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 5px;
    outline: none;
    color: #fff;
    font-size: 1.5rem;
    transition: 0.4s ease;

    &:focus {
      border: 2px solid #ff0;
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
      outline: 2px solid transparent;
      background: #fff;
      color: #000;
      transition: 0.4s ease;
    }
  }
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const LoginPage = () => {
  const [username, setUsername] = useState(TOTALLY_SECRET_USERNAME);
  const [password, setPassword] = useState(TOTALLY_SECRET_PASSWORD);

  const handleLogin = async () => {
    const response = await login(username, password);
    console.log(response);
  };

  return (
    <StyledLoginPage>
      <h1>Totalitarian Farming System&trade; Login</h1>
      <h3>The best way to control and manage your farm!</h3>
      <GiWheat size="60vh" color="#ff0" />

      <StyledLoginForm>
        <div>
          <label htmlFor="user">Username</label>
          <input
            type="text"
            id="user"
            name="user"
            defaultValue={TOTALLY_SECRET_USERNAME}
            onChange={(e) => { setUsername(e.target.value); }}
          />
        </div>

        <div>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            defaultValue={TOTALLY_SECRET_PASSWORD}
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