"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

// Mobile-optimized components
const HeroMobileOptimized = dynamic(() => import("@/components/HeroMobileOptimized"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900 animate-pulse" />,
});

// Modern portfolio components for desktop
const HeroWeb3 = dynamic(() => import("@/components/HeroWeb3"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900 animate-pulse" />,
});

// Other components with performance considerations
const AboutWeb3 = dynamic(() => import("@/components/AboutWeb3"), {
  ssr: false,
});
const ExperienceWeb3 = dynamic(() => import("@/components/ExperienceWeb3"), {
  ssr: false,
});
const CertificatesWeb3 = dynamic(
  () => import("@/components/CertificatesWeb3"),
  {
    ssr: false,
  },
);
const ProjectsNew = dynamic(() => import("@/components/ProjectsNew"), {
  ssr: false,
});
const ContactWeb3 = dynamic(() => import("@/components/ContactWeb3"), {
  ssr: false,
});
const FooterWeb3 = dynamic(() => import("@/components/FooterWeb3"), {
  ssr: false,
});
const HeaderWeb3 = dynamic(() => import("@/components/HeaderWeb3"), {
  ssr: false,
  loading: () => (
    <div className="h-20 bg-slate-900/50 backdrop-blur-sm animate-pulse" />
  ),
});

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ainan Bahrul Ihsan",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer and Cloud Computing Specialist with expertise in Next.js, React, Node.js, and Google Cloud Platform",
  url: "https://ainan-portfolio.vercel.app",
  sameAs: [
    "https://linkedin.com/in/ainan-bahrul-ihsan",
    "https://github.com/Multiverse88",
    "https://twitter.com/ainanbahrul",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Laboratorium Teknik Informatika UNPAS",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Universitas Pasundan",
  },
  knowsAbout: [
    "Full Stack Development",
    "Cloud Computing",
    "Next.js",
    "React.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Google Cloud Platform",
    "Web Development",
    "Software Engineering",
    "Professional Certifications",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "Indonesia",
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading screen until mounted and capabilities detected
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-lg">Loading...</div>
      </div>
    );
  }

  // Choose Hero component based on device capabilities
  const HeroComponent = capabilities.isLowEndDevice || capabilities.isMobile ? HeroMobileOptimized : HeroWeb3;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        <Suspense
          fallback={
            <div className="h-20 bg-slate-900/50 backdrop-blur-sm animate-pulse" />
          }
        >
          <HeaderWeb3 />
        </Suspense>
        
        <Suspense
          fallback={<div className="min-h-screen bg-slate-900 animate-pulse" />}
        >
          <HeroComponent />
        </Suspense>
        
        <Suspense
          fallback={<div className="h-96 bg-slate-800 animate-pulse" />}
        >
          <AboutWeb3 />
        </Suspense>
        
        <Suspense
          fallback={<div className="h-96 bg-slate-900 animate-pulse" />}
        >
          <ExperienceWeb3 />
        </Suspense>
        
        <Suspense
          fallback={<div className="h-96 bg-slate-800 animate-pulse" />}
        >
          <CertificatesWeb3 />
        </Suspense>
        
        <Suspense
          fallback={<div className="h-96 bg-slate-900 animate-pulse" />}
        >
          <ProjectsNew />
        </Suspense>
        
        <Suspense
          fallback={<div className="h-96 bg-slate-800 animate-pulse" />}
        >
          <ContactWeb3 />
        </Suspense>
        
        <FooterWeb3 />
      </div>
    </>
  );
}
