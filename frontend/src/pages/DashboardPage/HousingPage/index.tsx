import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import NavBar from '@components/NavBar';

import {
  DASHBOARD_PATHNAME,
  HOUSING_PATHNAME,
} from '@config/routes';

import ViewHousingPanel from './ViewHousingPanel';
import ManageHousingPanel from './ManageHousingPanel';


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
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
