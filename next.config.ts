/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
  },
};

module.exports = nextConfig;