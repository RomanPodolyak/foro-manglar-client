import dotenv from 'dotenv';
import { adaptV4Theme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider, StyledEngineProvider } from '@mui/core';

// Load dotenv
dotenv.config();

// Main theme
const theme = createMuiTheme(adaptV4Theme({
  palette: {
    primary: {
      main: "#338645",
    },
    secondary: {
      main: "#ffa726",
    },
    type: "dark",
  },
}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //TODO measure performance
