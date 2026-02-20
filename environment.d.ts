import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      GOOGLE_RECAPTCHA_SITE_KEY: string;
      GOOGLE_RECAPTCHA_SECRET_KEY: string;
    }
  }
}

export {};
