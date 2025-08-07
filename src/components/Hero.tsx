'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-[#9ECAD6]/10 via-white to-[#58A0C8]/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-60">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#58A0C8]/30 to-[#9ECAD6]/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#34699A]/30 to-[#113F67]/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <motion.span 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(52, 105, 154, 0.4)',
                    '0 0 0 10px rgba(52, 105, 154, 0)',
                    '0 0 0 0 rgba(52, 105, 154, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className="w-2 h-2 bg-[#58A0C8] rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Hello, I'm
              </motion.span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className={`font-black leading-tight ${
                isMobile ? 'text-5xl' : 'text-7xl'
              }`}>
                <span className="text-gray-900 block">Ainan</span>
                <span className="bg-gradient-to-r from-[#113F67] via-[#34699A] to-[#58A0C8] bg-clip-text text-transparent block">
                  Bahrul Ihsan
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className={`font-bold text-gray-700 ${
                isMobile ? 'text-xl' : 'text-2xl'
              }`}>
                Full Stack Developer & UI/UX Designer
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                I create beautiful and functional digital experiences using modern technologies. 
                Passionate about clean code, elegant design, and solving complex problems.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { number: '3+', label: 'Years Experience' },
                { number: '50+', label: 'Projects Completed' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="text-3xl font-black bg-gradient-to-r from-[#113F67] to-[#34699A] bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Work Together
              </motion.button>
              
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white border-2 border-[#9ECAD6] text-[#113F67] rounded-2xl font-bold hover:border-[#58A0C8] hover:bg-[#9ECAD6]/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Character Card */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            <div className="relative">
              {/* 3D Character Card */}
              <motion.div 
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8"
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: [0.25, 0.46, 0.45, 0.94] as any 
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 15,
                  rotateX: 5,
                  z: 50
                }}
              >
                {/* Character Avatar */}
                <motion.div className="text-center space-y-6">
                  {/* Face */}
                  <motion.div 
                    className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center shadow-2xl relative"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Eyes */}
                    <div className="absolute top-8 left-10 w-3 h-3 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-8 right-10 w-3 h-3 bg-gray-800 rounded-full"></div>
                    
                    {/* Smile */}
                    <motion.div 
                      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-gray-800 rounded-b-full"
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Glasses */}
                    <motion.div 
                      className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-8 border-4 border-gray-700 rounded-2xl bg-blue-100/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-gray-700 rounded-full"></div>
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-gray-700 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 bg-gray-700 rounded-full"></div>
                    </motion.div>

                    {/* Cap */}
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-full"
                      animate={{ rotateZ: [0, 2, 0, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full shadow-lg"></div>
                    </motion.div>
                  </motion.div>

                  {/* Character Info */}
                  <div className="space-y-4">
                    <h3 className="font-black text-2xl text-gray-900">
                      Creative Developer
                    </h3>
                    <p className="text-gray-600 text-sm max-w-xs mx-auto">
                      Turning ideas into beautiful, functional digital experiences
                    </p>
                    
                    {/* Skills Icons */}
                    <div className="flex justify-center space-x-3">
                      {['⚛️', '🚀', '🎨', '💻'].map((icon, index) => (
                        <motion.div
                          key={index}
                          className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg"
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 10, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: index * 0.2 
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <span className="text-lg">{icon}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Particles */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80"
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0.8, 0.4, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-70"
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, -8, 0],
                    opacity: [0.7, 0.3, 0.7]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 0.5, 1],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                />
              </motion.div>

              {/* 3D Shadow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl -z-10 transform translate-x-6 translate-y-6 opacity-30"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div 
          className="flex flex-col items-center space-y-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-gray-500 text-sm font-medium">Scroll Down</span>
          <motion.div 
            className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center"
            whileHover={{ borderColor: '#3B82F6' }}
          >
            <motion.div 
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
