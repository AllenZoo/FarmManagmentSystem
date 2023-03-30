import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '@components/NavBar';

import { FARMER_ACTIONS_PATHNAME } from '@src/config/routes';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledFarmerActions = styled.div`
  
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'Tend Fields' panel of Farmer Actions
 */
const TendFieldsPanel = () => {
  return (
    <>
      Tend Fields
    </>
  );
};

/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  return (
    <>
      Nurture Animals
    </>
  );
};

/**
 * Renders the 'Sell Products' panel of Farmer Actions
 */
const SellProductsPanel = () => {
  return (
    <>
      Sell Products
    </>
  );
};

/**
 * Renders the 'Manage Facilities' panel of Farmer Actions
 */
const ManageFacilitiesPanel = () => {
  return (
    <>
      Manage Facilities
    </>
  );
};

/**
 * Renders the default panel of Farmer Actions
 */
const DefaultPanel = () => {
  return (
    <>
      Default Panel
    </>
  );
};


const FarmerActions = () => {
  const [panel, setPanel] = useState<React.ReactElement | null>(null);
  const location = useLocation();
  
  // Sets the panel to be rendered based on the hash in the URL
  useEffect(() => {
    const { pathname, hash } = location;
    
    if (pathname === FARMER_ACTIONS_PATHNAME) {
      switch (hash) {
        case '#tend-fields':
          setPanel(<TendFieldsPanel />);
          break;
        case '#nurture-animals':
          setPanel(<NurtureAnimalsPanel />);
          break;
        case '#sell-products':
          setPanel(<SellProductsPanel />);
          break;
        case '#manage-facilities':
          setPanel(<ManageFacilitiesPanel />);
          break;
        default:
          setPanel(null);
          break;
      };
    };
  }, [location]);

  return (
    <StyledFarmerActions>
      <NavBar />
      
      <main>
        { panel ? panel : <DefaultPanel />}
      </main>
    </StyledFarmerActions>
  );
}

export default FarmerActions;
