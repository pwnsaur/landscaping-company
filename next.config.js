/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    qualities: [50, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
