'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeaderWeb3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Experience', href: '#experience', icon: '⚡' },
    { name: 'Certificates', href: '#certificates', icon: '🎓' },
    { name: 'Projects', href: '#projects', icon: '🚀' },
    { name: 'Contact', href: '#contact', icon: '📧' },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="h-8 w-32 bg-gray-700 rounded animate-pulse" />
            <div className="hidden md:flex space-x-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Web3 Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10'
            : 'bg-slate-900/80 backdrop-blur-lg'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center py-4">

            {/* Logo/Brand */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      A
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="hidden sm:block">
                <motion.h1
                  className="text-xl font-black bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Ainan.dev
                </motion.h1>
                <div className="text-xs text-cyan-400/70 font-medium">
                  Web3 Portfolio
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="group relative px-4 py-2 rounded-xl text-gray-300 font-medium transition-all duration-300 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Background glass effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* Border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)"
                    }}
                  />

                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Web3 Connect Button */}
            <motion.button
              className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#contact')}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Connect</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50 w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 flex flex-col justify-center items-center"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-5 h-0.5 bg-cyan-400 rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-cyan-400 rounded-full mt-1"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-cyan-400 rounded-full mt-1"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <motion.div
          className="relative h-full flex flex-col justify-center items-center space-y-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isOpen ? 1 : 0.8,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="group flex items-center space-x-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-cyan-500/20 text-white font-bold text-xl shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -50
              }}
              transition={{ delay: isOpen ? index * 0.1 : 0 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(6, 182, 212, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </motion.button>
          ))}

          {/* Mobile Connect Button */}
          <motion.button
            onClick={() => handleNavClick('#contact')}
            className="mt-8 px-12 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-cyan-500/25"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 50
            }}
            transition={{ delay: isOpen ? navItems.length * 0.1 : 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Connect Wallet</span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeaderWeb3;
