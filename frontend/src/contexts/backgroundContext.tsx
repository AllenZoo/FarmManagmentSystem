import { createContext, ReactNode, useState } from 'react';
import styled from "styled-components";

import BackgroundImg from '@assets/backgrounds/background.png';


/**
 * Background context
 */
const BackgroundContext = createContext<{background: String, setBackground: any}>({
  background: BackgroundImg,
  setBackground: () => {},
});

export default BackgroundContext;

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

/**
 * Context Provider for background
 */
export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState(BackgroundImg);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      <StyledBackground className="Background">
        <img src={background} alt="" />
      </StyledBackground>

      {children}
    </BackgroundContext.Provider>
  );
};
