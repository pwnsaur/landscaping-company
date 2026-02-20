import type { Metadata } from 'next';
import { headers } from 'next/headers';
import '@fontsource-variable/nunito';

import AppShell from '@/components/AppShell';
import Providers from '@/components/Providers';
import { isMobileUserAgent } from '@/utils/userAgent';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Brasika',
    template: 'Brasika | %s',
  },
  description: 'Brasika',
};

const RootLayout = async ({ children }: Props) => {
  const headerStore = await headers();
  const userAgent = headerStore.get('user-agent') || '';
  const isMobile = isMobileUserAgent(userAgent);

  return (
    <html lang='lv'>
      <body>
        <Providers isMobile={isMobile}>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
