import { createContext, ReactNode, useState } from 'react';

import styles from './modalContext.module.scss';


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Modal context
 */
const ModalContext = createContext<{
  modal: ReactNode,
  setModal: any,
  clearModal: any,
}>({
  modal: null,
  setModal: () => {},
  clearModal: () => {},
});

export default ModalContext;


/**
 * Context Provider for modal
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode>(null);

  /**
   * Clears all states to their original values
   */
  const clearModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{
      modal,
      setModal,
      clearModal,
    }}>
      { (modal !== null) && (
        <div className={styles.Modal}>
          <button onClick={() => clearModal()} title="Close">X</button>

          <div className={styles.Info}>
            {modal}
          </div>
        </div>
      )}

      {children}
    </ModalContext.Provider>
  );
};
