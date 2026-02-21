/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [50, 55, 60, 65, 70, 75, 85],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 960, 1080, 1200, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
