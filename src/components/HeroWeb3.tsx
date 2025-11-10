'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import TypeWriter from './TypeWriter';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiMongodb 
} from 'react-icons/si';

const HeroWeb3 = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
      {/* Language Switcher - Desktop */}
      {!isMobile && (
        <div className="absolute top-6 right-6 z-50">
          <LanguageSwitcher variant="header" />
        </div>
      )}
      
      {/* Developer Animated Background */}
      <div className="absolute inset-0">
        {/* Blockchain Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Blockchain Nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 border-2 border-cyan-400/60 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="devGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d="M100,200 Q300,100 500,150 T900,120"
            stroke="url(#devGradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-16 md:py-20">

          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Developer Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center"
            >
              <motion.div
                className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.4)",
                    "0 0 40px rgba(6, 182, 212, 0.2)",
                    "0 0 20px rgba(6, 182, 212, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full mr-3"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.7)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-cyan-100 text-sm font-medium">
                  {t('hero.status.connected')}
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading with Blockchain Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.h1
                className={`font-black leading-tight ${
                  isMobile ? "text-4xl sm:text-5xl" : "text-6xl lg:text-7xl"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.span
                  className="block text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {t('hero.greeting')}
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    opacity: { delay: 0.7, duration: 0.8 },
                    x: { delay: 0.7, duration: 0.8 },
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Ainan Bahrul
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Ihsan
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* TypeWriter with Developer Roles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="space-y-4"
            >
              <motion.div className="overflow-hidden">
                <motion.h2
                  className={`font-bold text-cyan-300 ${
                    isMobile ? "text-xl" : "text-2xl lg:text-3xl"
                  }`}
                >
                  <TypeWriter
                    words={roles}
                    typeSpeed={80}
                    deleteSpeed={60}
                    delayBetweenWords={2500}
                    className="min-h-[1.2em] inline-block"
                    cursorClassName="text-cyan-300"
                  />
                </motion.h2>
              </motion.div>

              <motion.p
                className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                {t('hero.description')}
              </motion.p>
            </motion.div>

            {/* Tech Skills with Modern Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-slate-800/80 backdrop-blur-sm text-cyan-100 text-sm rounded-full border border-cyan-400/30 cursor-default"
                  initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{
                    delay: 1.5 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(6, 182, 212, 0.2)",
                    borderColor: "rgba(6, 182, 212, 0.6)",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Developer Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="grid grid-cols-3 gap-6 max-w-lg"
            >
              {[
                { number: "3+", label: t('hero.stats.years'), color: "from-cyan-400 to-blue-400" },
                { number: "50+", label: t('hero.stats.projects'), color: "from-purple-400 to-pink-400" },
                { number: "∞", label: t('hero.stats.possibilities'), color: "from-green-400 to-cyan-400" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{
                      scale: [1, 1.05, 1],
                      textShadow: [
                        "0 0 0px rgba(6, 182, 212, 0)",
                        "0 0 20px rgba(6, 182, 212, 0.5)",
                        "0 0 0px rgba(6, 182, 212, 0)",
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 1.5,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Project CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold overflow-hidden shadow-lg shadow-cyan-500/25"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 bg-white/20"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  🚀 {t('hero.buttons.launchProject')}
                  <motion.span
                    className="ml-2 text-lg"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 bg-transparent border-2 border-cyan-400/40 text-cyan-100 rounded-xl font-bold backdrop-blur-sm transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(6, 182, 212, 0.8)",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  📱 {t('hero.buttons.viewDapps')}
                  <motion.span
                    className="ml-2 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Developer Avatar Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              {/* Blockchain Avatar Card */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-8 shadow-2xl shadow-cyan-500/20"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  rotateY: 15,
                  rotateX: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Blockchain Hash Header */}
                <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
                <div className="text-xs text-cyan-400/70 font-mono mb-4">
                  0x7a9f...d4e2 • Block #∞
                </div>

                {/* Avatar Section */}
                <motion.div className="text-center space-y-6">
                  <motion.div
                    className="relative w-32 h-32 md:w-36 md:h-36 mx-auto"
                    whileHover={{
                      scale: 1.1,
                      rotateZ: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Hexagonal Frame */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)",
                        padding: "3px",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-full h-full rounded-2xl bg-slate-900 p-2">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src="/images/ainan-profile.jpg"
                            alt="Ainan Bahrul Ihsan - Full Stack Developer"
                            fill
                            className="object-cover object-center"
                            onError={(e) => {
                              e.currentTarget.src = "https://github.com/Multiverse88.png";
                            }}
                            priority
                          />

                          {/* Blockchain Scan Lines */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                            animate={{
                              y: [-100, 200],
                              opacity: [0, 0.8, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Blockchain Status */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-xl border-4 border-slate-900 shadow-lg cursor-pointer flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.7)",
                          "0 0 0 15px rgba(34, 197, 94, 0)",
                          "0 0 0 0 rgba(34, 197, 94, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{
                        scale: 1.3,
                        backgroundColor: "#10b981",
                      }}
                      title="Mainnet Active"
                    >
                      <span className="text-xs">⛓️</span>
                    </motion.div>
                  </motion.div>

                  {/* Profile Info */}
                  <div className="space-y-4">
                    <motion.h3
                      className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      Full Stack Developer
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Decentralizing the web, one smart contract at a time
                    </motion.p>

                    {/* Blockchain Tech Stack */}
                    <div className="flex justify-center space-x-2 pt-2">
                      {[
                        { icon: <SiReact />, name: "React", color: "from-blue-400 to-cyan-400" },
                        { icon: <SiNodedotjs />, name: "Node.js", color: "from-green-400 to-emerald-400" },
                        { icon: <SiTypescript />, name: "TypeScript", color: "from-blue-500 to-indigo-500" },
                        { icon: <SiMongodb />, name: "MongoDB", color: "from-green-500 to-teal-500" },
                      ].map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className={`w-10 h-10 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden border border-white/10`}
                          initial={{ scale: 0, rotate: -180, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{
                            delay: 2.2 + index * 0.15,
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                          }}
                          whileHover={{
                            scale: 1.25,
                            rotate: [0, -10, 10, 0],
                            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                            transition: { duration: 0.4 },
                          }}
                          whileTap={{ scale: 0.9 }}
                          title={tech.name}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20 opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="text-lg font-bold relative z-10 text-white">
                            {tech.icon}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Blockchain Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-6 h-6 border-2 border-cyan-400 rounded-lg rotate-45"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [45, 225, 405],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-4 h-4 bg-purple-500 rounded-full"
                  animate={{
                    x: [0, -15, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-6 w-3 h-3 border border-pink-400 rotate-45"
                  animate={{
                    rotate: [45, 405],
                    y: [0, -10, 0],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />

                {/* Hash Footer */}
                <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
                <div className="absolute bottom-1 left-4 text-xs text-cyan-400/50 font-mono">
                  {t('hero.status.verified')}
                </div>
              </motion.div>

              {/* Blockchain Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl filter blur-xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Developer Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-cyan-300 text-sm font-medium group-hover:text-white transition-colors">
            {t('hero.scroll')}
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center group-hover:border-cyan-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-2 bg-cyan-400/80 rounded-full mt-2 group-hover:bg-cyan-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroWeb3;
