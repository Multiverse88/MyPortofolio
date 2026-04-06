"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import PDFModal from "./PDFModal";
import { useTranslation } from "@/contexts/LanguageContext";
import {
  usePerformanceOptimization,
  useOptimizedIntersection,
} from "@/hooks/usePerformanceOptimization";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  pdfUrl?: string;
  fallbackImage: string;
  verificationUrl: string;
  skills: string[];
  type: "image" | "pdf";
}

// Static certificates data
const certificates: Certificate[] = [
  {
    id: 1,
    title: "Menjadi Google Cloud Engineer",
    issuer: "Dicoding Indonesia",
    date: " 17 May 2024",
    description:
      "Pelajari dasar Python hingga library populer yang menjadi landasan tren industri data science, machine learning, dan back-end development..",
    image: "/images/sertifikat_course_133_2291673_170524140110_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_133_2291673_170524140110.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Google Cloud", "Back-End Developer", "Learning Path"],
    type: "pdf",
  },
  {
    id: 2,
    title: "Belajar Dasar Pemprograman Javascript",
    issuer: "Dicoding Indonesia",
    date: "April 2024",
    description:
      "Sertifikasi dasar-dasar pemrograman JavaScript dan pengembangan aplikasi modern.",
    image: "/images/sertifikat_course_256_2291673_280424121745_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_256_2291673_280424121745.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Google Cloud", "React", "Front-End Web", "Back-End Developer", "Learning Path"],
    type: "pdf",
  },
  {
    id: 3,
    title: "Belajar Membuat Aplikasi Backend untuk Pemula dengan Google Cloud Platform",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi pengembangan backend untuk pemula dengan Google Cloud Platform.",
    image: "/images/sertifikat_course_342_2291673_090524070630_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_342_2291673_090524070630.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Google Cloud", "Learning Path", "Back-End Developer", "Cloud Computing"],
    type: "pdf",
  },
  {
    id: 4,
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi dasar-dasar pemrograman JavaScript dan pengembangan aplikasi modern.",
    image: "/images/sertifikat_course_653_2291673_140524232556_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_653_2291673_140524232556.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["AI", "Machine Learning", "Data Science", "Python"],
    type: "pdf",
  },
  {
    id: 5,
    title: "Belajar Penerapan Machine Learning dengan Google Cloud Platform",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi penerapan machine learning dengan Google Cloud Platform.",
    image: "/images/sertifikat_course_658_2291673_230524154947_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_658_2291673_230524154947.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Google Cloud", "Machine Learning", "Python", "Data Science"],
    type: "pdf",
  },
  {
    id: 6,
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Google Cloud",
    date: "2024",
    description:
      "Sertifikasi Pemrograman untuk Menjadi Pengembang Software.",
    image: "/images/Screenshot 2026-04-06 133725.png",
    pdfUrl: undefined,
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.cloudskillsboost.google/",
    skills: ["JavaScript", "Programming", "Infrastructure"],
    type: "image",
  },
];

const CertificatesWeb3 = () => {
  const { t } = useTranslation();
  // Simplified state management
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  // Mount effect - load all certificates immediately
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants - simplified
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  // Event handlers
  const handleImageError = (certId: number) => {
    setImageErrors((prev) => ({ ...prev, [certId]: true }));
  };

  const openPdfModal = (pdfUrl: string, title: string) => {
    setSelectedPdf(pdfUrl);
    setSelectedTitle(title);
    setShowPDFViewer(true);
  };

  const closePdfModal = () => {
    setSelectedPdf(null);
    setSelectedTitle("");
    setShowPDFViewer(false);
  };

  const handleCertificateClick = (cert: Certificate) => {
    if (cert.type === "pdf" && cert.pdfUrl) {
      openPdfModal(cert.pdfUrl, cert.title);
    } else {
      window.open(cert.verificationUrl, "_blank");
    }
  };

  // Error boundary fallback - simplified
  const renderWithErrorBoundary = (content: React.ReactNode) => {
    if (!mounted) {
      return (
        <section id="certificates" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-slate-700 rounded-lg mx-auto w-64"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-slate-700 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }
    
    return content;
  };

  return renderWithErrorBoundary(
    <>
      <section
        id="certificates"
        className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Dynamic Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                {t('certificates.title')}
              </motion.h2>
              <motion.p
                className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mt-6"
                variants={cardVariants}
              >
                {t('certificates.subtitle')}
              </motion.p>
            </motion.div>

            {/* Certificates Grid */}
            <motion.div
              variants={cardVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.slice(0, 6).map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={cardVariants}
                    className="group cursor-pointer"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCertificateClick(cert)}
                  >
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 relative overflow-hidden h-full">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Certificate Image */}
                        <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-slate-700/50">
                          <Image
                            src={
                              imageErrors[cert.id]
                                ? cert.fallbackImage
                                : cert.image || cert.fallbackImage
                            }
                            alt={cert.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => handleImageError(cert.id)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />

                          {/* Certificate Type Badge */}
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${
                                cert.type === "pdf"
                                  ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
                                  : "bg-green-500/20 text-green-300 border-green-400/30"
                              }`}
                            >
                              {cert.type === "pdf" ? "PDF" : "Image"}
                            </span>
                          </div>
                        </div>

                        {/* Certificate Info */}
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                            {cert.title}
                          </h3>

                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm text-green-400 font-medium">
                              {cert.issuer}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-400">
                              {cert.date}
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                            {cert.description}
                          </p>

                          {/* Skills */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {cert.skills
                                .slice(0, 4)
                                .map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-md border border-slate-600/50"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              {cert.skills.length > 4 && (
                                <span className="px-2 py-1 text-xs bg-slate-600/50 text-gray-400 rounded-md border border-slate-500/50">
                                  +{cert.skills.length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-auto pt-4 border-t border-slate-700/50">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400 group-hover:text-green-400 transition-colors">
                                {t('certificates.clickTo')} {" "}
                                {cert.type === "pdf" ? t('certificates.viewCertificate') : t('certificates.verify')}
                              </span>
                              <motion.div
                                className="w-8 h-8 rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-600/30 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {cert.type === "pdf" ? (
                                  <svg
                                    className="w-4 h-4 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-4 h-4 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* View More Button */}
            <motion.div 
              variants={itemVariants} 
              className="flex justify-center mt-12"
            >
              <motion.a
                href="https://drive.google.com/drive/folders/1iMwNkGfZJnHP7bxTgiKyhmbIDLDnGMha?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full" style={{animation: 'shimmer 2s infinite'}} />
                
                {/* Content */}
                <span className="relative flex items-center space-x-2">
                  <span>Lihat Sertifikat Lainnya</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Bottom Call to Action */}
            <motion.div variants={itemVariants} className="text-center mt-16">
              <motion.div
                className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-400/30 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-300 font-medium">
                  Continuously expanding professional expertise
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {showPDFViewer && selectedPdf && selectedTitle && (
          <PDFModal
            pdfUrl={selectedPdf}
            title={selectedTitle}
            onClose={closePdfModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesWeb3;
