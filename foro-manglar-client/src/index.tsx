import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline} from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material/styles';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Main theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#338645'
    },
    secondary: {
      main: '#ffa726'
    },
    mode: 'dark'
  }
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //TODO measure performance
