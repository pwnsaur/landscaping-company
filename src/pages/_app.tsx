import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import GlobalStyles from '@/styles/globalStyles';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </ParallaxProvider>
  );
}
