import { createGlobalStyle } from 'styled-components';

import { theme } from '@/styles/theme';

const GlobalStyles = createGlobalStyle`
*, *:before, *:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Nunito Variable', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2 {
  color: ${theme.colors.title}
}
`;

export default GlobalStyles;
