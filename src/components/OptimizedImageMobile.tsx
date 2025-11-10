'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  onError?: (e: any) => void;
  style?: React.CSSProperties;
}

const OptimizedImageMobile = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  fill = false,
  onError,
  style,
  ...props
}: OptimizedImageProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate low-quality placeholder if not provided
  const generateBlurDataURL = (width: number = 8, height: number = 6) => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#334155"/>
        <rect x="10%" y="10%" width="80%" height="80%" fill="#475569" rx="4"/>
      </svg>`
    )}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: any) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Mobile-specific sizes if not provided
  const mobileOptimizedSizes = sizes || (
    isMobile 
      ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  );

  // Reduce quality on mobile for better performance
  const optimizedQuality = isMobile ? Math.max(quality - 15, 60) : quality;

  if (hasError) {
    return (
      <div 
        className={`bg-slate-700 animate-pulse rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-slate-400 text-sm">Failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-slate-700 animate-pulse rounded-lg ${className}`}
          style={fill ? {} : { width, height }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        quality={optimizedQuality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || generateBlurDataURL()}
        sizes={mobileOptimizedSizes}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        style={style}
        // Optimize loading for mobile
        loading={priority ? 'eager' : 'lazy'}
        // Use WebP format when possible
        {...props}
      />
    </div>
  );
};

// Higher-order component for certificate images
export const CertificateImage = ({ src, alt, ...props }: OptimizedImageProps) => {
  return (
    <OptimizedImageMobile
      src={src}
      alt={alt}
      quality={70}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      {...props}
    />
  );
};

// Higher-order component for profile images
export const ProfileImage = ({ src, alt, ...props }: OptimizedImageProps) => {
  return (
    <OptimizedImageMobile
      src={src}
      alt={alt}
      quality={85}
      priority={true}
      placeholder="blur"
      sizes="(max-width: 768px) 200px, 300px"
      {...props}
    />
  );
};

export default OptimizedImageMobile;