import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

const theme = {
  logo: {
    width: 170,
    topBarSource: `https://cdn.shopify.com/s/files/1/2506/6936/files/spacetagram-logo.svg?v=1642392487`,
    url: '/',
    accessibilityLabel: 'The Shoppies',
  },
};
ReactDOM.render(
  <React.StrictMode>
    <AppProvider theme={theme} i18n={enTranslations}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

