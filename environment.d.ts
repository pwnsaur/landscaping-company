import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: string;
      GOOGLE_RECAPTCHA_SITE_KEY: string;
      GOOGLE_RECAPTCHA_SECRET_KEY: string;
      EMAIL_SERVICE: string;
      EMAIL_ADDRESS: string;
      EMAIL_PASSWORD: string;
      EMAIL_APP_PASSWORD?: string;
      EMAIL_FROM?: string;
      EMAIL_TO?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_SECURE?: string;
      SMTP_TLS?: string;
      SMTP_USER?: string;
      SMTP_USERNAME?: string;
      SMTP_PASSWORD?: string;
      SMTP_PASS?: string;
      REVALIDATE_SECRET: string;
    }
  }
}

export {};
