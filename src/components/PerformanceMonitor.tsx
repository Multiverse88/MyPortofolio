'use client';

import { useEffect, useState } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { useTranslation } from '@/contexts/LanguageContext';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  largestContentfulPaint: number;
  firstContentfulPaint: number;
  cumulativeLayoutShift: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    largestContentfulPaint: 0,
    firstContentfulPaint: 0,
    cumulativeLayoutShift: 0,
  });
  const [showMetrics, setShowMetrics] = useState(false);
  const capabilities = useDeviceCapabilities();
  const { t } = useTranslation();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setMetrics(prev => ({ ...prev, fps }));
      }
      
      requestAnimationFrame(measureFPS);
    };

    const measureWebVitals = () => {
      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            setMetrics(prev => ({
              ...prev,
              largestContentfulPaint: entry.startTime
            }));
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Contentful Paint
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({
                ...prev,
                firstContentfulPaint: entry.startTime
              }));
            }
          }
        }).observe({ entryTypes: ['paint'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setMetrics(prev => ({
            ...prev,
            cumulativeLayoutShift: clsValue
          }));
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Measure memory usage
      const updateMemoryUsage = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          setMetrics(prev => ({
            ...prev,
            memoryUsage: Math.round(memory.usedJSHeapSize / 1048576) // Convert to MB
          }));
        }
      };

      // Measure load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      });

      updateMemoryUsage();
      setInterval(updateMemoryUsage, 5000); // Update every 5 seconds
    };

    measureFPS();
    measureWebVitals();

    // Show metrics if on mobile or low-end device
    if (capabilities.isMobile || capabilities.isLowEndDevice) {
      setShowMetrics(true);
    }

    // Keyboard shortcut to toggle metrics
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'P' && e.shiftKey && e.ctrlKey) {
        setShowMetrics(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [capabilities]);

  if (!showMetrics || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getScoreColor = (metric: string, value: number) => {
    switch (metric) {
      case 'fps':
        return value >= 50 ? 'text-green-400' : value >= 30 ? 'text-yellow-400' : 'text-red-400';
      case 'lcp':
        return value <= 2500 ? 'text-green-400' : value <= 4000 ? 'text-yellow-400' : 'text-red-400';
      case 'fcp':
        return value <= 1800 ? 'text-green-400' : value <= 3000 ? 'text-yellow-400' : 'text-red-400';
      case 'cls':
        return value <= 0.1 ? 'text-green-400' : value <= 0.25 ? 'text-yellow-400' : 'text-red-400';
      case 'memory':
        return value <= 50 ? 'text-green-400' : value <= 100 ? 'text-yellow-400' : 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs font-mono border border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">{t('performance.title')}</span>
        <button
          onClick={() => setShowMetrics(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>{t('performance.fps')}:</span>
          <span className={getScoreColor('fps', metrics.fps)}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>{t('performance.memory')}:</span>
          <span className={getScoreColor('memory', metrics.memoryUsage)}>
            {metrics.memoryUsage}MB
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getScoreColor('lcp', metrics.largestContentfulPaint)}>
            {Math.round(metrics.largestContentfulPaint)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getScoreColor('fcp', metrics.firstContentfulPaint)}>
            {Math.round(metrics.firstContentfulPaint)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getScoreColor('cls', metrics.cumulativeLayoutShift)}>
            {metrics.cumulativeLayoutShift.toFixed(3)}
          </span>
        </div>
        
        {capabilities.isMobile && (
          <div className="pt-1 border-t border-gray-600 text-yellow-400">
            {t('performance.mobileMode')}
          </div>
        )}
        
        {capabilities.isLowEndDevice && (
          <div className="text-orange-400">
            {t('performance.lowEndDevice')}
          </div>
        )}
      </div>
      
      <div className="text-gray-500 text-xs mt-2">
        {t('performance.toggle')}
      </div>
    </div>
  );
};

export default PerformanceMonitor;