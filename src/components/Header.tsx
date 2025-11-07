'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#34699A] via-[#113F67] to-[#58A0C8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">P</span>
              </div>
              
              {/* Floating dots around logo */}
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#58A0C8] to-[#9ECAD6] rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-[#9ECAD6] to-[#58A0C8] rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
            <motion.span 
              className="font-black text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Portfolio
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94] as any
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-gray-700 hover:text-gray-900 transition-colors">
                    {item.name}
                  </span>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "80%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
              
              {/* CTA Button */}
              <motion.button
                onClick={() => handleNavClick('#contact')}
                className="ml-6 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: navItems.length * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] as any
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.button>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className="flex flex-col justify-center items-center w-5 h-5"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-5 h-0.5 bg-gray-800 rounded-full transform origin-center"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-gray-800 rounded-full transform origin-center mt-1"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-gray-800 rounded-full transform origin-center mt-1"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <motion.nav
            className="overflow-hidden"
            initial={false}
            animate={{ height: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            <motion.div 
              className="py-6 space-y-2"
              variants={{
                closed: { opacity: 0 },
                open: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                }
              }}
              animate={isOpen ? "open" : "closed"}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center w-full p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                  variants={{
                    closed: { opacity: 0, x: -20 },
                    open: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white text-sm font-bold">
                      {item.name.charAt(0)}
                    </span>
                  </motion.div>
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900">
                    {item.name}
                  </span>
                  <motion.div
                    className="ml-auto text-gray-400 group-hover:text-blue-600"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    →
                  </motion.div>
                </motion.button>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.button
                onClick={() => handleNavClick('#contact')}
                className="w-full mt-4 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl"
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  Let's Talk
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
