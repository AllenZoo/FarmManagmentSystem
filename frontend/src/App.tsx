import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from '@src/pages/LoginPage';
import MainPage from '@src/pages/DashboardPage';
import ErrorPage from '@src/pages/ErrorPage';

import FarmerActions from "@src/pages/DashboardPage/FarmerActions";
import UserInfo from "@src/pages/DashboardPage/UserInfo";
import CompanyFunFacts from "@src/pages/DashboardPage/CompanyFunFacts";
import Housing from "@src/pages/DashboardPage/Housing";

import * as ROUTES from "@config/routes";

import { BackgroundProvider } from "./contexts/backgroundContext";
import { UserProvider } from "./contexts/userContext";


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const App = () => {
  return (
    <div data-testid="app">
      <UserProvider>
        <BackgroundProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to={ROUTES.LOGIN_PATHNAME} />} />
              <Route path={ROUTES.LOGIN_PATHNAME} element={<LoginPage />} />
              <Route path={ROUTES.DASHBOARD_PATHNAME} element={<MainPage />} />
              <Route path={ROUTES.FARMER_ACTIONS_PATHNAME} element={<FarmerActions />} />
              <Route path={ROUTES.USER_INFO_PATHNAME} element={<UserInfo />} />
              <Route path={ROUTES.COMPANY_FUN_FACTS_PATHNAME} element={<CompanyFunFacts />} />
              <Route path={ROUTES.HOUSING_PATHNAME} element={<Housing />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </BackgroundProvider>
      </UserProvider>
    </div>
  );
}

export default App;
