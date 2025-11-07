'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skill } from '@/types';
import Image from 'next/image';

const AboutWeb3 = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills: Skill[] = [
    { name: 'Node.js', level: 90, category: 'backend' },
    { name: 'Google Cloud Platform', level: 85, category: 'tools' },
    { name: 'React', level: 88, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'Sequelize', level: 82, category: 'database' },
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend' },
    { name: 'API Development', level: 85, category: 'backend' },
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

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'from-cyan-400 to-blue-500';
      case 'backend': return 'from-purple-400 to-pink-500';
      case 'database': return 'from-green-400 to-emerald-500';
      case 'tools': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 bg-slate-700 rounded mb-8 animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 bg-slate-700 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-64 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Web3 Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + Math.sin(i) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
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
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">

              {/* Main Text */}
              <div className="space-y-4">
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  I'm a passionate Full Stack Developer with over 3 years of experience
                  creating innovative web applications and cloud solutions. My journey in
                  technology started with curiosity and has evolved into expertise across
                  multiple platforms and frameworks.
                </motion.p>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  Currently pursuing my studies in Informatics Engineering at Universitas
                  Pasundan, I combine academic knowledge with practical experience to deliver
                  cutting-edge solutions. My expertise spans from frontend development with
                  React and Next.js to backend systems with Node.js and cloud deployment
                  on Google Cloud Platform.
                </motion.p>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  I'm passionate about learning new technologies and constantly pushing
                  the boundaries of what's possible in web development. My goal is to
                  create meaningful digital experiences that make a positive impact.
                </motion.p>
              </div>

              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 pt-6"
              >
                {[
                  { number: "3+", label: "Years Experience", icon: "⚡" },
                  { number: "50+", label: "Projects Done", icon: "🚀" },
                  { number: "100%", label: "Client Satisfaction", icon: "💎" },
                  { number: "24/7", label: "Availability", icon: "🌐" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="web3-glass rounded-xl p-4 text-center border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)"
                    }}
                    variants={itemVariants}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Profile & Skills */}
            <motion.div variants={itemVariants} className="space-y-8">

              {/* Profile Card */}
              <motion.div
                className="web3-glass rounded-2xl p-6 border border-cyan-500/20"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(6, 182, 212, 0.4)"
                }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="relative w-32 h-32 mx-auto mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900">
                        <Image
                          src="/images/ainan-profile.jpg"
                          alt="Ainan Bahrul Ihsan"
                          fill
                          className="object-cover object-center"
                          onError={(e) => {
                            e.currentTarget.src = 'https://github.com/Multiverse88.png';
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">Ainan Bahrul Ihsan</h3>
                  <p className="text-cyan-400 font-medium">Full Stack Developer</p>
                  <p className="text-gray-400 text-sm mt-2">Universitas Pasundan | Informatics Engineering</p>
                </div>
              </motion.div>

              {/* Skills Section */}
              <motion.div
                variants={itemVariants}
                className="web3-glass rounded-2xl p-6 border border-cyan-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">🛠️</span>
                  Technical Skills
                </h3>

                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
                      </div>

                      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getSkillColor(skill.category)} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 1,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        />

                        {/* Glow Effect */}
                        <motion.div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getSkillColor(skill.category)} rounded-full opacity-50 blur-sm`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 1,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWeb3;
