'use client';

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Client-side dynamic import for performance monitor
const PerformanceMonitor = dynamic(() => import("@/components/PerformanceMonitor"), {
  ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <PerformanceMonitor />
    </LanguageProvider>
  );
}