import type { Metadata } from 'next';
import '@fontsource-variable/nunito';

import AppShell from '@/components/AppShell';
import Providers from '@/components/Providers';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Brasika',
    template: 'Brasika | %s',
  },
  description: 'Brasika — ainavu darbu uzņēmums. Projektēšana, ierīkošana un kopšana.',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='lv'>
      <head>
        <link
          rel='preconnect'
          href='https://images.ctfassets.net'
          crossOrigin='anonymous'
        />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
