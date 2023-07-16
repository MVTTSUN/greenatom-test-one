import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './components/App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Comic Sans MS';
    font-style:  normal;
    font-weight: 400;
    src: url(./fonts/ComicSansMS.woff2) format("woff2")
        url(./fonts/ComicSansMS.woff) format("woff");
  }

  @font-face {
    font-family: 'Comic Sans MS';
    font-style:  normal;
    font-weight: 700;
    src: url(./fonts/ComicSansMS-Bold.woff2) format("woff2")
        url(./fonts/ComicSansMS-Bold.woff) format("woff");
  }

  body {
    font-family: 'Comic Sans MS', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
