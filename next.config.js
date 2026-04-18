/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the pages router entirely — we use App Router only
  // This prevents any conflict with leftover pages/ files
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
