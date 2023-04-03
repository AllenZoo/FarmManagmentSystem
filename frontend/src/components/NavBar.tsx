import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GiFarmTractor } from 'react-icons/gi';

import UserContext from '@contexts/userContext';

import styles from './NavBar.module.scss';


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
function NavBar() {
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('user-fms');
      window.alert("Logged out successfully!");
      userContext.setUser('');
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className={styles.NavBar}>
      <button
        className={styles.DashboardButton}
        type="button"
        title="Dashboard"
      >
        <Link to="/dashboard">
          <GiFarmTractor />
        </Link>
      </button>

      <h1>Totalitarian Farming System&trade;</h1>

      <button
        className={styles.NavButton}
        type="button"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default NavBar;
