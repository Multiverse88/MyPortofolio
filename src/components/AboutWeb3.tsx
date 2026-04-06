'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Skill } from '@/types';
import Image from 'next/image';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  HiLightningBolt, 
  HiCode, 
  HiSparkles, 
  HiGlobe 
} from 'react-icons/hi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutWeb3 = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillItemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // GSAP Animations
  useGSAP(() => {
    if (!mounted || !skillsContainerRef.current) return;

    // Animate skill cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            skillCardsRef.current.filter(Boolean),
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
          observer.unobserve(entry.target);
        }
      });
    });

    if (skillsContainerRef.current) {
      observer.observe(skillsContainerRef.current);
    }

    return () => observer.disconnect();
  }, { dependencies: [mounted] });

  // Skill item hover animations
  const handleSkillHover = (index: number, isEnter: boolean) => {
    const skillItem = skillItemsRef.current[index];
    if (!skillItem) return;

    if (isEnter) {
      gsap.to(skillItem, {
        x: 8,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(skillItem.querySelector('.skill-dot'), {
        scale: 1.6,
        duration: 0.3,
        ease: 'back.out',
      });
    } else {
      gsap.to(skillItem, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(skillItem.querySelector('.skill-dot'), {
        scale: 1,
        duration: 0.3,
        ease: 'back.out',
      });
    }
  };

  // Card hover animations
  const handleCardHover = (index: number, isEnter: boolean) => {
    const card = skillCardsRef.current[index];
    if (!card) return;

    if (isEnter) {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
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
              <div
                ref={skillsContainerRef}
                className="portfolio-glass rounded-2xl p-8 border border-cyan-500/20 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -z-0" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-0" />

                <div className="flex items-center mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {t('about.skills.title')}
                  </h3>
                </div>

                {/* Skills Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Frontend Skills */}
                  <div
                    ref={(el) => {
                      if (el) skillCardsRef.current[0] = el;
                    }}
                    onMouseEnter={() => handleCardHover(0, true)}
                    onMouseLeave={() => handleCardHover(0, false)}
                    className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">Fe</span>
                      </div>
                      <h4 className="font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">Frontend</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.filter(s => s.category === 'frontend').map((skill, idx) => (
                        <div
                          key={skill.name}
                          ref={(el) => {
                            if (el) skillItemsRef.current[idx] = el;
                          }}
                          onMouseEnter={() => handleSkillHover(idx, true)}
                          onMouseLeave={() => handleSkillHover(idx, false)}
                          className="flex items-center group/item cursor-pointer"
                        >
                          <div 
                            className="skill-dot w-2 h-2 rounded-full bg-cyan-400 mr-3"
                          />
                          <span className="text-gray-300 group-hover/item:text-cyan-300 transition-all text-sm">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backend Skills */}
                  <div
                    ref={(el) => {
                      if (el) skillCardsRef.current[1] = el;
                    }}
                    onMouseEnter={() => handleCardHover(1, true)}
                    onMouseLeave={() => handleCardHover(1, false)}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">Be</span>
                      </div>
                      <h4 className="font-bold text-purple-300 group-hover:text-purple-200 transition-colors">Backend</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.filter(s => s.category === 'backend').map((skill, idx) => (
                        <div
                          key={skill.name}
                          ref={(el) => {
                            if (el) skillItemsRef.current[idx + 10] = el;
                          }}
                          onMouseEnter={() => handleSkillHover(idx + 10, true)}
                          onMouseLeave={() => handleSkillHover(idx + 10, false)}
                          className="flex items-center group/item cursor-pointer"
                        >
                          <div 
                            className="skill-dot w-2 h-2 rounded-full bg-purple-400 mr-3"
                          />
                          <span className="text-gray-300 group-hover/item:text-purple-300 transition-all text-sm">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Database Skills */}
                  <div
                    ref={(el) => {
                      if (el) skillCardsRef.current[2] = el;
                    }}
                    onMouseEnter={() => handleCardHover(2, true)}
                    onMouseLeave={() => handleCardHover(2, false)}
                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">Db</span>
                      </div>
                      <h4 className="font-bold text-green-300 group-hover:text-green-200 transition-colors">Database</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.filter(s => s.category === 'database').map((skill, idx) => (
                        <div
                          key={skill.name}
                          ref={(el) => {
                            if (el) skillItemsRef.current[idx + 20] = el;
                          }}
                          onMouseEnter={() => handleSkillHover(idx + 20, true)}
                          onMouseLeave={() => handleSkillHover(idx + 20, false)}
                          className="flex items-center group/item cursor-pointer"
                        >
                          <div 
                            className="skill-dot w-2 h-2 rounded-full bg-green-400 mr-3"
                          />
                          <span className="text-gray-300 group-hover/item:text-green-300 transition-all text-sm">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Platforms */}
                  <div
                    ref={(el) => {
                      if (el) skillCardsRef.current[3] = el;
                    }}
                    onMouseEnter={() => handleCardHover(3, true)}
                    onMouseLeave={() => handleCardHover(3, false)}
                    className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">Tl</span>
                      </div>
                      <h4 className="font-bold text-orange-300 group-hover:text-orange-200 transition-colors">Tools</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.filter(s => s.category === 'tools').map((skill, idx) => (
                        <div
                          key={skill.name}
                          ref={(el) => {
                            if (el) skillItemsRef.current[idx + 30] = el;
                          }}
                          onMouseEnter={() => handleSkillHover(idx + 30, true)}
                          onMouseLeave={() => handleSkillHover(idx + 30, false)}
                          className="flex items-center group/item cursor-pointer"
                        >
                          <div 
                            className="skill-dot w-2 h-2 rounded-full bg-orange-400 mr-3"
                          />
                          <span className="text-gray-300 group-hover/item:text-orange-300 transition-all text-sm">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWeb3;
