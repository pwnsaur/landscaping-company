import type { Metadata } from 'next';

import HomePageClient from '@/app/page-client';

export const metadata: Metadata = {
  title: 'Sākums',
  description: 'Ainavu darbu uzņēmums Brasika — projektēšana, ierīkošana un kopšana. Ilgtspējīgas ainavas, kas kalpo ilgi.',
};

const HomePage = () => {
  return <HomePageClient />;
};

export default HomePage;
