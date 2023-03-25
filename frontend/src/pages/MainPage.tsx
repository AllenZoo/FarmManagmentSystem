import styled from 'styled-components';

import NavBar from '@/components/NavBar';


/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledMainPage = styled.div`
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
    justify-content: center;
    width: 50%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.25);
  }

  .DisplayPanel {
    display: flex;
    justify-content: center;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.25);
  }
`;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
const MainPage = () => {
  return (
    <StyledMainPage>
      <NavBar />

      <main>
        {/* CONTROL PANEL */}
        <div className="ControlPanel">
          <h2>Control Panel</h2>
        </div>

        {/* DISPLAY PANEL */}
        <div className="DisplayPanel">
          <h2>Display Panel</h2>

        </div>
      </main>
    </StyledMainPage>
  );
}

export default MainPage;
