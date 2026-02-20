import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ThemeProvider } from 'styled-components';

import AppShell from '@/components/AppShell';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import GlobalStyles from '@/styles/globalStyles';
import { theme } from '@/styles/theme';
import { isMobileUserAgent } from '@/utils/userAgent';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Brasika',
    template: 'Brasika | %s',
  },
  description: 'Brasika',
};

const RootLayout = ({ children }: Props) => {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = isMobileUserAgent(userAgent);

  return (
    <html lang='lv'>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={{ ...theme, isMobile }}>
            <GlobalStyles />
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
