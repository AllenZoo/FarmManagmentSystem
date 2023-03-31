import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

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

import BackgroundImg from '@assets/background.png';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: #579E9A;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.25;
  }
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const App = () => {
  return (
    <div data-testid="app">
      <UserProvider>
        <BackgroundProvider>
          <StyledBackground className="Background">
            <img src={BackgroundImg} alt="" />
          </StyledBackground>

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
