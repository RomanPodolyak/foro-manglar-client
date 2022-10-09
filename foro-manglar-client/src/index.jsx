import React from 'react';
import ReactDOM from 'react-dom/client';
import { adaptV4Theme } from '@mui/material/styles';
import { createMuiTheme, ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

//testing 
const theme2 = createTheme({
  palette: {
    primary: {
      main: "#338645",
    },
    secondary: {
      main: "#ffa726",
    },
    type: "dark",
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme2}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //TODO measure performance
