import { createContext, ReactNode, useState } from 'react';
import styled from "styled-components";


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

/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */
const StyledModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 100;

  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
    padding: 1.5rem;
    border: none;
    background: none;
    border-radius: 0 0 0 1rem;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      color: #f22;
      transition: 0.2s ease;
    }
  }

  .Info {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 75%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1rem;
    gap: 0.5rem;

    button {
      position: relative;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);

      &:hover {
        color: #fff;
        transition: 0.2s ease;
      }
    }
  }
`;

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
        <StyledModal>
          <button onClick={() => clearModal()} title="Close">X</button>

          <div className="Info">
            {modal}
          </div>
        </StyledModal>
      )}

      {children}
    </ModalContext.Provider>
  );
};
