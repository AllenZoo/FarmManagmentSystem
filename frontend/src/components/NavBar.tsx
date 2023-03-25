import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiFarmTractor } from 'react-icons/gi';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem;
  z-index: 100;
`;

const StyledNavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem;
  z-index: 100;

  .NavLink {
    text-decoration: none;
  }
`;

const StyledNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  min-width: 6rem;
  min-height: 2rem;
  background-color: #000;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
function NavBar() {
  return (
    <>
      <StyledBanner>
        <GiFarmTractor size="2rem" />
        <h1>The Bestest Farm Management System&trade;</h1>
      </StyledBanner>

      <StyledNavBar>
          <Link to="/" className="NavLink">
            <StyledNavButton>
              Login
            </StyledNavButton>
          </Link>
      </StyledNavBar>
    </>
  );
}

export default NavBar;
