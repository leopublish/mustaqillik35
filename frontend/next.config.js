/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for the multi-stage Docker build used in Railway
  output: 'standalone',
};

module.exports = nextConfig;
