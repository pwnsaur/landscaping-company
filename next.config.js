const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
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
