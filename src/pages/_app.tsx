import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import GlobalStyles from '@/styles/globalStyles';
import ErrorBoundary from '@/utils/ErrorBoundary';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ErrorBoundary>
          <GlobalStyles />
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  );
}
