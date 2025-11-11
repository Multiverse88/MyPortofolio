'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { profileImageSVG } from '@/utils/images';

interface ProfileImageProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showFallback?: boolean;
  imageUrl?: string; // Allow custom image URL
}

const ProfileImage = ({ 
  size = 'medium', 
  className = '', 
  showFallback = true,
  imageUrl // Custom image URL prop
}: ProfileImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSource, setCurrentSource] = useState(0);

  // Image sources in order of preference
  const imageSources = [
    imageUrl, // Custom URL if provided
    '/images/ainan-profile.jpg', // Local file (highest priority)
    '/images/ainan-profile.jpg?v=1', // Cache busting version
    'https://github.com/Multiverse88.png', // GitHub avatar as backup
    profileImageSVG // SVG fallback
  ].filter(Boolean);

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('ProfileImage Debug:', {
      size,
      imageLoaded,
      imageError,
      currentSource,
      totalSources: imageSources.length,
      currentImageUrl: imageSources[currentSource]
    });
  }

  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32', 
    large: 'w-40 h-40'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  // Fallback avatar with initials
  const FallbackAvatar = () => (
    <motion.div 
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#58A0C8] to-[#34699A] rounded-2xl flex items-center justify-center text-white ${textSizes[size]} font-bold shadow-lg ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>AI</span>
      
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#34699A]/20 to-[#113F67]/20 rounded-2xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  // Loading placeholder
  const LoadingPlaceholder = () => (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse flex items-center justify-center ${className}`}>
      <motion.div 
        className="w-8 h-8 border-3 border-gray-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  if (!showFallback || imageError) {
    return <FallbackAvatar />;
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Loading state */}
      {!imageLoaded && <LoadingPlaceholder />}
      
      {/* Actual image with multiple sources */}
      <motion.img 
        src={imageSources[currentSource]} // Use current source index
        alt="Ainan Bahrul Ihsan - Full Stack Developer"
        className={`${sizeClasses[size]} object-cover object-center rounded-2xl shadow-lg transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
        style={{
          filter: 'grayscale(5%) contrast(1.1) brightness(1.05)',
          display: 'block !important', // Force display
        }}
        onLoad={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Image loaded successfully:', imageSources[currentSource]);
          }
          setImageLoaded(true);
        }}
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Image error:', e.currentTarget.src);
          }
          // Try next image source
          const nextIndex = currentSource + 1;
          
          if (nextIndex < imageSources.length && imageSources[nextIndex]) {
            if (process.env.NODE_ENV === 'development') {
              console.log('Trying next source:', imageSources[nextIndex]);
            }
            setCurrentSource(nextIndex);
            setImageLoaded(false);
            e.currentTarget.src = imageSources[nextIndex]!;
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('All sources failed, showing fallback');
            }
            setImageError(true);
          }
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: imageLoaded ? 1 : 0.9, 
          opacity: imageLoaded ? 1 : 0 
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Gradient overlay */}
      {imageLoaded && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#58A0C8]/10 to-[#34699A]/10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </div>
  );
};

export default ProfileImage;
