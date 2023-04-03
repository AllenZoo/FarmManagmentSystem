import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import NavBar from '@components/NavBar';

import {
  DASHBOARD_PATHNAME,
  COMPANY_FUN_FACTS_PATHNAME,
} from '@config/routes';


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
    <div>
      <NavBar />
      
      { location.hash ? panel : <Navigate to={DASHBOARD_PATHNAME} />}
    </div>
  );
}

export default CompanyFunFacts;
