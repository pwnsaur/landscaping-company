import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import Layout from '@components/Layout';
import SplashScreen from '@components/SplashScreen';
import GlobalStyles from '@styles/globalStyles';
import { theme } from '@styles/theme';
import ErrorBoundary from '@utils/ErrorBoundary';
import useIsMobile from '@utils/hooks/useIsMobile';
import { useSplashScreen } from '@utils/hooks/useSplashScreen';

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useIsMobile();
  const loading = useSplashScreen();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ ...theme, isMobile }}>
        {loading && <SplashScreen />}
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
