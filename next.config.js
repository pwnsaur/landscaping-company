const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push(/\.test\.(js|tsx?)$/);
    }
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  experimental: {
    scrollRestoration: true,
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

  i18n: {
    locales: ['lv'],
    defaultLocale: 'lv',
  },
};

// module.exports = nextConfig;
module.exports = withBundleAnalyzer(nextConfig);
