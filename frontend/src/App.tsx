import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import ErrorPage from '@pages/ErrorPage';

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

const StyledContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const App = () => {
  return (
    <StyledContainer data-testid="app">
      <StyledBackground className="Background">
        <img src={BackgroundImg} alt="" />
      </StyledBackground>

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </StyledContainer>
  );
}

export default App;
