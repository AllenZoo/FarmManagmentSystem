import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@src/App';

import { BackgroundProvider } from "@contexts/backgroundContext";
import { UserProvider } from "@contexts/userContext";
import { ModalProvider } from '@contexts/modalContext';

import '@src/index.css';

import reportWebVitals from '@src/reportWebVitals';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <BackgroundProvider>
          <App />
        </BackgroundProvider>
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
