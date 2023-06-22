import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import LoadingScreen from '@/components/LoadingScreen';
import { getInitialPropsUtil } from '@/utils/getInitialPropsUtil';
import { useLoading } from '@/utils/hooks/useLoading';
import Layout from '@components/Layout';
import GlobalStyles from '@styles/globalStyles';
import { theme } from '@styles/theme';
import ErrorBoundary from '@utils/ErrorBoundary';

function App({
  Component,
  pageProps,
  isMobile,
}: AppProps & AppInitialProps & { isMobile: boolean }) {
  const loading = useLoading();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={{ ...theme, isMobile }}>
        {loading && <LoadingScreen />}
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

App.getInitialProps = getInitialPropsUtil;

export default App;
