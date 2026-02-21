import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.background};
  }

  body {
    min-height: 100vh;
    font-family: 'Nunito Variable', ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.title};
    line-height: 1.2;
  }

  p {
    line-height: 1.6;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.interactiveActive};
    color: ${({ theme }) => theme.colors.textStrong};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
