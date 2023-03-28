import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import useIsMobile from '@utils/hooks/useIsMobile';
import Layout from '@components/Layout';
import ErrorBoundary from '@utils/ErrorBoundary';
import GlobalStyles from '@styles/globalStyles';
import { theme } from '@styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useIsMobile();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ ...theme, isMobile }}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
