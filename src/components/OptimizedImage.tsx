"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
  onError?: () => void;
  fallbackSrc?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  style,
  onError,
  fallbackSrc,
  quality,
  placeholder,
  blurDataURL,
  ...props
}) => {
  const { isMobile, isLowEndDevice, connectionSpeed, imageConfig } =
    usePerformanceOptimization();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate optimized sizes based on device
  const optimizedSizes = useMemo(() => {
    if (isMobile) {
      return "(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw";
    }
    return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  }, [isMobile]);

  // Determine quality based on device and connection
  const optimizedQuality = useMemo(() => {
    if (quality) return quality;
    if (isLowEndDevice || connectionSpeed === "slow") return 60;
    if (isMobile) return 75;
    return 85;
  }, [quality, isLowEndDevice, connectionSpeed, isMobile]);

  // Generate blur placeholder for low-end devices
  const generateBlurDataURL = (w: number, h: number) => {
    if (typeof window === "undefined") {
      // Server-side fallback
      return `data:image/svg+xml;base64,${btoa(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`)}`;
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Create a simple gradient as placeholder
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#f3f4f6");
    gradient.addColorStop(1, "#e5e7eb");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    return canvas.toDataURL();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Use fallback or generate placeholder if error occurs
  const imageSrc = hasError ? fallbackSrc || "/images/placeholder.webp" : src;

  // Generate blur placeholder if needed
  const optimizedBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    if (
      typeof window !== "undefined" &&
      (isLowEndDevice || connectionSpeed === "slow") &&
      width &&
      height
    ) {
      return generateBlurDataURL(20, Math.floor(20 * (height / width)));
    }
    return undefined;
  }, [blurDataURL, isLowEndDevice, connectionSpeed, width, height]);

  // Optimized placeholder strategy
  const optimizedPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (optimizedBlurDataURL) return "blur" as const;
    if (isLowEndDevice || connectionSpeed === "slow") return "empty" as const;
    return undefined;
  }, [placeholder, optimizedBlurDataURL, isLowEndDevice, connectionSpeed]);

  const imageProps = {
    src: imageSrc,
    alt,
    quality: optimizedQuality,
    priority: priority && !isLowEndDevice,
    sizes: optimizedSizes,
    placeholder: optimizedPlaceholder,
    blurDataURL: optimizedBlurDataURL,
    onError: handleError,
    onLoad: handleLoad,
    className: `${className} transition-opacity duration-300 ${
      isLoading ? "opacity-0" : "opacity-100"
    }`,
    style: {
      ...style,
      // Optimize rendering performance
      willChange: isLoading ? "opacity" : "auto",
    },
    ...props,
  };

  // Loading skeleton for mobile
  const LoadingSkeleton = () => (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{
        width: width || "100%",
        height: height || "200px",
        ...style,
      }}
    >
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

  // For fill images
  if (fill) {
    return (
      <div className="relative">
        {isLoading && isMobile && <LoadingSkeleton />}
        <Image {...imageProps} fill />
      </div>
    );
  }

  // For sized images
  if (width && height) {
    return (
      <>
        {isLoading && isMobile && <LoadingSkeleton />}
        <Image {...imageProps} width={width} height={height} />
      </>
    );
  }

  // Fallback with intrinsic sizing
  return (
    <>
      {isLoading && isMobile && <LoadingSkeleton />}
      <Image
        {...imageProps}
        width={800}
        height={600}
        style={{
          width: "100%",
          height: "auto",
          ...style,
        }}
      />
    </>
  );
};

export default OptimizedImage;
