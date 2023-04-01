import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
export const StyledPanel = styled.div`
  color: #fff;
  text-align: center;

  main {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    min-height: 50vh;
    margin: 1rem 2rem;
  }

  .ControlPanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 80vh;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.1);
    overflow-x: none;
    transition: 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: 0.2s ease;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .DisplayPanel {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80vh;
    border-radius: 5px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.1);
    overflow-x: none;
    transition: 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: 0.2s ease;
    }
  }
`;

export const StyledButton = styled.button`
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
