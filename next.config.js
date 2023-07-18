/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.facebook.com"],
  },
  experimental: {
    nextScriptWorkers: true,
  }
};

module.exports = nextConfig;
