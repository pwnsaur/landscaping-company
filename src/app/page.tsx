import type { Metadata } from 'next';

import HomePageClient from '@/app/page-client';

export const metadata: Metadata = {
  title: 'Sākums',
  description: 'Sākums',
};

const HomePage = () => {
  return <HomePageClient />;
};

export default HomePage;
