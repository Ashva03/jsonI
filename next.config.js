/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'public',
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
