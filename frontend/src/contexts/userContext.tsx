import { createContext, ReactNode, useState, useEffect } from 'react';

import * as ROUTES from '@src/config/routes';

/**
 * User context
 */
const UserContext = createContext<{user: String, setUser: any}>({
  user: '',
  setUser: () => {},
});

export default UserContext;

/**
 * Context Provider for user (auth)
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const userFMS = sessionStorage.getItem('user-fms');

    if (userFMS) {
      setUser(userFMS);
    } else if (!userFMS && window.location.pathname !== ROUTES.LOGIN_PATHNAME) {
      window.location.href = ROUTES.LOGIN_PATHNAME;
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
