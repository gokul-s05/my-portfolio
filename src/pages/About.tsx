
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
                <div
  className="relative w-full h-full rounded-full"
  onContextMenu={(e) => e.preventDefault()}
>
  <img
    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
    alt="Profile"
    className="w-full h-full rounded-full object-cover select-none"
    draggable="false"
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
    style={{ WebkitUserDrag: 'none', userSelect: 'none' } as React.CSSProperties}
  />
  <div
    className="absolute inset-0 rounded-full"
    onContextMenu={(e) => e.preventDefault()}
    style={{ WebkitTouchCallout: 'none' } as React.CSSProperties}
  />
</div>
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
                  I am a passionate DevOps Engineer currently pursuing my Bachelor of Computer Science at Er. Perumal Manimekalai College of Engineering, Hosur. I specialize in cloud infrastructure on AWS, working with services like EC2, VPC, EKS, ELB, and S3, and I focus on building scalable, highly available, and fault-tolerant systems.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                  I have hands-on internship experience at AWS Academy and Besant Technologies, where I worked with Docker and Kubernetes for containerization, built CI/CD pipelines using GitHub Actions and Jenkins, and deployed production-grade infrastructure using Terraform and AWS CloudFormation. I enjoy automating everything, from image builds to zero-downtime rolling deployments.
                  </p>
                  <p className="text-lg leading-relaxed">
                  When I'm not building pipelines, you can find me exploring new DevOps tools, working on cloud-native projects, or levelling up my AWS skills. I believe in continuous learning, clean infrastructure, and writing code that scales, because good systems should just work.
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
              { title: 'Innovation', desc: 'Automating infrastructure with modern DevOps tools' },
              { title: 'Quality', desc: 'Clean, scalable systems built to production standards' },
              { title: 'Impact', desc: 'Delivering reliable cloud solutions that perform at scale' }
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
