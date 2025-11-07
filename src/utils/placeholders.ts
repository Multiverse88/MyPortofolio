// Utility functions for generating placeholder images and data URLs

/**
 * Generate a simple blur data URL for image placeholders
 */
export const generateBlurDataURL = (width: number, height: number, color?: string): string => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;

  if (!canvas) {
    // Fallback for server-side rendering
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color || '#f3f4f6'}"/>
      </svg>
    `)}`;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color || '#f9fafb');
  gradient.addColorStop(0.5, color || '#f3f4f6');
  gradient.addColorStop(1, color || '#e5e7eb');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Generate shimmer effect data URL for skeleton loading
 */
export const generateShimmerDataURL = (width: number, height: number): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e0e0e0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-100 0;100 0;-100 0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer)"/>
    </svg>
  `)}`;
};

/**
 * Certificate placeholder data
 */
export const certificatePlaceholders = {
  google: {
    title: 'Google Cloud Certificate',
    colors: ['#4285f4', '#34a853', '#fbbc05', '#ea4335'],
    pattern: 'linear-gradient(45deg, #4285f4 25%, #34a853 25%, #34a853 50%, #4285f4 50%)'
  },
  aws: {
    title: 'AWS Certificate',
    colors: ['#ff9900', '#232f3e'],
    pattern: 'linear-gradient(135deg, #ff9900 0%, #232f3e 100%)'
  },
  microsoft: {
    title: 'Microsoft Certificate',
    colors: ['#00bcf2', '#40e0d0', '#008080'],
    pattern: 'linear-gradient(90deg, #00bcf2 0%, #40e0d0 50%, #008080 100%)'
  },
  meta: {
    title: 'Meta Certificate',
    colors: ['#1877f2', '#42a5f5'],
    pattern: 'linear-gradient(45deg, #1877f2 0%, #42a5f5 100%)'
  },
  default: {
    title: 'Professional Certificate',
    colors: ['#6366f1', '#8b5cf6'],
    pattern: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
  }
};

/**
 * Generate certificate placeholder based on issuer
 */
export const generateCertificatePlaceholder = (
  issuer: string,
  width: number = 400,
  height: number = 300
): string => {
  const issuerKey = issuer.toLowerCase().includes('google') ? 'google' :
                   issuer.toLowerCase().includes('aws') || issuer.toLowerCase().includes('amazon') ? 'aws' :
                   issuer.toLowerCase().includes('microsoft') ? 'microsoft' :
                   issuer.toLowerCase().includes('meta') || issuer.toLowerCase().includes('facebook') ? 'meta' :
                   'default';

  const config = certificatePlaceholders[issuerKey];

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${config.colors[0]};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${config.colors[1] || config.colors[0]};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect x="10" y="10" width="${width-20}" height="${height-20}" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <text x="${width/2}" y="${height/2-10}" text-anchor="middle" fill="white" font-family="sans-serif" font-size="16" font-weight="bold" opacity="0.9">
        ${config.title}
      </text>
      <text x="${width/2}" y="${height/2+15}" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12" opacity="0.7">
        ${issuer}
      </text>
    </svg>
  `)}`;
};

/**
 * Profile image placeholder
 */
export const generateProfilePlaceholder = (width: number = 128, height: number = 128): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/2}" fill="url(#profileGradient)"/>
      <circle cx="${width/2}" cy="${height/2-10}" r="${width/6}" fill="white" opacity="0.8"/>
      <path d="M ${width/4} ${height*0.75} Q ${width/2} ${height*0.6} ${width*0.75} ${height*0.75}"
            fill="white" opacity="0.8"/>
    </svg>
  `)}`;
};

/**
 * Project thumbnail placeholder
 */
export const generateProjectPlaceholder = (width: number = 400, height: number = 250): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="projectBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#projectBg)"/>
      <rect x="20" y="20" width="${width-40}" height="40" fill="#cbd5e1" opacity="0.6" rx="4"/>
      <rect x="20" y="80" width="${width*0.6}" height="20" fill="#94a3b8" opacity="0.5" rx="2"/>
      <rect x="20" y="110" width="${width*0.8}" height="15" fill="#94a3b8" opacity="0.4" rx="2"/>
      <rect x="20" y="130" width="${width*0.5}" height="15" fill="#94a3b8" opacity="0.3" rx="2"/>
      <circle cx="${width-40}" cy="${height-40}" r="20" fill="#6366f1" opacity="0.6"/>
    </svg>
  `)}`;
};

/**
 * Loading states for different components
 */
export const loadingStates = {
  hero: {
    title: 'h-16 bg-gray-200 rounded animate-pulse',
    subtitle: 'h-8 bg-gray-200 rounded animate-pulse mt-4',
    description: 'h-4 bg-gray-200 rounded animate-pulse mt-6',
    button: 'h-12 w-32 bg-gray-200 rounded animate-pulse mt-8'
  },
  card: {
    image: 'h-48 bg-gray-200 rounded-t-lg animate-pulse',
    title: 'h-6 bg-gray-200 rounded animate-pulse mx-6 mt-4',
    description: 'h-4 bg-gray-200 rounded animate-pulse mx-6 mt-2',
    tag: 'h-6 w-16 bg-gray-200 rounded-full animate-pulse'
  },
  certificate: {
    container: 'bg-white rounded-xl shadow-lg border border-gray-100 p-6',
    image: 'h-40 bg-gray-200 rounded-lg animate-pulse mb-4',
    title: 'h-6 bg-gray-200 rounded animate-pulse mb-2',
    issuer: 'h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2',
    description: 'h-4 bg-gray-200 rounded animate-pulse mb-4'
  }
};

/**
 * Responsive image sizes for different breakpoints
 */
export const responsiveImageSizes = {
  hero: {
    mobile: '(max-width: 640px) 90vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '40vw'
  },
  card: {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw'
  },
  certificate: {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '25vw'
  },
  profile: {
    mobile: '(max-width: 640px) 120px',
    tablet: '(max-width: 1024px) 150px',
    desktop: '200px'
  }
};

/**
 * Get optimized image sizes string
 */
export const getImageSizes = (type: keyof typeof responsiveImageSizes): string => {
  const sizes = responsiveImageSizes[type];
  return `${sizes.mobile}, ${sizes.tablet}, ${sizes.desktop}`;
};

/**
 * Common placeholder colors for consistent theming
 */
export const placeholderColors = {
  light: {
    primary: '#f3f4f6',
    secondary: '#e5e7eb',
    accent: '#d1d5db'
  },
  dark: {
    primary: '#374151',
    secondary: '#4b5563',
    accent: '#6b7280'
  },
  brand: {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    orange: '#f59e0b'
  }
};
