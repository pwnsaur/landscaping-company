import { GetServerSideProps } from 'next';

import { isMobileUserAgent } from '@utils/userAgent';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req.headers['user-agent'] || 'about rekt';
  const isMobile = isMobileUserAgent(userAgent);
  return { props: { isMobile } };
};
