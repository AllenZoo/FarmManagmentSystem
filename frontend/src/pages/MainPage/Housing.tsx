import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '@components/NavBar';

import { HOUSING_PATHNAME } from '@src/config/routes';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledHousing = styled.div`
  
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Housing' panel of Housing
 */
const ViewHousingPanel = () => {
  return (
    <>
      View Housing
    </>
  );
};

/**
 * Renders the 'Manage Housing' panel of Housing
 */
const ManageHousingPanel = () => {
  return (
    <>
      Manage Housing
    </>
  );
};

/**
 * Renders the default panel of Housing
 */
const DefaultPanel = () => {
  return (
    <>
      Default Panel
    </>
  );
};


const Housing = () => {
  const [panel, setPanel] = useState<React.ReactElement | null>(null);
  const location = useLocation();
  
  // Sets the panel to be rendered based on the hash in the URL
  useEffect(() => {
    const { pathname, hash } = location;
    
    if (pathname === HOUSING_PATHNAME) {
      switch (hash) {
        case '#housing':
          setPanel(<ViewHousingPanel />);
          break;
        case '#manage-housing':
          setPanel(<ManageHousingPanel />);
          break;
        default:
          setPanel(null);
          break;
      };
    };
  }, [location]);

  return (
    <StyledHousing>
      <NavBar />
      
      <main>
        { panel ? panel : <DefaultPanel />}
      </main>
    </StyledHousing>
  );
}

export default Housing;
