import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import NavBar from "@components/NavBar";

import { DASHBOARD_PATHNAME, USER_INFO_PATHNAME } from "@config/routes";

import ViewProfilePanel from './ViewProfilePanel';
import ViewInventoryPanel from "./ViewUserInventoryPanel";


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const UserInfo = () => {
  const [panel, setPanel] = useState<React.ReactElement | null>(null);
  const location = useLocation();

  // Sets the panel to be rendered based on the hash in the URL
  useEffect(() => {
    const { pathname, hash } = location;

    if (pathname === USER_INFO_PATHNAME) {
      switch (hash) {
        case "#profile":
          setPanel(<ViewProfilePanel />);
          break;
        case "#inventory":
          setPanel(<ViewInventoryPanel />);
          break;
        default:
          setPanel(null);
          break;
      }
    }
  }, [location]);

  return (
    <div>
      <NavBar />

      {location.hash ? panel : <Navigate to={DASHBOARD_PATHNAME} />}
    </div>
  );
};

export default UserInfo;
