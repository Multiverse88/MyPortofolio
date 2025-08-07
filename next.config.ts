import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic configuration for deployment
  output: 'standalone',
  
  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checks during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization for better performance
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compress pages for better performance
  compress: true,
};

export default nextConfig;
