import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import ProjectsNew from '@/components/ProjectsNew';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ainan Bahrul Ihsan",
  "jobTitle": "Full Stack Developer",
  "description": "Full Stack Developer and Cloud Computing Specialist with expertise in Next.js, React, Node.js, and Google Cloud Platform",
  "url": "https://ainan-portfolio.vercel.app",
  "sameAs": [
    "https://linkedin.com/in/ainan-bahrul-ihsan",
    "https://github.com/Multiverse88",
    "https://twitter.com/ainanbahrul"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Laboratorium Teknik Informatika UNPAS"
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "Universitas Pasundan"
  },
  "knowsAbout": [
    "Full Stack Development",
    "Cloud Computing",
    "Next.js",
    "React.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Google Cloud Platform",
    "Web Development",
    "Software Engineering"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Indonesia"
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Experience />
        <ProjectsNew />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
