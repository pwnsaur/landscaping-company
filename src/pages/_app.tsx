import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import GlobalStyles from '@/styles/globalStyles';
import ErrorBoundary from '@/utils/ErrorBoundary';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import useIsMobile from '@/utils/hooks/useIsMobile';

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
