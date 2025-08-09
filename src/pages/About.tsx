
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know the person behind the code
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              <motion.div
                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent p-1"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                👋
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">My Story</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-4">
                  I am a passionate and versatile tech enthusiast with hands-on experience in ethical hacking and cybersecurity,
                     focusing on identifying vulnerabilities and securing digital systems. I also specialize in front-end development,
                      creating responsive and user-friendly interfaces using modern web technologies.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                  Additionally, I have a hands-on experience in mobile app development, building functional and engaging Android applications that enhance user experience. 
                    My skill set reflects a strong interest in both software development and digital security, allowing me to contribute to innovative, 
                    secure, and user-centered solutions.
                  </p>
                  <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or sharing my knowledge through 
                    technical writing. I believe in the power of collaboration and 
                    continuous learning to push the boundaries of what's possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Innovation', desc: 'Creative solutions through evolving technology' },
              { title: 'Quality', desc: 'Consistent excellence in every detail' },
              { title: 'Impact', desc: 'Driving meaningful change with technology' }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
