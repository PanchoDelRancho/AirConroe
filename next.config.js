/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pagesDir: "src/app",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
