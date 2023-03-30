import styled from 'styled-components';
import { GiBarn, GiFarmer, GiPerson, GiBroccoli } from 'react-icons/gi';

import NavBar from '@components/NavBar';


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
const MainPage = () => {

  const handleTendFields = () => {
    console.log('Tend Fields');
  };

  const handleNurtureAnimals = () => {
    console.log('Nurture Animals');
  };

  const handleSellProducts = () => {
    console.log('Sell Products');
  };

  const handleManageFacilities = () => {
    console.log('Manage Facilities');
  };


  return (
    <StyledMainPage>
      <NavBar />

      <main>
        <StyledSection>
          <h1><GiFarmer size="2rem" /> Farmer Actions</h1>

          <StyledButton
            onClick={handleTendFields}
          >
            Tend Fields
          </StyledButton>

          <StyledButton
            onClick={handleNurtureAnimals}
          >
            Nurture Animals
          </StyledButton>

          <StyledButton
            onClick={handleSellProducts}
          >
            Sell Products
          </StyledButton>

          <StyledButton
            onClick={handleManageFacilities}
          >
            Manage Facilities
          </StyledButton>
        </StyledSection>

        <StyledSection>
          <h1><GiPerson /> User Info</h1>

          <StyledButton>
            View Profile
          </StyledButton>

          <StyledButton>
            View Inventory
          </StyledButton>
        </StyledSection>
        
        <StyledSection>
          <h1><GiBroccoli /> Company Fun Facts</h1>

          <StyledButton>
            View Company Info
          </StyledButton>
        </StyledSection>
        
        <StyledSection>
          <h1><GiBarn /> Housing</h1>

          <StyledButton>
            View Housing
          </StyledButton>

          <StyledButton>
            Manage Housing
          </StyledButton>
        </StyledSection>
      </main>
    </StyledMainPage>
  );
}

export default MainPage;
