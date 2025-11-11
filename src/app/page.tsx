"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

// Critical components - load immediately
const HeaderWeb3 = dynamic(() => import("@/components/HeaderWeb3"), {
  ssr: false,
  loading: () => (
    <div className="h-20 bg-slate-900/50 backdrop-blur-sm animate-pulse" />
  ),
});

const HeroWeb3 = dynamic(() => import("@/components/HeroWeb3"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900 animate-pulse" />,
});

const AboutWeb3 = dynamic(() => import("@/components/AboutWeb3"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />,
});

const ExperienceWeb3 = dynamic(() => import("@/components/ExperienceWeb3"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
});

const CertificatesWeb3 = dynamic(
  () => import("@/components/CertificatesWeb3"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-slate-800 animate-pulse" />,
  },
);

const ProjectsNew = dynamic(() => import("@/components/ProjectsNew"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
});

const ContactWeb3 = dynamic(() => import("@/components/ContactWeb3"), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />,
});

const FooterWeb3 = dynamic(() => import("@/components/FooterWeb3"), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-950 animate-pulse" />,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading screen until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Critical above-the-fold content */}
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
          <HeroWeb3 />
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
        
        {/* Footer loads last */}
        <Suspense
          fallback={<div className="h-64 bg-slate-950 animate-pulse" />}
        >
          <FooterWeb3 />
        </Suspense>
      </div>
    </>
  );
}
