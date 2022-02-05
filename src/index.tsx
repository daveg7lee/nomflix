import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle, theme } from './theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
