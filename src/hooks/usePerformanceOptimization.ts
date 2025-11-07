"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// Hook for detecting mobile devices and performance preferences
export const usePerformanceOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<"slow" | "fast">(
    "fast",
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check device capabilities
    const checkDeviceCapabilities = () => {
      // Mobile detection
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Low-end device detection based on hardware concurrency and memory
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const memory = (navigator as any).deviceMemory || 4;
      const isLowEnd = hardwareConcurrency <= 2 || memory <= 2;
      setIsLowEndDevice(isLowEnd);

      // Reduced motion preference
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      // Connection speed detection
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        const slowConnections = ["slow-2g", "2g", "3g"];
        setConnectionSpeed(
          slowConnections.includes(connection.effectiveType) ? "slow" : "fast",
        );
      }
    };

    checkDeviceCapabilities();

    // Listen for resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Listen for motion preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Performance-optimized animation settings
  const animationConfig = useMemo(() => {
    if (!mounted) return { duration: 0, ease: "linear" };

    const shouldReduceMotion =
      prefersReducedMotion || isLowEndDevice || connectionSpeed === "slow";

    return {
      duration: shouldReduceMotion ? 0.1 : isMobile ? 0.3 : 0.6,
      ease: shouldReduceMotion ? "linear" : "easeOut",
      reduce: shouldReduceMotion,
      enableParticles: !isMobile && !isLowEndDevice,
      enableComplexAnimations:
        !isMobile && !isLowEndDevice && connectionSpeed === "fast",
    };
  }, [
    mounted,
    isMobile,
    isLowEndDevice,
    prefersReducedMotion,
    connectionSpeed,
  ]);

  // Image optimization settings
  const imageConfig = useMemo(
    () => ({
      quality: isMobile ? 75 : 90,
      priority: !isMobile,
      sizes: isMobile
        ? "(max-width: 768px) 100vw, 50vw"
        : "(max-width: 1200px) 50vw, 33vw",
      placeholder: connectionSpeed === "slow" ? "blur" : undefined,
      loading: "lazy" as const,
    }),
    [isMobile, connectionSpeed],
  );

  // Lazy loading configuration
  const shouldLazyLoad = useCallback(
    (priority = false) => {
      if (!mounted) return true;
      return (
        !priority && (isMobile || isLowEndDevice || connectionSpeed === "slow")
      );
    },
    [mounted, isMobile, isLowEndDevice, connectionSpeed],
  );

  return {
    isMobile,
    isLowEndDevice,
    prefersReducedMotion,
    connectionSpeed,
    mounted,
    animationConfig,
    imageConfig,
    shouldLazyLoad,
  };
};

// Hook for optimized intersection observer
export const useOptimizedIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            setHasIntersected(true);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
          ...options,
        },
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [options],
  );

  return { ref, isIntersecting, hasIntersected };
};

// Hook for debounced values to reduce re-renders
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for managing heavy computations with performance consideration
export const useOptimizedComputation = <T>(
  computeFn: () => T,
  deps: React.DependencyList,
  shouldCompute = true,
) => {
  const { isLowEndDevice } = usePerformanceOptimization();

  return useMemo(() => {
    if (!shouldCompute || isLowEndDevice) {
      return null;
    }
    return computeFn();
  }, [...deps, shouldCompute, isLowEndDevice]);
};

// Hook for conditional feature loading
export const useFeatureFlag = () => {
  const { isMobile, isLowEndDevice, connectionSpeed } =
    usePerformanceOptimization();

  return useMemo(
    () => ({
      enableAnimations: !isLowEndDevice && connectionSpeed === "fast",
      enableParticles: !isMobile && !isLowEndDevice,
      enableBlurEffects: !isLowEndDevice,
      enableAutoplay: !isMobile && connectionSpeed === "fast",
      enableHeavyComponents: !isMobile && !isLowEndDevice,
      maxConcurrentAnimations: isLowEndDevice ? 2 : isMobile ? 4 : 8,
    }),
    [isMobile, isLowEndDevice, connectionSpeed],
  );
};
