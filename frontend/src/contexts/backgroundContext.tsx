import { createContext, ReactNode, useState } from 'react';

import BackgroundImg from '@assets/backgrounds/background.png';

import styles from './backgroundContext.module.scss';


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Background context
 */
const BackgroundContext = createContext<{background: String, setBackground: any}>({
  background: BackgroundImg,
  setBackground: () => {},
});

export default BackgroundContext;

/**
 * Context Provider for background
 */
export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState(BackgroundImg);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      <div className={styles.Background}>
        <img src={background} alt="" />
      </div>

      {children}
    </BackgroundContext.Provider>
  );
};
