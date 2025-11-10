'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  HiMail, 
  HiOfficeBuilding, 
  HiCode,
  HiChat 
} from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactWeb3 = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    // Show success message
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <HiMail />,
      value: 'ainanbahrul@gmail.com',
      href: 'mailto:ainanbahrul@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      value: '/ainan-bahrul-ihsan',
      href: 'https://www.linkedin.com/in/ainan-bahrul-ihsan/',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      value: '@Multiverse88',
      href: 'https://github.com/Multiverse88',
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      value: '@ainanbahrul',
      href: 'https://twitter.com/ainanbahrul',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 bg-slate-700 rounded mb-8 animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-slate-700 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-64 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Developer Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '35px 35px'
          }}
        />
      </div>

      {/* Floating Contact Icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-pink-400/20 rounded-full"
          style={{
            left: `${5 + (i * 16)}%`,
            top: `${20 + Math.sin(i * 1.5) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('contact.title')}
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p
              className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mt-6"
              variants={itemVariants}
            >
              {t('contact.description')}
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="portfolio-glass rounded-2xl p-8 border border-pink-500/20"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{t('contact.form.title')}</h3>
                  <motion.div
                    className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0.4)",
                        "0 0 0 8px rgba(34, 197, 94, 0)",
                        "0 0 0 0 rgba(34, 197, 94, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-green-400 text-xs font-medium">Online</span>
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm">
                  {t('contact.form.description')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('contact.form.placeholders.name')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('contact.form.placeholders.email')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder={t('contact.form.placeholders.message')}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {t('contact.form.sending')}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      {t('contact.form.send')}
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Contact Details */}
              <motion.div
                className="portfolio-glass rounded-2xl p-8 border border-cyan-500/20"
                whileHover={{
                  borderColor: "rgba(6, 182, 212, 0.4)"
                }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                  <p className="text-gray-400">
                    I'm always open to discussing new opportunities and interesting projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📍</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-400 text-sm">Bandung, Indonesia</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">⏰</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Availability</p>
                      <p className="text-gray-400 text-sm">Mon - Fri, 9 AM - 6 PM WIB</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💬</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Response Time</p>
                      <p className="text-gray-400 text-sm">Usually within 24 hours</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="portfolio-glass rounded-2xl p-8 border border-purple-500/20"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Connect with Me</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-xl border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 group"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(168, 85, 247, 0.15)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.div
                        className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-white text-lg">{social.icon}</span>
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {social.name}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {social.value}
                        </p>
                      </div>
                      <motion.svg
                        className="w-5 h-5 text-gray-400 group-hover:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </motion.svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full border border-pink-400/30 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(236, 72, 153, 0.1)",
                borderColor: "rgba(236, 72, 153, 0.5)"
              }}
            >
              <motion.div
                className="w-4 h-4 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-pink-100 font-medium text-lg">Ready to start your next project?</span>
              <span className="text-2xl">✨</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactWeb3;
