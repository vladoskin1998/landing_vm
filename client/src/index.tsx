import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/i18n'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nextProvider>

  </React.StrictMode>
);


