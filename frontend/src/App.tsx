import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import LoginPage from '@pages/LoginPage';
import MainPage from '@src/pages/MainPage/MainPage';
import ErrorPage from '@pages/ErrorPage';

import FarmerActions from "@pages/MainPage/FarmerActions";
import UserInfo from "@pages/MainPage/UserInfo";

import {
  DASHBOARD_PATHNAME,
  FARMER_ACTIONS_PATHNAME,
  LOGIN_PATHNAME,
  USER_INFO_PATHNAME
} from "./config/routes";

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
      <StyledBackground className="Background">
        <img src={BackgroundImg} alt="" />
      </StyledBackground>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={LOGIN_PATHNAME} />} />
          <Route path={LOGIN_PATHNAME} element={<LoginPage />} />
          <Route path={DASHBOARD_PATHNAME} element={<MainPage />} />
          <Route path={FARMER_ACTIONS_PATHNAME} element={<FarmerActions />} />
          <Route path={USER_INFO_PATHNAME} element={<UserInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
