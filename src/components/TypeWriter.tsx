'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
}

const TypeWriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  className = '',
  cursorClassName = '',
  loop = true
}: TypeWriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        if (loop || currentWordIndex < words.length - 1) {
          setIsDeleting(true);
        }
      }, delayBetweenWords);

      return () => clearTimeout(waitTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Finished typing current word
          setIsWaiting(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting
          setIsDeleting(false);
          setCurrentWordIndex((prev) => {
            if (loop) {
              return (prev + 1) % words.length;
            } else {
              return Math.min(prev + 1, words.length - 1);
            }
          });
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isWaiting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop
  ]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-reveal">
        {currentText}
      </span>
      <motion.span
        className={`inline-block w-1 ml-1 bg-current ${cursorClassName}`}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      >
        |
      </motion.span>
    </span>
  );
};

// Preset configurations
export const TypeWriterPresets = {
  fast: {
    typeSpeed: 50,
    deleteSpeed: 30,
    delayBetweenWords: 1500
  },
  normal: {
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000
  },
  slow: {
    typeSpeed: 150,
    deleteSpeed: 75,
    delayBetweenWords: 3000
  }
};

// Alternative TypeWriter with character-by-character animation
export const AnimatedTypeWriter = ({
  text,
  delay = 0,
  speed = 50,
  className = ''
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + (index * speed) / 1000,
            duration: 0.3
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypeWriter;
