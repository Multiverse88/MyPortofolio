import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic configuration for deployment
  // output: "standalone", // Enable for production deployment

  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript checks during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enhanced image optimization for mobile performance
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200], // Added smaller sizes for mobile
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // Enhanced compression and performance optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance optimizations
  experimental: {
    // Optimize loading performance
    optimizePackageImports: ["framer-motion", "react-icons", "@heroicons/react"],
  },

  // Modern bundling optimization
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Headers for better caching and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Mobile-specific optimizations
          {
            key: "Viewport",
            value: "width=device-width, initial-scale=1, viewport-fit=cover",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/public/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 1 day for public assets
          },
        ],
      },
    ];
  },

  // Webpack optimizations for mobile performance
  webpack: (config, { dev, isServer }) => {
    // Optimize for mobile performance
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 10000, // Smaller minimum size for better mobile loading
          maxSize: 200000, // Reduced chunk size for faster loading
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
              chunks: "all",
              maxSize: 120000, // Smaller vendor chunks
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion/,
              name: "framer-motion",
              priority: 20,
              chunks: "all",
              maxSize: 80000,
            },
            reactIcons: {
              test: /[\\/]node_modules[\\/]react-icons/,
              name: "react-icons",
              priority: 15,
              chunks: "all",
              maxSize: 50000,
            },
            common: {
              name: "common",
              minChunks: 2,
              priority: 5,
              chunks: "all",
              enforce: true,
              maxSize: 80000,
            },
          },
        },
        // Additional performance optimizations
        usedExports: true,
        sideEffects: false,
        concatenateModules: true,
        // Optimize module loading
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
    }

    // Optimize module resolution for mobile
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optimize specific libraries for mobile
    };

    // Preload optimization
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif)$/,
      use: {
        loader: 'next/image-loader',
        options: {
          domains: ['github.com', 'avatars.githubusercontent.com'],
        },
      },
    });

    return config;
  },
};

export default nextConfig;
