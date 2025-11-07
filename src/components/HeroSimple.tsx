'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HeroSimple = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="home" className="min-h-screen bg-gradient-to-br from-[#9ECAD6]/10 via-white to-[#58A0C8]/10 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 bg-gray-200 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-[#9ECAD6]/10 via-white to-[#58A0C8]/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#58A0C8]/20 to-[#9ECAD6]/20 rounded-full filter blur-2xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#34699A]/20 to-[#113F67]/20 rounded-full filter blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-16 md:py-20">
          {/* Text Content */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-3 md:px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium">
                <span className="w-2 h-2 bg-[#58A0C8] rounded-full mr-2" />
                Hello, I'm
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-black leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
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
              className="space-y-3 md:space-y-4"
            >
              <h2 className="font-bold text-gray-700 text-lg md:text-xl lg:text-2xl">
                Full Stack Developer & Cloud Computing Enthusiast
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-xl">
                I create beautiful and functional digital experiences using modern technologies.
                Passionate about clean code, elegant design, and solving complex problems.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 md:gap-8"
            >
              {[
                { number: "3+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#113F67] to-[#34699A] bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#34699A] to-[#113F67] text-white rounded-xl md:rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Work Together
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-[#9ECAD6] text-[#113F67] rounded-xl md:rounded-2xl font-bold hover:border-[#58A0C8] hover:bg-[#9ECAD6]/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center space-y-6">
                  {/* Profile Image */}
                  <motion.div
                    className="relative w-28 h-28 md:w-32 md:h-32 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/images/ainan-profile.jpg"
                      alt="Ainan Bahrul Ihsan - Full Stack Developer"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-center rounded-2xl shadow-lg border-4 border-white"
                      onError={(e) => {
                        e.currentTarget.src = 'https://github.com/Multiverse88.png';
                      }}
                      priority
                    />

                    {/* Online Status */}
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg" />
                  </motion.div>

                  {/* Card Info */}
                  <div className="space-y-3">
                    <h3 className="font-black text-xl md:text-2xl text-gray-900">
                      Creative Developer
                    </h3>
                    <p className="text-gray-600 text-sm max-w-xs mx-auto">
                      Turning ideas into beautiful, functional digital experiences
                    </p>

                    {/* Skills Icons */}
                    <div className="flex justify-center space-x-3">
                      {["⚛️", "🚀", "🎨", "💻"].map((icon, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <span className="text-base md:text-lg">{icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3D Shadow Effect - desktop only */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl -z-10 transform translate-x-4 translate-y-4 opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div
          className="flex flex-col items-center space-y-2 cursor-pointer group"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center group-hover:border-[#3B82F6] transition-colors">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full mt-2 group-hover:bg-[#3B82F6]"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSimple;
