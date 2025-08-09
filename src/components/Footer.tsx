import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useEffect } from 'react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/gokul-s05', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gokuls05', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/go_cool_.05', label: 'Instagram' },
  ];

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 Gokul's Portfolio. All rights reserved.
          </p>
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