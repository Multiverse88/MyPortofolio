import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEndDevice: boolean;
  supportsWebP: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  deviceMemory: number;
  hardwareConcurrency: number;
  reduceMotion: boolean;
}

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEndDevice: false,
    supportsWebP: false,
    connectionSpeed: 'unknown',
    deviceMemory: 4,
    hardwareConcurrency: 2,
    reduceMotion: false,
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check if mobile
      const isMobile = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Check device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory || 4;
      
      // Check CPU cores
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      
      // Determine if low-end device
      const isLowEndDevice = deviceMemory <= 2 || hardwareConcurrency <= 2 || isMobile;
      
      // Check WebP support
      const supportsWebP = (() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      })();
      
      // Check connection speed
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }
      
      // Check for reduced motion preference
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setCapabilities({
        isMobile,
        isLowEndDevice,
        supportsWebP,
        connectionSpeed,
        deviceMemory,
        hardwareConcurrency,
        reduceMotion,
      });
    };

    detectCapabilities();

    // Listen for resize changes
    const handleResize = () => {
      setCapabilities(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768
      }));
    };

    // Listen for connection changes
    const handleConnectionChange = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        const connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
        setCapabilities(prev => ({ ...prev, connectionSpeed }));
      }
    };

    window.addEventListener('resize', handleResize);
    
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return capabilities;
};

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const capabilities = useDeviceCapabilities();
  
  const shouldReduceAnimations = capabilities.isLowEndDevice || capabilities.reduceMotion || capabilities.connectionSpeed === 'slow';
  const shouldLazyLoad = capabilities.isMobile || capabilities.connectionSpeed === 'slow';
  const shouldUseWebP = capabilities.supportsWebP;
  const shouldReduceQuality = capabilities.isLowEndDevice || capabilities.connectionSpeed === 'slow';
  
  const getOptimalImageQuality = (baseQuality: number = 75): number => {
    if (shouldReduceQuality) {
      return Math.max(baseQuality - 20, 50);
    }
    return baseQuality;
  };

  const getOptimalFrameRate = (): number => {
    if (capabilities.isLowEndDevice) {
      return 30; // 30fps for low-end devices
    }
    return 60; // 60fps for capable devices
  };

  const shouldSkipHeavyAnimations = (): boolean => {
    return shouldReduceAnimations;
  };

  const getOptimalChunkSize = (): number => {
    if (capabilities.deviceMemory <= 2) {
      return 50; // Smaller chunks for low memory devices
    }
    if (capabilities.deviceMemory <= 4) {
      return 100;
    }
    return 200; // Larger chunks for high memory devices
  };

  return {
    capabilities,
    shouldReduceAnimations,
    shouldLazyLoad,
    shouldUseWebP,
    shouldReduceQuality,
    getOptimalImageQuality,
    getOptimalFrameRate,
    shouldSkipHeavyAnimations,
    getOptimalChunkSize,
  };
};