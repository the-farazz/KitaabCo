/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.100.82', 'localhost:3000', 'localhost:3001', 'localhost:3002'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
