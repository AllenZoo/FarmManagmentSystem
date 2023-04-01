import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GiFarmTractor } from 'react-icons/gi';
import styled from 'styled-components';

import UserContext from '@contexts/userContext';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(0, transparent 0%, rgba(100, 200, 255, 0.1) 100%);
  backdrop-filter: blur(5px);
  gap: 0.5rem;
  padding: 0 2rem;
  color: #fff;
  z-index: 100;

  h1 {
    font-size: 2rem;
    margin: 1rem 0.5rem;
  }
`;

const StyledDashboardButton = styled.button`
  font-size: 3rem;
  text-align: center;
  
  border: transparent;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    scale: 1.1;
    transition: 0.4s ease;
  }
`;

const StyledNavButton = styled.button`
  color: #fff;
  font-size: 1rem;
  text-align: center;

  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.1);
    border: 2px solid #f55;
    backdrop-filter: blur(2px);
    transition: 0.4s ease;
  }
`;


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
    <StyledNavBar>
      <StyledDashboardButton type="button" title="Dashboard">
        <Link to="/dashboard">
          <GiFarmTractor />
        </Link>
      </StyledDashboardButton>
      <h1>Totalitarian Farming System&trade;</h1>
      <StyledNavButton
        type="button"
        onClick={handleLogout}
      >
        Log out
      </StyledNavButton>
    </StyledNavBar>
  );
}

export default NavBar;
