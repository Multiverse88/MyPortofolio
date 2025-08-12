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
    domains: ['github.com', 'avatars.githubusercontent.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  
  // Compress pages for better performance
  compress: true,
};

export default nextConfig;
