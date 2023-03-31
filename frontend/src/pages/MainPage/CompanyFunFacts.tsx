import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '@components/NavBar';

import { COMPANY_FUN_FACTS_PATHNAME } from '@src/config/routes';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledCompanyFunFacts = styled.div`
  
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Company Info' panel of Company Fun Facts
 */
const ViewCompanyInfoPanel = () => {
  return (
    <>
      View Company Info
    </>
  );
};

/**
 * Renders the default panel of Company Fun Facts
 */
const DefaultPanel = () => {
  return (
    <>
      Default Panel
    </>
  );
};


const CompanyFunFacts = () => {
  const [panel, setPanel] = useState<React.ReactElement | null>(null);
  const location = useLocation();
  
  // Sets the panel to be rendered based on the hash in the URL
  useEffect(() => {
    const { pathname, hash } = location;
    
    if (pathname === COMPANY_FUN_FACTS_PATHNAME) {
      switch (hash) {
        case '#company-info':
          setPanel(<ViewCompanyInfoPanel />);
          break;
        default:
          setPanel(null);
          break;
      };
    };
  }, [location]);

  return (
    <StyledCompanyFunFacts>
      <NavBar />
      
      <main>
        { panel ? panel : <DefaultPanel />}
      </main>
    </StyledCompanyFunFacts>
  );
}

export default CompanyFunFacts;
