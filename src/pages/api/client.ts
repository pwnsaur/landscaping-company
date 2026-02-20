import { createClient } from 'contentful';

let cachedClient: ReturnType<typeof createClient> | null = null;

export const getContentfulClient = () => {
  if (cachedClient) return cachedClient;

  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  const missingVars = [
    !CONTENTFUL_SPACE_ID ? 'CONTENTFUL_SPACE_ID' : null,
    !CONTENTFUL_ACCESS_TOKEN ? 'CONTENTFUL_ACCESS_TOKEN' : null,
  ].filter(Boolean);

  if (missingVars.length) {
    throw new Error(
      `Missing Contentful env vars: ${missingVars.join(', ')}`
    );
  }

  cachedClient = createClient({
    space: CONTENTFUL_SPACE_ID,
    environment: 'master',
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });

  return cachedClient;
};
