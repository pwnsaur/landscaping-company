const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  compiler: {
    // styledComponents: {
    //   ssr: true,
    //   displayName: process.env.NODE_ENV === 'development',
    //   fileName: true,
    //   cssProp: true,
    // },
    styledComponents: true,
  },
};

module.exports = nextConfig;
