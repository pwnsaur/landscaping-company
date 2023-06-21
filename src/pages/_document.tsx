import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { isMobileUserAgent } from '../utils/userAgent';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const userAgent = ctx.req?.headers['user-agent'] || 'get rekt';
    const isMobile = isMobileUserAgent(userAgent);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <App {...props} pageProps={{ ...props.pageProps, isMobile }} />
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
