'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

const projects = [
  {
    id: 1,
    title: "Dental Pro - Healthcare Management System",
    description: "A comprehensive dental clinic management system built with Next.js and modern technologies, featuring patient management, appointment scheduling, treatment tracking, and administrative dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth.js"],
    githubUrl: "https://github.com/Multiverse88/dentalpro-fullstack",
    liveUrl: "https://dentalpro-fullstack.vercel.app/dashboard",
    previewUrl: "https://dentalpro-fullstack.vercel.app",
    image: null,
    featured: true,
    hasLivePreview: true,
    requiresLogin: true,
    usesJWT: true, // Menandakan bahwa website ini menggunakan JWT authentication
    iframeCompatible: false, // JWT auth tidak kompatibel dengan iframe
    loginCredentials: {
      email: "test@dentalpro.com",
      password: "password123",
      note: "⚠️ JWT Authentication Notice: This website uses JWT tokens which don't work properly in iframe preview due to security restrictions. Please use 'Open in New Tab' to access the full functionality with proper authentication."
    },
    demoUrl: "https://dentalpro-fullstack.vercel.app" // Landing page dengan demo info
  },
  {
    id: 2,
    title: "Elevate Education Platform",
    description: "An educational technology platform designed to enhance learning experiences through interactive content, progress tracking, and personalized learning paths for students and educators.",
    technologies: ["React.js", "Next.js", "GSAP", "Framer Motion", "Modern Web Standards"],
    githubUrl: "https://github.com/Multiverse88/elevate",
    liveUrl: "https://elevate-education.netlify.app/",
    previewUrl: "https://elevate-education.netlify.app/",
    image: null,
    featured: false,
    hasLivePreview: true,
    requiresLogin: false
  },
  {
    id: 3,
    title: "Tata Meubel - Furniture Workshop Website",
    description: "A professional business website for a furniture workshop specializing in custom sofa manufacturing, restoration, and repair services. Features portfolio showcase, service information, and contact integration with maps and WhatsApp.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Google Maps API", "WhatsApp Integration"],
    githubUrl: "https://github.com/Multiverse88/tata-meubel",
    liveUrl: "https://www.tata-meubel.my.id/",
    previewUrl: "https://www.tata-meubel.my.id/",
    image: null,
    featured: false,
    hasLivePreview: true,
    requiresLogin: false
  },
  {
    id: 4,
    title: "Project Detailing - Automotive Detailing Services",
    description: "A modern and professional website for automotive detailing services. Features service showcase, booking system, gallery of work, pricing information, and customer testimonials. Built with responsive design and smooth animations.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    githubUrl: "https://github.com/Multiverse88/project-detailing", // Adjust if different
    liveUrl: "https://project-detailing.vercel.app/",
    previewUrl: "https://project-detailing.vercel.app/",
    image: null,
    featured: false,
    hasLivePreview: true,
    requiresLogin: false
  }
];

const ProjectsNew = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [selectedPreview, setSelectedPreview] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState<{ [key: number]: boolean }>({});
  const [showLoginInfo, setShowLoginInfo] = useState<number | null>(null);

  return (
    <section id="projects" className="pt-12 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {t('projects.badge')}
            </motion.span>
            <h2 className={`font-black text-gray-900 mb-4 ${
              isMobile ? 'text-4xl' : 'text-6xl'
            }`}>
              {t('projects.title.featured')}<br />
              <span className="bg-gradient-to-r from-[#113F67] via-[#34699A] to-[#58A0C8] bg-clip-text text-transparent">
                {t('projects.title.projects')}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('projects.description')}
            </p>
            {/* Mobile indicator for debugging */}
            {isMobile && (
              <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg inline-block text-sm">
                📱 {t('projects.mobileActive')} - {projects.length} {t('projects.projectsToShow')}
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="space-y-12 md:space-y-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group"
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: isMobile ? 0 : index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as any
                }}
              >
                <div className={`${
                  isMobile 
                    ? 'flex flex-col space-y-6'
                    : `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`
                }`}>
                  {/* Project Image */}
                  <motion.div 
                    className={`relative ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                    whileHover={isMobile ? {} : { scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                  >
                    <div className="relative">
                      {/* 3D Card Container */}
                      <motion.div 
                        className="relative bg-white rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl overflow-hidden transform-gpu"
                        style={ isMobile ? {} : { 
                          transformStyle: 'preserve-3d',
                        }}
                        whileHover={isMobile ? {} : { 
                          rotateX: 5,
                          rotateY: index % 2 === 1 ? -10 : 10,
                          z: 50 
                        }}
                      >
                        {/* Card Header */}
                        <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="flex-1 bg-gray-100 rounded-full h-6 flex items-center px-4">
                              <span className="text-xs text-gray-500">
                                {project.liveUrl ? project.liveUrl.replace('https://', '') : 'localhost:3000'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Project Preview */}
                        <div className="aspect-video bg-gradient-to-br from-[#9ECAD6]/20 via-[#58A0C8]/20 to-[#34699A]/20 relative overflow-hidden">
                          {project.hasLivePreview && project.previewUrl ? (
                            <div className="w-full h-full relative">
                              {/* JWT Warning Overlay */}
                              {project.usesJWT && !project.iframeCompatible && (
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/90 via-orange-500/90 to-red-500/90 flex flex-col items-center justify-center z-30 text-white p-6">
                                  <motion.div
                                    className="text-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">JWT Authentication</h3>
                                    <p className="text-sm mb-4 text-white/90">
                                      This application uses JWT tokens which cannot work properly in iframe preview due to security restrictions.
                                    </p>
                                    <motion.div
                                      className="space-y-2"
                                      whileHover={{ scale: 1.02 }}
                                    >
                                      <p className="text-xs font-medium">👆 Please use "Open in New Tab" for full functionality</p>
                                    </motion.div>
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* Loading Overlay */}
                              {previewLoading[project.id] && !project.usesJWT && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                                  <motion.div 
                                    className="w-8 h-8 border-4 border-[#58A0C8] border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                </div>
                              )}
                              
                              {/* Live Preview iframe */}
                              <iframe
                                src={project.previewUrl}
                                className={`w-full h-full border-0 transition-transform duration-700 group-hover:scale-105 ${
                                  project.usesJWT && !project.iframeCompatible ? 'opacity-30 pointer-events-none' : ''
                                }`}
                                title={`${project.title} Live Preview`}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                loading="lazy"
                                onLoad={() => setPreviewLoading(prev => ({ ...prev, [project.id]: false }))}
                                onLoadStart={() => setPreviewLoading(prev => ({ ...prev, [project.id]: true }))}
                              />
                              
                              {/* Preview Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Live Indicator */}
                              <motion.div 
                                className={`absolute top-4 left-4 ${
                                  project.usesJWT && !project.iframeCompatible 
                                    ? 'bg-amber-500' 
                                    : 'bg-red-500'
                                } text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2`}
                                animate={{ 
                                  boxShadow: project.usesJWT && !project.iframeCompatible 
                                    ? ['0 0 0 0 rgba(245, 158, 11, 0.7)', '0 0 0 4px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0)']
                                    : ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 4px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span>{project.usesJWT && !project.iframeCompatible ? 'JWT AUTH' : 'LIVE'}</span>
                              </motion.div>

                              {/* Login Required Indicator */}
                              {project.requiresLogin && (
                                <motion.div 
                                  className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowLoginInfo(showLoginInfo === project.id ? null : project.id);
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  animate={{ 
                                    boxShadow: ['0 0 0 0 rgba(245, 158, 11, 0.7)', '0 0 0 4px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0)']
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>LOGIN REQUIRED</span>
                                </motion.div>
                              )}

                              {/* Login Info Popup */}
                              {showLoginInfo === project.id && project.requiresLogin && project.loginCredentials && (
                                <motion.div
                                  className="absolute top-16 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 z-30"
                                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-800 text-sm">Demo Credentials</h4>
                                    <motion.button
                                      onClick={() => setShowLoginInfo(null)}
                                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </motion.button>
                                  </div>
                                  
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                      <span className="text-gray-600">Email:</span>
                                      <code className="bg-white px-2 py-1 rounded text-[#113F67] font-mono text-xs">
                                        {project.loginCredentials.email}
                                      </code>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                      <span className="text-gray-600">Password:</span>
                                      <code className="bg-white px-2 py-1 rounded text-[#113F67] font-mono text-xs">
                                        {project.loginCredentials.password}
                                      </code>
                                    </div>
                                    {project.loginCredentials.note && (
                                      <p className="text-amber-600 text-xs mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                                        💡 {project.loginCredentials.note}
                                      </p>
                                    )}
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-[#58A0C8]">
                                      <p className="text-gray-700 text-xs">
                                        <strong>Alternative Options:</strong><br />
                                        • View source code on GitHub<br />
                                        • Check project documentation<br />
                                        • Browse homepage for more information
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {project.demoUrl && (
                                    <motion.a
                                      href={project.demoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center w-full justify-center mt-3 px-3 py-2 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                      Try Demo Version
                                    </motion.a>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          ) : project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <motion.div 
                                  className="w-20 h-20 bg-gradient-to-br from-[#34699A] to-[#113F67] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                                  whileHover={{ rotate: 360, scale: 1.1 }}
                                  transition={{ duration: 0.8 }}
                                >
                                  <span className="text-white text-3xl">
                                    {project.title.includes('E-Commerce') ? '🛒' : 
                                     project.title.includes('Task') ? '📋' : '🌤️'}
                                  </span>
                                </motion.div>
                                <p className="text-gray-500 font-medium">Preview Coming Soon</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Floating Action Buttons */}
                          <motion.div 
                            className="absolute bottom-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100"
                            initial={false}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Login Info Button */}
                            {project.requiresLogin && project.loginCredentials && (
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowLoginInfo(showLoginInfo === project.id ? null : project.id);
                                }}
                                className="w-14 h-14 bg-amber-500 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                title="View Login Credentials"
                              >
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                            )}

                            {/* Live Preview Button */}
                            {project.hasLivePreview && project.previewUrl && (
                              <motion.button
                                onClick={() => setSelectedPreview(project.id)}
                                className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                title={t('projects.tooltips.livePreview')}
                              >
                                <svg className="w-6 h-6 text-[#34699A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </motion.button>
                            )}
                            
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                title={t('projects.tooltips.openNewTab')}
                              >
                                <svg className="w-6 h-6 text-[#34699A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </motion.a>
                            )}
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                title={t('projects.tooltips.sourceCode')}
                              >
                                <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </motion.a>
                            )}
                          </motion.div>

                          {project.featured && (
                            <motion.div 
                              className="absolute top-6 left-6 bg-gradient-to-r from-[#58A0C8] to-[#34699A] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                              animate={{ 
                                boxShadow: ['0 0 0 0 rgba(52, 105, 154, 0.7)', '0 0 0 10px rgba(52, 105, 154, 0)', '0 0 0 0 rgba(52, 105, 154, 0)']
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              ⭐ {t('projects.featured')}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                      
                      {/* 3D Shadow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#58A0C8]/30 to-[#34699A]/30 rounded-3xl -z-10 transform translate-x-4 translate-y-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div 
                    className={`space-y-6 ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, x: (index % 2 === 1 ? -30 : 30) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: isMobile ? 0 : 0.2, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                  >
                    {/* Project Badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium">
                        <span className="w-2 h-2 bg-[#34699A] rounded-full mr-2 animate-pulse"></span>
                        Project #{String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>

                    {/* Title and Description */}
                    <div>
                      <h3 className={`font-black text-gray-900 mb-4 ${
                        isMobile ? 'text-2xl' : 'text-3xl'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3">{t('projects.techStack')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: isMobile ? 0 : techIndex * 0.05,
                              ease: [0.25, 0.46, 0.45, 0.94] as any
                            }}
                            whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {/* Login Info Button */}
                      {project.requiresLogin && project.loginCredentials && (
                        <motion.button
                          onClick={() => setShowLoginInfo(showLoginInfo === project.id ? null : project.id)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          {t('projects.buttons.loginInfo')}
                        </motion.button>
                      )}

                      {/* Demo Version Button */}
                      {project.requiresLogin && project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#9ECAD6] to-[#58A0C8] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t('projects.buttons.tryDemo')}
                        </motion.a>
                      )}

                      {/* Live Preview Button */}
                      {project.hasLivePreview && project.previewUrl && (
                        <motion.button
                          onClick={() => setSelectedPreview(project.id)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#58A0C8] to-[#9ECAD6] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {t('projects.buttons.livePreview')}
                        </motion.button>
                      )}
                      
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t('projects.buttons.viewLive')}
                      </motion.a>
                      
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#9ECAD6] text-[#113F67] rounded-2xl font-semibold hover:border-[#58A0C8] hover:bg-[#9ECAD6]/10 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        {t('projects.buttons.sourceCode')}
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Preview Modal */}
      {selectedPreview && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPreview(null)}
        >
          <motion.div
            className="w-full h-full max-w-7xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="font-semibold">
                  {projects.find(p => p.id === selectedPreview)?.title} - Live Preview
                </span>
                <motion.div 
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2"
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 4px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>LIVE</span>
                </motion.div>
                
                {/* Login Required Badge in Modal */}
                {projects.find(p => p.id === selectedPreview)?.requiresLogin && (
                  <motion.div 
                    className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(245, 158, 11, 0.7)', '0 0 0 4px rgba(245, 158, 11, 0)', '0 0 0 0 rgba(245, 158, 11, 0)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>LOGIN REQUIRED</span>
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Login Credentials Button in Modal */}
                {projects.find(p => p.id === selectedPreview)?.requiresLogin && projects.find(p => p.id === selectedPreview)?.loginCredentials && (
                  <motion.button
                    onClick={() => setShowLoginInfo(showLoginInfo === selectedPreview ? null : selectedPreview)}
                    className="px-4 py-2 bg-amber-500/20 rounded-lg hover:bg-amber-500/30 transition-colors text-sm font-medium flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Login Info</span>
                  </motion.button>
                )}
                
                <motion.a
                  href={projects.find(p => p.id === selectedPreview)?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open in New Tab
                </motion.a>
                <motion.button
                  onClick={() => setSelectedPreview(null)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Login Info Modal Popup */}
            {showLoginInfo === selectedPreview && projects.find(p => p.id === selectedPreview)?.requiresLogin && projects.find(p => p.id === selectedPreview)?.loginCredentials && (
              <motion.div
                className="absolute top-20 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-96 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800 text-lg">Demo Login Credentials</h4>
                  <motion.button
                    onClick={() => setShowLoginInfo(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <code className="bg-white px-3 py-2 rounded text-[#113F67] font-mono text-sm border">
                      {projects.find(p => p.id === selectedPreview)?.loginCredentials?.email}
                    </code>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Password:</span>
                    <code className="bg-white px-3 py-2 rounded text-[#113F67] font-mono text-sm border">
                      {projects.find(p => p.id === selectedPreview)?.loginCredentials?.password}
                    </code>
                  </div>
                  {projects.find(p => p.id === selectedPreview)?.loginCredentials?.note && (
                    <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                      <p className="text-amber-800 text-sm">
                        💡 <strong>Note:</strong> {projects.find(p => p.id === selectedPreview)?.loginCredentials?.note}
                      </p>
                    </div>
                  )}
                  
                  {/* JWT Authentication Warning */}
                  {projects.find(p => p.id === selectedPreview)?.usesJWT && !projects.find(p => p.id === selectedPreview)?.iframeCompatible && (
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                      <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-red-800 text-sm font-semibold mb-1">JWT Authentication Limitation</p>
                          <p className="text-red-700 text-sm leading-relaxed">
                            This application uses JWT (JSON Web Token) authentication which cannot function properly within an iframe due to browser security restrictions. The login form will redirect back to the login page because:
                          </p>
                          <ul className="text-red-700 text-sm mt-2 space-y-1 pl-4">
                            <li>• JWT tokens cannot be stored properly in iframe context</li>
                            <li>• Cross-origin authentication is blocked by browser security</li>
                            <li>• Session management requires direct browser access</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-[#58A0C8]">
                    <p className="text-gray-700 text-sm">
                      <strong>Recommended Actions:</strong><br />
                      {projects.find(p => p.id === selectedPreview)?.usesJWT && !projects.find(p => p.id === selectedPreview)?.iframeCompatible ? (
                        <>
                          • <strong>Use "Open in New Tab" button</strong> for full authentication functionality<br />
                          • Browse the homepage to understand the project structure<br />
                          • Check the GitHub repository for setup instructions<br />
                          • The iframe preview is limited due to JWT security restrictions
                        </>
                      ) : (
                        <>
                          • The demo credentials might be deactivated<br />
                          • Check the GitHub repository for current credentials<br />
                          • Try exploring the homepage for more info<br />
                          • View the source code to understand the project structure
                        </>
                      )}
                    </p>
                  </div>
                </div>
                
                {projects.find(p => p.id === selectedPreview)?.demoUrl && (
                  <div className="flex gap-2 mt-4">
                    <motion.a
                      href={projects.find(p => p.id === selectedPreview)?.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center flex-1 justify-center px-4 py-3 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Browse Homepage
                    </motion.a>
                    
                    <motion.a
                      href={projects.find(p => p.id === selectedPreview)?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center flex-1 justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </motion.a>
                  </div>
                )}
              </motion.div>
            )}

            {/* Modal Content */}
            <div className="h-full pb-16">
              {/* JWT Warning Banner in Modal */}
              {projects.find(p => p.id === selectedPreview)?.usesJWT && !projects.find(p => p.id === selectedPreview)?.iframeCompatible && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold">JWT Authentication Active</p>
                      <p className="text-sm text-white/90">Login functionality is limited in iframe. Use "Open in New Tab" for full access.</p>
                    </div>
                  </div>
                  <motion.a
                    href={projects.find(p => p.id === selectedPreview)?.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open in New Tab</span>
                  </motion.a>
                </div>
              )}
              
              <iframe
                src={projects.find(p => p.id === selectedPreview)?.previewUrl}
                className={`w-full ${
                  projects.find(p => p.id === selectedPreview)?.usesJWT && !projects.find(p => p.id === selectedPreview)?.iframeCompatible 
                    ? 'h-[calc(100%-4rem)]' // Adjusted height when banner is shown
                    : 'h-full'
                } border-0`}
                title="Live Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsNew;
