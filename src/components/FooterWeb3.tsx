'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterWeb3 = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ainan-bahrul-ihsan/',
      icon: <FaLinkedin />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Multiverse88',
      icon: <FaGithub />,
      color: 'from-gray-700 to-slate-800',
    },
    {
      name: 'Email',
      href: 'mailto:ainanbahrul@gmail.com',
      icon: <HiMail />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ainanbahrul',
      icon: <FaTwitter />,
      color: 'from-sky-400 to-blue-500',
    }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.certificates'), href: '#certificates' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
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
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (!mounted) {
    return (
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="h-32 bg-slate-800 rounded animate-pulse" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Developer Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Floating Nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
          style={{
            left: `${10 + (i * 10)}%`,
            top: `${20 + Math.sin(i) * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">

            {/* Brand Section */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <motion.div
                  className="flex items-center space-x-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        A
                      </span>
                    </div>
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-2xl font-black bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      Ainan.dev
                    </motion.h3>
                    <p className="text-cyan-400/70 text-sm font-medium">Developer Portfolio</p>
                  </div>
                </motion.div>

                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  {t('footer.description')}
                </p>

                {/* Status */}
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-400/30"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-green-400 text-sm font-medium">{t('footer.status')}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🔗</span>
                {t('footer.quickLinks')}
              </h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="flex text-gray-300 hover:text-cyan-400 transition-colors duration-300 group items-center"
                    whileHover={{ x: 5 }}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <motion.span
                      className="w-1 h-1 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🌐</span>
                {t('footer.connect')}
              </h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(6, 182, 212, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-8 h-8 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white text-sm">{social.icon}</span>
                    </motion.div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                    <motion.svg
                      className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="border-t border-slate-800/50 pt-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              {/* Copyright */}
              <motion.div
                className="flex items-center space-x-4 text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm">
                  © {currentYear} Ainan Bahrul Ihsan. {t('footer.copyright')}
                </p>
                <motion.div
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-400 text-sm">{t('footer.builtWith')}</p>
                <div className="flex items-center space-x-2">
                  {[
                    { name: 'Next.js', color: 'text-white' },
                    { name: 'TypeScript', color: 'text-blue-400' },
                    { name: 'Framer Motion', color: 'text-purple-400' },
                    { name: 'Tailwind CSS', color: 'text-cyan-400' }
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className={`text-xs px-2 py-1 bg-slate-800/50 rounded-full border border-slate-700/50 ${tech.color} hover:scale-110 transition-transform cursor-default`}
                      whileHover={{ y: -2 }}
                      title={tech.name}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Hash */}
            <motion.div
              className="mt-8 pt-6 border-t border-slate-800/30 text-center"
              variants={itemVariants}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/30 rounded-full border border-slate-700/50">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-gray-400 font-mono">
                  Hash: 0x{Math.random().toString(16).slice(2, 18)}...
                </span>
                <span className="text-green-400 text-xs">✓ Verified</span>
              </div>

              <motion.p
                className="text-xs text-gray-500 mt-4 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                "The future belongs to those who believe in the beauty of their dreams and the power of decentralization."
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </footer>
  );
};

export default FooterWeb3;
