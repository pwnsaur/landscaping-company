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

.content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyles;
