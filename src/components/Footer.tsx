import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useState, useRef } from 'react';

const Footer = () => {
  const [showCreator, setShowCreator] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/gokul-s05', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gokuls05', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/gocool.05', label: 'Instagram' },
  ];

  const handleCopyrightClick = () => {
    setShowCreator(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowCreator(false);
    }, 2000);
  };

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="relative text-muted-foreground text-sm mb-4 md:mb-0">
            <button
              onClick={handleCopyrightClick}
              className="cursor-pointer hover:text-primary transition-colors"
              aria-label="Creator information"
            >
              ©
            </button>{' '}
            2026 Gokul's Portfolio. All rights reserved.

            <AnimatePresence>
              {showCreator && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-8 left-0 px-3 py-2 text-xs bg-black text-white rounded-md shadow-lg whitespace-nowrap z-50"
                >
                  Created by{' '}
                  <a
                    href="https://instagram.com/gocool.05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 underline font-medium"
                  >
                    @gocool.05
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;