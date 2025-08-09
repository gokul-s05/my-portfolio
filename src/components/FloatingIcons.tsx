
import { motion } from 'framer-motion';
import { Code, Palette, Lightbulb, Rocket, Coffee, Heart, Brain } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Code, position: { top: '20%', left: '10%' }, delay: 0 },
    { Icon: Palette, position: { top: '15%', right: '15%' }, delay: 0 },
    { Icon: Lightbulb, position: { top: '60%', left: '8%' }, delay: 0 },
    { Icon: Rocket, position: { top: '70%', right: '10%' }, delay: 0 },
    { Icon: Coffee, position: { top: '40%', left: '5%' }, delay: 0 },
    { Icon: Brain, position: { top: '45%', right: '5%' }, delay: 0 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={position}
          initial={{ opacity: 0, scale: 0, rotateY: -180 }}
          animate={{ 
            opacity: 0.6, 
            scale: 1, 
            rotateY: 0,
            y: [0, -20, 0],
            rotateZ: [0, 360]
          }}
          transition={{
            opacity: { duration: 1, delay },
            scale: { duration: 0.8, delay },
            rotateY: { duration: 1, delay },
            y: { duration: 4, repeat: Infinity, delay },
            rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' }
          }}
          whileHover={{ 
            scale: 1.2, 
            rotateY: 180,
            transition: { duration: 0.3 }
          }}
        >
          <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
            <Icon size={32} className="text-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
