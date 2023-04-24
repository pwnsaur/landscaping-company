import type { AppProps } from 'next/app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
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
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
      >
        <ThemeProvider theme={{ ...theme, isMobile }}>
          <Layout>
            <GlobalStyles />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    </ErrorBoundary>
  );
}
