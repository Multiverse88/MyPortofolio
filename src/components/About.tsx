'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Skill } from '@/types';

const About = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

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

  // iOS-style animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as any, // iOS cubic-bezier
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any, // iOS easing
        type: "spring" as any,
        stiffness: 100,
        damping: 20
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
        type: "spring" as any,
        stiffness: 120,
        damping: 25
      },
    },
  };

  const skillBarVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0
    },
    visible: (level: number) => ({
      scaleX: level / 100,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
        delay: 0.2
      }
    })
  };

  return (
    <section id="about" className="pt-32 pb-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className={`grid gap-16 items-center ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            
            {/* Profile Card - Left Side */}
            <motion.div
              variants={cardVariants}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#34699A] to-[#113F67] rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="bg-white rounded-2xl p-8 text-center">
                  
                  {/* 3D Avatar */}
                  <motion.div 
                    className="mx-auto mb-6 w-32 h-32 bg-gradient-to-br from-[#58A0C8] to-[#34699A] rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 15,
                      scale: 1.05,
                      transition: { duration: 0.5 }
                    }}
                    style={{ 
                      perspective: 1000,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* 3D Character Representation */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full mb-2 relative">
                        {/* Face */}
                        <div className="absolute top-3 left-4 w-3 h-3 bg-white rounded-full"></div>
                        <div className="absolute top-3 right-4 w-3 h-3 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white rounded-full"></div>
                      </div>
                      {/* Cap */}
                      <div className="absolute -top-2 left-2 w-16 h-8 bg-green-400 rounded-full"></div>
                      {/* Glasses */}
                      <div className="absolute top-6 left-3 w-14 h-6 border-4 border-orange-600 rounded-full opacity-60"></div>
                    </div>
                  </motion.div>
                  
                  {/* Name and Title */}
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.2, duration: 0.6 }
                    }}
                  >
                    AINAN BAHRUL IHSAN
                  </motion.h3>
                  
                  <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-4"></div>
                  
                  <motion.p 
                    className="text-lg font-semibold text-gray-700 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.3, duration: 0.6 }
                    }}
                  >
                    FULL STACK DEVELOPER & CLOUD ENTHUSIAST
                  </motion.p>
                  
                  {/* Social Links */}
                  <motion.div 
                    className="flex justify-center gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.4, duration: 0.6 }
                    }}
                  >
                    <span className="text-sm text-gray-600 mr-2">Follow On</span>
                    <motion.a 
                      href="#" 
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                        <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Content - Right Side */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Main Heading */}
              <div>
                <motion.h1 
                  className={`font-black text-gray-900 mb-4 ${
                    isMobile ? 'text-4xl' : 'text-6xl'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }
                  }}
                >
                  HELLO<br />
                  EVERYONE
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }
                  }}
                >
                  Here's Who I am & What I do.
                </motion.p>
                
                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-4 mb-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }
                  }}
                >
                  <motion.button 
                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    RESUME
                  </motion.button>
                  <motion.button 
                    className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PROJECTS
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Description */}
              <motion.div 
                className="space-y-4 text-gray-600 leading-relaxed"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }
                }}
              >
                <p>
                  I'm an <span className="font-semibold text-gray-800">Informatics student</span> with a strong passion for <span className="font-semibold text-gray-800">Cloud Computing</span> and full-stack development. 
                  As a graduate of <span className="font-semibold text-[#34699A]">Bangkit Academy 2024</span> led by Google, Tokopedia, Gojek, and Traveloka, 
                  I've gained hands-on experience in modern cloud technologies and backend development.
                </p>
                <p>
                  I specialize in building scalable web applications using <span className="font-semibold text-gray-800">Node.js, React, and Next.js</span>, 
                  with expertise in cloud infrastructure management using <span className="font-semibold text-[#34699A]">Google Cloud Platform</span>. 
                  My experience includes developing APIs, managing databases with Sequelize, and creating responsive user interfaces.
                </p>
                <p>
                  Currently serving as a <span className="font-semibold text-gray-800">Lab Assistant and Teaching Assistant</span> at UNPAS, 
                  I enjoy sharing knowledge and helping fellow students understand web technologies and programming concepts.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
