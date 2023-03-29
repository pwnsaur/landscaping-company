const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
