'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import TypeWriter from './TypeWriter';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';

const HeroMobileOptimized = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = t('hero.skills') as string[];
  const roles = t('hero.roles') as string[];

  if (!mounted) {
    return (
      <section className="min-h-screen bg-slate-900 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-8 bg-slate-700 rounded animate-pulse" />
              <div className="h-16 bg-slate-700 rounded animate-pulse" />
              <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 bg-slate-700 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-slate-900"
    >
      {/* Language Switcher - Mobile */}
      {isMobile && <LanguageSwitcher variant="floating" />}
      
      {/* Simplified Background for Mobile */}
      <div className="absolute inset-0">
        {/* Simplified Grid Pattern - Only on Desktop */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
          </div>
        )}

        {/* Reduced Glowing Orbs - Lighter on Mobile */}
        <motion.div
          className={`absolute top-20 right-20 ${isMobile ? 'w-48 h-48' : 'w-96 h-96'} bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full filter blur-3xl`}
          animate={isMobile ? {} : {
            scale: [1, 1.1, 1]
          }}
          transition={isMobile ? {} : {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Reduced Floating Elements for Mobile */}
        {!isMobile && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 border border-cyan-400/40 rounded-full"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${40 + Math.sin(i) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random(),
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-16 md:py-20">

          {/* Left Content - Optimized */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status Badge - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center"
            >
              <div className="flex items-center px-3 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-cyan-400/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span className="text-cyan-100 text-sm font-medium">
                  {t('hero.status.webReady')}
                </span>
              </div>
            </motion.div>

            {/* Main Heading - Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                className={`font-black leading-tight ${
                  isMobile ? "text-3xl sm:text-4xl" : "text-5xl lg:text-6xl"
                }`}
              >
                <span className="block text-white mb-2">{t('hero.greeting')}</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Ainan Bahrul
                </span>
                <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  Ihsan
                </span>
              </h1>
            </motion.div>

            {/* TypeWriter - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <h2
                className={`font-bold text-cyan-300 ${
                  isMobile ? "text-lg" : "text-xl lg:text-2xl"
                }`}
              >
                <TypeWriter
                  words={roles}
                  typeSpeed={100}
                  deleteSpeed={80}
                  delayBetweenWords={2000}
                  className="min-h-[1.2em] inline-block"
                  cursorClassName="text-cyan-300"
                />
              </h2>

              <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-lg">
                {t('hero.description')}
              </p>
            </motion.div>

            {/* Skills - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-slate-800/60 text-cyan-100 text-sm rounded-full border border-cyan-400/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.3,
                  }}
                  whileHover={isMobile ? {} : {
                    scale: 1.05,
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats - Simplified for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 max-w-sm"
            >
              {[
                { number: "3+", label: t('hero.stats.years'), color: "from-cyan-400 to-blue-400" },
                { number: "50+", label: t('hero.stats.projects'), color: "from-purple-400 to-pink-400" },
                { number: "∞", label: t('hero.stats.possibilities'), color: "from-green-400 to-cyan-400" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={`text-xl md:text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons - Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg"
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.buttons.launchProject')}
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-transparent border border-cyan-400/40 text-cyan-100 rounded-lg font-semibold backdrop-blur-sm"
                whileHover={isMobile ? {} : {
                  borderColor: "rgba(6, 182, 212, 0.6)",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.buttons.viewWork')}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Simplified Avatar */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6 shadow-xl"
                animate={isMobile ? {} : {
                  y: [0, -5, 0],
                }}
                transition={isMobile ? {} : {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={isMobile ? {} : {
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Avatar Section */}
                <div className="text-center space-y-4">
                  <motion.div
                    className="relative w-24 h-24 md:w-28 md:h-28 mx-auto"
                    whileHover={isMobile ? {} : {
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Simple Frame */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 p-0.5">
                      <div className="w-full h-full rounded-xl bg-slate-900 p-1">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src="/images/ainan-profile.jpg"
                            alt="Ainan Bahrul Ihsan"
                            fill
                            className="object-cover object-center"
                            onError={(e) => {
                              e.currentTarget.src = "https://github.com/Multiverse88.png";
                            }}
                            priority
                            sizes="(max-width: 768px) 96px, 112px"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-lg border-2 border-slate-900 flex items-center justify-center">
                      <span className="text-xs">⛓️</span>
                    </div>
                  </motion.div>

                  {/* Profile Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Full Stack Developer
                    </h3>

                    <p className="text-gray-300 text-sm max-w-xs mx-auto">
                      {t('hero.description').split('.')[0]}
                    </p>

                    {/* Simplified Tech Stack */}
                    <div className="flex justify-center space-x-2 pt-2">
                      {[
                        { icon: "₿", name: "Bitcoin" },
                        { icon: "Ξ", name: "Ethereum" },
                        { icon: "◎", name: "Solana" },
                        { icon: "�", name: "Frontend" },
                      ].map((tech, index) => (
                        <div
                          key={tech.name}
                          className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                          title={tech.name}
                        >
                          {tech.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simplified Scroll Indicator */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-cyan-300 text-sm">{t('hero.scrollSimple')}</span>
            <div className="w-5 h-8 border border-cyan-400/60 rounded-full flex justify-center">
              <motion.div
                className="w-0.5 h-2 bg-cyan-400/80 rounded-full mt-1"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroMobileOptimized;