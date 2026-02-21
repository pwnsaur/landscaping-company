'use client';

import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import GlobalStyles from '@/styles/globalStyles';
import { theme } from '@/styles/theme';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
