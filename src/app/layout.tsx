import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <meta name="theme-color" content="#113F67" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
