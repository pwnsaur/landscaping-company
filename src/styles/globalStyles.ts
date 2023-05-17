import { Nunito } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  fallback: ['sans-serif'],
});

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: ${nunito.style.fontFamily}, sans-serif;
}

/* html, body, #__next {
  height: 100%;
  } */

/* body {
  display: flex;
  flex-direction: column;
} */

/* #__next {
  flex: 1;
} */

a {
  color: inherit;
  text-decoration: none;
}

h1, h2 {
  color: ${({ theme }) => theme.colors.title}
}
`;

export default GlobalStyles;
