import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/DashboardPage';
import ErrorPage from '@pages/ErrorPage';

import FarmerActions from "@pages/DashboardPage/FarmActionsPage";
import UserInfo from "@pages/DashboardPage/UserInfoPage";
import CompanyFunFacts from "@pages/DashboardPage/CompanyFunFactsPage";
import Housing from "@pages/DashboardPage/HousingPage";

import * as ROUTES from "@config/routes";


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const App = () => {
  return (
    <div data-testid="app">
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
    </div>
  );
}

export default App;
