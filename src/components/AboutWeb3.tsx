'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skill } from '@/types';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  HiLightningBolt, 
  HiCode, 
  HiSparkles, 
  HiGlobe 
} from 'react-icons/hi';

const AboutWeb3 = () => {
  const { t } = useTranslation();
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
    { name: 'Node.js', level: 90, category: 'backend', proficiency: 'Expert' },
    { name: 'Google Cloud Platform', level: 85, category: 'tools', proficiency: 'Advanced' },
    { name: 'React', level: 88, category: 'frontend', proficiency: 'Expert' },
    { name: 'Next.js', level: 85, category: 'frontend', proficiency: 'Advanced' },
    { name: 'Sequelize', level: 82, category: 'database', proficiency: 'Advanced' },
    { name: 'JavaScript', level: 90, category: 'frontend', proficiency: 'Expert' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend', proficiency: 'Expert' },
    { name: 'API Development', level: 85, category: 'backend', proficiency: 'Advanced' },
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
        duration: 0.6
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
          <div className="grid grid-cols-2 gap-12">
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
      {/* Enhanced Background Pattern */}
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
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          style={{
            left: `${10 + (i * 25)}%`,
            top: `${20 + Math.sin(i) * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('about.title')}
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column - About Text & Stats */}
            <motion.div variants={itemVariants} className="space-y-8">

              {/* About Description */}
              <div className="space-y-6">
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  {t('about.description.paragraph1')}
                </motion.p>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  {t('about.description.paragraph2')}
                </motion.p>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  {t('about.description.paragraph3')}
                </motion.p>
              </div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { number: "3+", label: t('about.stats.experience'), icon: <HiLightningBolt className="w-6 h-6" /> },
                  { number: "50+", label: t('about.stats.projects'), icon: <HiCode className="w-6 h-6" /> },
                  { number: "100%", label: t('about.stats.satisfaction'), icon: <HiSparkles className="w-6 h-6" /> },
                  { number: "24/7", label: t('about.stats.availability'), icon: <HiGlobe className="w-6 h-6" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="portfolio-glass rounded-xl p-6 text-center border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group"
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.15)"
                    }}
                    variants={itemVariants}
                  >
                    <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Profile & Skills */}
            <motion.div variants={itemVariants} className="space-y-8">

              {/* Profile Card */}
              <motion.div
                className="portfolio-glass rounded-2xl p-6 border border-cyan-500/20 group"
                whileHover={{
                  borderColor: "rgba(6, 182, 212, 0.4)",
                  boxShadow: "0 10px 30px rgba(6, 182, 212, 0.1)"
                }}
                variants={itemVariants}
              >
                <div className="text-center">
                  <motion.div
                    className="relative w-32 h-32 mx-auto mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1"
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900">
                        <Image
                          src="/images/ainan-profile.jpg"
                          alt="Ainan Bahrul Ihsan"
                          fill
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'https://github.com/Multiverse88.png';
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{t('about.profile.name')}</h3>
                  <p className="text-cyan-400 font-medium mb-2">{t('about.profile.role')}</p>
                  <p className="text-gray-400 text-sm">{t('about.profile.university')}</p>
                </div>
              </motion.div>

              {/* Technical Skills Section */}
              <motion.div
                variants={itemVariants}
                className="portfolio-glass rounded-2xl p-6 border border-cyan-500/20"
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">�</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t('about.skills.title')}
                  </h3>
                </div>

                <div className="space-y-5">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-bold text-sm">
                          {skill.proficiency}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden group-hover:bg-gray-700/70 transition-colors">
                        <div className="flex items-center justify-center h-full space-x-1 px-2">
                          {[...Array(5)].map((_, starIndex) => {
                            const filled = starIndex < Math.ceil((skill.level / 100) * 5);
                            return (
                              <motion.div
                                key={starIndex}
                                className={`w-2 h-2 rounded-full ${
                                  filled 
                                    ? `bg-gradient-to-r ${getSkillColor(skill.category)}` 
                                    : 'bg-gray-600'
                                }`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.1 + starIndex * 0.05,
                                }}
                                viewport={{ once: true }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Skills Footer */}
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-700/50"
                  variants={itemVariants}
                >
                  <p className="text-gray-400 text-sm text-center">
                    Skills rated by proficiency level: Beginner → Expert
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWeb3;
