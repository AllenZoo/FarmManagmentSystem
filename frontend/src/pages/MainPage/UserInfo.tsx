import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '@components/NavBar';

import { USER_INFO_PATHNAME } from '@src/config/routes';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledUserInfo = styled.div`
  
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Profile' panel of User Info
 */
const ViewProfilePanel = () => {
  return (
    <>
      View Profile
    </>
  );
};

/**
 * Renders the 'View Inventory' panel of User Info
 */
const ViewInventoryPanel = () => {
  return (
    <>
      View Inventory
    </>
  );
};


/**
 * Renders the default panel of User Info
 */
const DefaultPanel = () => {
  return (
    <>
      Default Panel
    </>
  );
};


const UserInfo = () => {
  const [panel, setPanel] = useState<React.ReactElement | null>(null);
  const location = useLocation();
  
  // Sets the panel to be rendered based on the hash in the URL
  useEffect(() => {
    const { pathname, hash } = location;
    
    if (pathname === USER_INFO_PATHNAME) {
      switch (hash) {
        case '#profile':
          setPanel(<ViewProfilePanel />);
          break;
        case '#inventory':
          setPanel(<ViewInventoryPanel />);
          break;
        default:
          setPanel(null);
          break;
      };
    };
  }, [location]);

  return (
    <StyledUserInfo>
      <NavBar />
      
      <main>
        { panel ? panel : <DefaultPanel />}
      </main>
    </StyledUserInfo>
  );
}

export default UserInfo;
