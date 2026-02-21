import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: string;
      GOOGLE_RECAPTCHA_SECRET_KEY: string;
      EMAIL_SERVICE: string;
      EMAIL_ADDRESS: string;
      EMAIL_PASSWORD: string;
      EMAIL_FROM?: string;
      EMAIL_TO?: string;
      REVALIDATE_SECRET: string;
    }
  }
}

export {};
