'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { type Experience as ExperienceType } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';

const ExperienceWeb3 = () => {
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

  const experiences: ExperienceType[] = [
    {
      id: 1,
      company: t('experience.positions.labAssistant.company'),
      position: t('experience.positions.labAssistant.title'),
      duration: t('experience.positions.labAssistant.duration'),
      description: t('experience.positions.labAssistant.description'),
      technologies: t('experience.positions.labAssistant.technologies')
    },
    {
      id: 2,
      company: t('experience.positions.bangkit.company'),
      position: t('experience.positions.bangkit.title'),
      duration: t('experience.positions.bangkit.duration'),
      description: t('experience.positions.bangkit.description'),
      technologies: t('experience.positions.bangkit.technologies')
    },
    {
      id: 3,
      company: t('experience.positions.teaching.company'),
      position: t('experience.positions.teaching.title'),
      duration: t('experience.positions.teaching.duration'),
      description: t('experience.positions.teaching.description'),
      technologies: t('experience.positions.teaching.technologies')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 bg-slate-700 rounded mb-8 animate-pulse" />
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Developer Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Blockchain Nodes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 border-2 border-purple-400/40 rounded-full"
          style={{
            left: `${15 + (i * 18)}%`,
            top: `${25 + Math.cos(i) * 20}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.7,
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
              className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {t('experience.title')}
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-4 md:left-1/2 transform ${
                      index % 2 === 0 ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'
                    } -translate-x-1/2 z-10`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 border-4 border-slate-900"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(6, 182, 212, 0.7)",
                          "0 0 0 10px rgba(6, 182, 212, 0)",
                          "0 0 0 0 rgba(6, 182, 212, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`portfolio-glass rounded-2xl p-6 border border-cyan-500/20 w-full md:w-5/12 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(6, 182, 212, 0.4)",
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <motion.div
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-400/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-cyan-400 text-sm font-bold">{exp.duration}</span>
                        </motion.div>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-green-400"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                      <h4 className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {exp.company}
                      </h4>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"
                            animate={{
                              boxShadow: [
                                "0 0 0 0 rgba(6, 182, 212, 0.4)",
                                "0 0 0 4px rgba(6, 182, 212, 0)",
                                "0 0 0 0 rgba(6, 182, 212, 0)"
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          />
                          <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded-full border border-cyan-500/30 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(6, 182, 212, 0.2)",
                            borderColor: "rgba(6, 182, 212, 0.6)"
                          }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-full border border-cyan-400/30 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(6, 182, 212, 0.1)",
                borderColor: "rgba(6, 182, 212, 0.5)"
              }}
            >
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyan-100 font-medium">Ready for new opportunities</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceWeb3;
