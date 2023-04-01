import { To } from 'react-router-dom';
import styled from 'styled-components';
import { GiBarn, GiFarmer, GiPerson, GiBroccoli } from 'react-icons/gi';

import * as ROUTES from '@config/routes';

import NavBar from '@components/NavBar';
import { Link } from 'react-router-dom';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledMainPage = styled.div`
  color: #fff;
  text-align: center;

  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
    gap: 0.5rem;
    height: 100%;
    margin: 0 4rem;
    padding: 2rem;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  min-height: 20vh;
  border: 1px solid #fff;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.1);
  transition: 0.2s ease;

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
  }
`;

const StyledButton = styled.button`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;

  padding: 0.5rem 1rem;
  min-width: 20rem;
  border: 2px solid #fff;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    transition: 0.2s ease;
  }
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
// Farmer Actions Buttons
const FARMER_ACTIONS_BUTTONS : {link: To, text: String}[] = [
  {
    link: `${ROUTES.FARMER_ACTIONS_PATHNAME}#tend-fields`,
    text: "Tend Fields"
  },
  {
    link: `${ROUTES.FARMER_ACTIONS_PATHNAME}#nurture-animals`,
    text: "Nurture Animals"
  },
  {
    link: `${ROUTES.FARMER_ACTIONS_PATHNAME}#sell-products`,
    text: "Sell Products"
  },
  {
    link: `${ROUTES.FARMER_ACTIONS_PATHNAME}#manage-facilities`,
    text: "Manage Facilities"
  }
];

// User Info Buttons
const USER_INFO_BUTTONS : {link: To, text: String}[] = [
  {
    link: `${ROUTES.USER_INFO_PATHNAME}#profile`,
    text: "View Profile"
  },
  {
    link: `${ROUTES.USER_INFO_PATHNAME}#inventory`,
    text: "View Inventory"
  }
];

// Company Fun Facts Buttons
const COMPANY_FUN_FACTS_BUTTONS : {link: To, text: String}[] = [
  {
    link: `${ROUTES.COMPANY_FUN_FACTS_PATHNAME}#company-info`,
    text: "View Company Info"
  }
];

// Housing Buttons
const HOUSING_BUTTONS : {link: To, text: String}[] = [
  {
    link: `${ROUTES.HOUSING_PATHNAME}#housing`,
    text: "View Housing"
  },
  {
    link: `${ROUTES.HOUSING_PATHNAME}#manage-housing`,
    text: "Manage Housing"
  }
];


const MainPage = () => {
  return (
    <StyledMainPage data-testid="main-page">
      <NavBar />

      <main>
        <StyledSection>
          <h1><GiFarmer size="2rem" /> Farmer Actions</h1>

          {FARMER_ACTIONS_BUTTONS.map((button, index) => (
            <Link to={button.link} key={index}>
              <StyledButton>{button.text}</StyledButton>
            </Link>
          ))}
        </StyledSection>

        <StyledSection>
          <h1><GiPerson /> User Info</h1>

          {USER_INFO_BUTTONS.map((button, index) => (
            <Link to={button.link} key={index}>
              <StyledButton>{button.text}</StyledButton>
            </Link>
          ))}
        </StyledSection>
        
        <StyledSection>
          <h1><GiBroccoli /> Company Fun Facts</h1>
          
          {COMPANY_FUN_FACTS_BUTTONS.map((button, index) => (
            <Link to={button.link} key={index}>
              <StyledButton>{button.text}</StyledButton>
            </Link>
          ))}
        </StyledSection>
        
        <StyledSection>
          <h1><GiBarn /> Housing</h1>
          
          {HOUSING_BUTTONS.map((button, index) => (
            <Link to={button.link} key={index}>
              <StyledButton>{button.text}</StyledButton>
            </Link>
          ))}
        </StyledSection>
      </main>
    </StyledMainPage>
  );
}

export default MainPage;
