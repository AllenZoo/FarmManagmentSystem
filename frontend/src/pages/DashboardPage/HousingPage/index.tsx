import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import NavBar from '@components/NavBar';

import {
  DASHBOARD_PATHNAME,
  HOUSING_PATHNAME,
} from '@config/routes';


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
    <div>
      <NavBar />
      
      { location.hash ? panel : <Navigate to={DASHBOARD_PATHNAME} />}
    </div>
  );
}

export default Housing;
