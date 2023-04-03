import { useState, useEffect, useContext } from 'react';
import { GiWheat } from 'react-icons/gi';

import { login } from '@controllers/loginController';

import BackgroundContext from '@contexts/backgroundContext';

import BackgroundImg from '@assets/backgrounds/background2.png';

import styles from './index.module.scss';


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setBackground } = useContext(BackgroundContext);

  /**
   * Handles the login process
   */
  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      if (response)
        sessionStorage.setItem('user-fms', username);
      
      window.alert("Logged in successfully!");
      document.location.href = '/dashboard';
    } catch (error) {
      window.alert(`Login failed: ${(error as Error).message}`);
    }
  };

  // Redirects to dashboard if user is already logged in
  useEffect(() => {
    setBackground(BackgroundImg);
    if (sessionStorage.getItem('user-fms'))
      document.location.href = '/dashboard';
  }, []);

  return (
    <div className={styles.LoginPage}>
      <h1>Totalitarian Farming System&trade; Login</h1>
      <h3>The best way to control and manage your farm!</h3>
      <GiWheat className={styles.WheatIcon} />

      <form className={styles.LoginForm}>
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
      </form>
    </div>
  );
}

export default LoginPage;