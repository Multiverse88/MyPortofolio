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
    title: "Dicoding Backend JavaScript Developer",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi pengembangan backend menggunakan JavaScript, Node.js, dan framework terkini.",
    image: "/images/sertifikat_course_133_2291673_170524140110_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_133_2291673_170524140110.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Node.js", "Backend", "JavaScript", "REST API"],
    type: "pdf",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "Dicoding Indonesia",
    date: "April 2024",
    description:
      "Sertifikasi pengembangan web full stack dengan teknologi modern dan best practices.",
    image: "/images/sertifikat_course_256_2291673_280424121745_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_256_2291673_280424121745.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["Full Stack", "Web Development", "Frontend", "Backend"],
    type: "pdf",
  },
  {
    id: 3,
    title: "React Developer Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi pengembangan aplikasi web menggunakan React.js dan ecosystem-nya.",
    image: "/images/sertifikat_course_342_2291673_090524070630_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_342_2291673_090524070630.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["React", "JavaScript", "Frontend", "SPA"],
    type: "pdf",
  },
  {
    id: 4,
    title: "JavaScript Programming Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi dasar-dasar pemrograman JavaScript dan pengembangan aplikasi modern.",
    image: "/images/sertifikat_course_653_2291673_140524232556_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_653_2291673_140524232556.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["JavaScript", "Programming", "ES6+", "DOM"],
    type: "pdf",
  },
  {
    id: 5,
    title: "MySQL Database Management",
    issuer: "Dicoding Indonesia",
    date: "May 2024",
    description:
      "Sertifikasi manajemen database MySQL dan optimasi query untuk aplikasi web.",
    image: "/images/sertifikat_course_658_2291673_230524154947_page-0001.jpg",
    pdfUrl: "/certificates/pdf/sertifikat_course_658_2291673_230524154947.pdf",
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.dicoding.com/certificates",
    skills: ["MySQL", "Database", "SQL", "Query Optimization"],
    type: "pdf",
  },
  {
    id: 6,
    title: "Google Cloud Platform Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    description:
      "Fundamental knowledge of Google Cloud Platform services and cloud computing concepts.",
    image: "/certificates/gcp-fundamentals.svg",
    pdfUrl: undefined,
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://www.cloudskillsboost.google/",
    skills: ["GCP", "Cloud Computing", "Google Cloud", "Infrastructure"],
    type: "image",
  },
  {
    id: 7,
    title: "Bangkit Academy 2024",
    issuer: "Bangkit Academy led by Google, Tokopedia, Gojek & Traveloka",
    date: "2024",
    description:
      "Comprehensive mobile development and machine learning program by leading Indonesian tech companies.",
    image: "/certificates/bangkit-certificate.svg",
    pdfUrl: undefined,
    fallbackImage: "/images/cert-placeholder.svg",
    verificationUrl: "https://grow.google/intl/id_id/bangkit/",
    skills: ["Mobile Development", "Machine Learning", "Android", "Kotlin"],
    type: "image",
  },
];

const CertificatesWeb3 = () => {
  const { t } = useTranslation();
  // Performance optimization hooks
  const { isMobile, mounted, animationConfig } = usePerformanceOptimization();

  // Intersection observer for lazy loading
  const { ref: sectionRef, hasIntersected } = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // State management
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [loadedCertificates, setLoadedCertificates] = useState<number[]>([]);

  // Performance optimization - batch loading
  useEffect(() => {
    if (!hasIntersected || !mounted) return;

    const loadCertificatesBatch = () => {
      const batchSize = isMobile ? 3 : 6;
      const totalCertificates = certificates.length;

      if (loadedCertificates.length < totalCertificates) {
        const nextBatch = certificates
          .slice(
            loadedCertificates.length,
            loadedCertificates.length + batchSize,
          )
          .map((cert) => cert.id);
        setLoadedCertificates((prev) => [...prev, ...nextBatch]);
      }
    };

    if (loadedCertificates.length === 0) {
      loadCertificatesBatch();
    }
  }, [hasIntersected, mounted, isMobile, loadedCertificates.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: animationConfig.reduce ? 0.2 : 1,
        staggerChildren: animationConfig.reduce ? 0.05 : 0.15,
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

  if (!mounted) {
    return (
      <section className="py-20 bg-slate-900">
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

  return (
    <>
      <section
        id="certificates"
        className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
        ref={sectionRef}
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
              {certificates
                .filter((cert) => loadedCertificates.includes(cert.id))
                .map((cert) => (
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

            {/* Load More Button */}
            {loadedCertificates.length < certificates.length && (
              <motion.div variants={itemVariants} className="text-center mt-12">
                <motion.button
                  onClick={() => {
                    const remaining = certificates.filter(
                      (cert) => !loadedCertificates.includes(cert.id),
                    );
                    const nextBatch = remaining
                      .slice(0, isMobile ? 3 : 6)
                      .map((cert) => cert.id);
                    setLoadedCertificates((prev) => [...prev, ...nextBatch]);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg text-white font-medium transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Certificates
                </motion.button>
              </motion.div>
            )}

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
