import styled from "styled-components";

import MainPage from "./pages/MainPage";

import BackgroundImg from "./assets/background.png";


const Background = styled.div`
  position: absolute;
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

function App() {
  return (
    <div className="App">
      <Background>
        <img src={BackgroundImg} alt="" />
      </Background>
      
      <MainPage />
    </div>
  );
}

export default App;
