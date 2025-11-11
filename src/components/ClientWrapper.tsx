'use client';

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Client-side dynamic imports for performance
const PerformanceMonitor = dynamic(() => import("@/components/PerformanceMonitor"), {
  ssr: false,
});

const PreloadOptimizer = dynamic(() => import("@/components/PreloadOptimizer"), {
  ssr: false,
});

const ServiceWorkerRegistration = dynamic(() => import("@/components/ServiceWorkerRegistration"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PreloadOptimizer />
      <ServiceWorkerRegistration />
      {children}
      <PerformanceMonitor />
    </LanguageProvider>
  );
}