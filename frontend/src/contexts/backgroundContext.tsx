import { createContext, ReactNode, useState } from 'react';

/**
 * Background context
 */
const BackgroundContext = createContext<{background: String, setBackground: unknown}>({
  background: 'white',
  setBackground: () => {},
});

/**
 * Context Provider for background
 */
export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState('white');

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};
