'use client';

import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

const Contact = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    // Show success message
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: '✉️',
      value: 'ainanbahrul@gmail.com',
      href: 'mailto:ainanbahrul@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      value: '/ainan-bahrul-ihsan',
      href: 'https://www.linkedin.com/in/ainan-bahrul-ihsan/',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'GitHub',
      icon: '🐙',
      value: '@Multiverse88',
      href: 'https://github.com/Multiverse88',
      color: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-gradient-to-r from-[#9ECAD6]/20 to-[#58A0C8]/20 rounded-full text-[#113F67] text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Let's Connect
            </motion.span>
            <h2 className={`font-black text-gray-900 mb-4 ${
              isMobile ? 'text-4xl' : 'text-6xl'
            }`}>
              GET IN<br />
              <span className="bg-gradient-to-r from-[#113F67] via-[#34699A] to-[#58A0C8] bg-clip-text text-transparent">
                TOUCH
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready to start your next project? Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as any }}
            >
              <div className="relative">
                {/* 3D Form Container */}
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50"
                  style={{ 
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{ 
                    rotateX: 2,
                    rotateY: 5,
                    z: 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                        Your Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Tell me about your project..."
                        whileFocus={{ scale: 1.02 }}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.div 
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <motion.span 
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            🚀
                          </motion.span>
                        </span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-3xl -z-10 transform translate-x-4 translate-y-4 opacity-20"></div>
              </div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as any }}
              className="space-y-8"
            >
              {/* Contact Character */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as any }}
              >
                <motion.div 
                  className="relative inline-block"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: [0.25, 0.46, 0.45, 0.94] as any 
                  }}
                >
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
                    <span className="text-6xl">📬</span>
                  </div>
                  
                  {/* Floating particles */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    animate={{ 
                      y: [0, -20, 0],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                    animate={{ 
                      y: [0, -15, 0],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mt-6 mb-2">Let's Talk!</h3>
                <p className="text-gray-600">I'm always excited to discuss new opportunities.</p>
              </motion.div>

              {/* Social Links */}
              <div className="grid gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (index * 0.1),
                      ease: [0.25, 0.46, 0.45, 0.94] as any
                    }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/80">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center shadow-lg mr-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white text-xl">{link.icon}</span>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {link.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{link.value}</p>
                      </div>
                      <motion.div
                        className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Contact */}
              <motion.div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-bold text-lg mb-2">Quick Response Guaranteed</h4>
                <p className="text-indigo-100 text-sm">
                  I typically respond to messages within 24 hours. Let's make something great together!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
