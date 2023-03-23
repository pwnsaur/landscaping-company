declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
      GMAIL_EMAIL_ADDRESS: string;
      GMAIL_APP_PASSWORD: string;
      GOOGLE_RECAPTCHA_API_KEY: string;
    }
  }
}

export {};
