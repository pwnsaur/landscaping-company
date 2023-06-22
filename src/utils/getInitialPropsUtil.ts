import { AppContext, AppInitialProps } from 'next/app';

import { isMobileUserAgent } from './userAgent';

export async function getInitialPropsUtil(
  appContext: AppContext
): Promise<AppInitialProps & { isMobile: boolean }> {
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const userAgent = appContext.ctx.req?.headers['user-agent'] || 'rekt';
  const isMobile = isMobileUserAgent(userAgent);

  return { pageProps, isMobile };
}
