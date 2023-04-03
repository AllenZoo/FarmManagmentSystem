import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import NavBar from '@components/NavBar';

import {
  DASHBOARD_PATHNAME,
  FARMER_ACTIONS_PATHNAME,
} from '@config/routes';

import TendFieldsPanel from './TendFieldsPanel';
import NurtureAnimalsPanel from './NurtureAnimalsPanel';
import SellProductsPanel from './SellProductsPanel';
import ManageFacilitiesPanel from './ManageFacilitiesPanel';


/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */
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
    <div>
      <NavBar />
      
      { location.hash ? panel : <Navigate to={DASHBOARD_PATHNAME} />}
    </div>
  );
}

export default FarmerActions;
