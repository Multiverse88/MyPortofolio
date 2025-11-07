"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import TypeWriter from "./TypeWriter";

const HeroEnhanced = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    window.addEventListener("resize", checkMobile);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "AWS", "GCP"];
  const roles = [
    "Full Stack Developer",
    "Cloud Architect",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  if (!mounted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-8 bg-gray-700 rounded animate-pulse" />
              <div className="h-16 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 bg-gray-700 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
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
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center"
            >
              <motion.div
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-white/10"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.4)",
                    "0 0 40px rgba(34, 197, 94, 0.2)",
                    "0 0 20px rgba(34, 197, 94, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full mr-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white/90 text-sm font-medium">
                  Available for work
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
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
                  Hi, I'm
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Ainan Bahrul
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Ihsan
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Animated Subtitle */}
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
                I craft exceptional digital experiences using cutting-edge
                technologies. Passionate about creating scalable solutions that
                make a difference.
              </motion.p>
            </motion.div>

            {/* Animated Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full border border-white/20 cursor-default"
                  initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{
                    delay: 1.5 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderColor: "rgba(6, 182, 212, 0.5)",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="grid grid-cols-2 gap-8 max-w-md"
            >
              {[
                {
                  number: "3+",
                  label: "Years Experience",
                  color: "from-blue-400 to-cyan-400",
                },
                {
                  number: "50+",
                  label: "Projects Done",
                  color: "from-purple-400 to-pink-400",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 1.5,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
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
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold overflow-hidden shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
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
                  Let's Collaborate
                  <motion.span
                    className="ml-2 text-xl"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-2xl font-bold backdrop-blur-sm transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(6, 182, 212, 0.6)",
                  backgroundColor: "rgba(6, 182, 212, 0.1)",
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  View Portfolio
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

          {/* Right Content - 3D Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl"
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
                    {/* Glowing Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-2">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src="/images/ainan-profile.jpg"
                            alt="Ainan Bahrul Ihsan"
                            fill
                            className="object-cover object-center"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://github.com/Multiverse88.png";
                            }}
                            priority
                          />

                          {/* Holographic Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                            animate={{
                              x: [-100, 100],
                              opacity: [0, 0.8, 0],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Status Indicator */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg cursor-pointer"
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
                      title="Available for work"
                    />
                  </motion.div>

                  {/* Profile Info */}
                  <div className="space-y-4">
                    <motion.h3
                      className="font-black text-2xl text-white"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                    >
                      Creative Developer
                    </motion.h3>

                    <motion.p
                      className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Crafting digital experiences that inspire and innovate
                    </motion.p>

                    {/* Tech Stack Icons */}
                    <div className="flex justify-center space-x-3 pt-2">
                      {[
                        {
                          icon: "⚛️",
                          name: "React",
                          color: "from-blue-400 to-cyan-400",
                        },
                        {
                          icon: "🚀",
                          name: "Next.js",
                          color: "from-purple-400 to-pink-400",
                        },
                        {
                          icon: "☁️",
                          name: "Cloud",
                          color: "from-green-400 to-blue-400",
                        },
                        {
                          icon: "💎",
                          name: "Premium",
                          color: "from-yellow-400 to-orange-400",
                        },
                      ].map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className={`w-10 h-10 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden`}
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
                          <span className="text-lg relative z-10">
                            {tech.icon}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-lg"
                  animate={{
                    x: [0, -15, 0],
                    rotate: [360, 180, 0],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 0.5, 1],
                    y: [0, -10, 0],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl filter blur-xl -z-10"
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

      {/* Scroll Indicator */}
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
          <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/60 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full mt-2 group-hover:bg-white/80"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroEnhanced;
