import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default:
      "Ainan Bahrul Ihsan - Full Stack Developer & Cloud Computing Specialist",
    template: "%s | Ainan Bahrul Ihsan Portfolio",
  },
  description:
    "Portfolio of Ainan Bahrul Ihsan - Full Stack Developer, Cloud Computing Specialist, and Software Engineer. Experienced in Next.js, React, Node.js, Google Cloud Platform, and modern web technologies.",
  keywords: [
    "Ainan Bahrul Ihsan",
    "Full Stack Developer",
    "Cloud Computing",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Google Cloud Platform",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "UNPAS",
    "Bangkit Academy",
    "GDSC",
  ],
  authors: [{ name: "Ainan Bahrul Ihsan" }],
  creator: "Ainan Bahrul Ihsan",
  publisher: "Ainan Bahrul Ihsan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ainan-portfolio.vercel.app",
    title:
      "Ainan Bahrul Ihsan - Full Stack Developer & Cloud Computing Specialist",
    description:
      "Portfolio of Ainan Bahrul Ihsan - Full Stack Developer, Cloud Computing Specialist, and Software Engineer with expertise in modern web technologies.",
    siteName: "Ainan Bahrul Ihsan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ainan Bahrul Ihsan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ainan Bahrul Ihsan - Full Stack Developer & Cloud Computing Specialist",
    description:
      "Portfolio of Ainan Bahrul Ihsan - Full Stack Developer, Cloud Computing Specialist, and Software Engineer.",
    images: ["/og-image.jpg"],
    creator: "@ainanbahrul",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ainan-portfolio.vercel.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Critical resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/images/ainan-profile.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme and viewport configuration */}
        <meta name="theme-color" content="#113F67" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Mobile optimization meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Prefetch next likely pages */}
        <link rel="prefetch" href="/#about" />
        <link rel="prefetch" href="/#experience" />
        <link rel="prefetch" href="/#certificates" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .critical-css {
              background-color: #0f172a;
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .hero-skeleton {
              min-height: 100vh;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .loading-spinner {
              width: 40px;
              height: 40px;
              border: 3px solid #334155;
              border-top: 3px solid #06b6d4;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased critical-css`}
      >
        <ErrorBoundary>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
