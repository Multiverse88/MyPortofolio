'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ainan-bahrul-ihsan/',
      icon: '💼',
      color: 'from-[#58A0C8] to-[#34699A]',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Multiverse88',
      icon: '🐙',
      color: 'from-[#113F67] to-gray-900',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: '🐦',
      color: 'from-[#9ECAD6] to-[#58A0C8]',
    },
    {
      name: 'Email',
      href: 'mailto:hello@example.com',
      icon: '✉️',
      color: 'from-[#34699A] to-[#113F67]',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#34699A] to-[#113F67] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#58A0C8] to-[#9ECAD6] rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            >
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-[#34699A] via-[#113F67] to-[#58A0C8] rounded-2xl flex items-center justify-center shadow-2xl"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <span className="text-white font-black text-xl">P</span>
                </motion.div>
                <span className="font-black text-2xl bg-gradient-to-r from-[#58A0C8] to-[#9ECAD6] bg-clip-text text-transparent">
                  Portfolio
                </span>
              </motion.div>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                Crafting digital experiences with modern technologies. 
                Let's build something amazing together.
              </p>

              <motion.div
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#34699A]/20 to-[#113F67]/20 rounded-full border border-[#58A0C8]/30"
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(52, 105, 154, 0.4)',
                    '0 0 0 10px rgba(52, 105, 154, 0)',
                    '0 0 0 0 rgba(52, 105, 154, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            >
              <h3 className="font-black text-xl mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group"
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <motion.span
                        className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg flex items-center justify-center mr-3 text-xs group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {link.name.charAt(0)}
                      </motion.span>
                      {link.name}
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            >
              <h3 className="font-black text-xl mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Let's Connect
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center p-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300 group-hover:shadow-xl">
                      <motion.div 
                        className={`w-8 h-8 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center mr-3 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-sm">{social.icon}</span>
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors">
                          {social.name}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div 
                className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-blue-300 text-sm font-medium mb-2">💡 Fun Fact</p>
                <p className="text-gray-300 text-sm">
                  I respond to messages within 24 hours and love discussing new project ideas!
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          />

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} Portfolio. All rights reserved.
              </p>
              <motion.span 
                className="text-gray-500 text-xs px-3 py-1 bg-gray-800 rounded-full border border-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                Made with ❤️ & ☕
              </motion.span>
            </div>
            
            <motion.div 
              className="flex items-center space-x-2 text-gray-400 text-sm"
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Built with</span>
              <motion.span 
                className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                Next.js
              </motion.span>
              <span>&</span>
              <motion.span 
                className="font-semibold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                Framer Motion
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-40"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-2 h-2 bg-pink-400 rounded-full opacity-50"
        animate={{ 
          x: [0, 10, 0],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </footer>
  );
};

export default Footer;
