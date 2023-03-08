const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

module.exports = nextConfig;
