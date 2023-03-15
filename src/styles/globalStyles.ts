import { createGlobalStyle } from 'styled-components';
import { Nunito } from 'next/font/google';

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

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyles;
