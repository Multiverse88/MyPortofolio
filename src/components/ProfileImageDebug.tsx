'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProfileImageDebugProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ProfileImageDebug = ({ 
  size = 'medium', 
  className = ''
}: ProfileImageDebugProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32', 
    large: 'w-40 h-40'
  };

  console.log('ProfileImageDebug:', {
    size,
    screenWidth,
    imageLoaded,
    isDesktop: screenWidth >= 1024,
    isMobile: screenWidth < 768
  });

  return (
    <div className={`relative ${sizeClasses[size]} ${className} bg-blue-100 border-2 border-blue-500`}>
      {/* Debug info */}
      <div className="absolute -top-8 left-0 text-xs bg-black text-white px-2 py-1 rounded z-50">
        {screenWidth}px {screenWidth >= 1024 ? 'Desktop' : screenWidth >= 768 ? 'Tablet' : 'Mobile'}
      </div>
      
      {/* Force visible image */}
      <img 
        src="/images/ainan-profile.jpg"
        alt="Debug Profile"
        className={`${sizeClasses[size]} object-cover object-center rounded-2xl shadow-lg`}
        style={{
          display: 'block',
          opacity: 1,
          visibility: 'visible',
          position: 'relative',
          zIndex: 10
        }}
        onLoad={() => {
          console.log('DEBUG: Image loaded at', screenWidth + 'px');
          setImageLoaded(true);
        }}
        onError={() => {
          console.log('DEBUG: Image failed at', screenWidth + 'px');
        }}
      />
      
      {/* Fallback */}
      <div className="absolute inset-0 bg-red-500 text-white flex items-center justify-center rounded-2xl" style={{ zIndex: 5 }}>
        <span className="text-sm font-bold">IMG FAIL</span>
      </div>
    </div>
  );
};

export default ProfileImageDebug;
