import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';


const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    demo?: string;
    isCurrentSite?: boolean;
  }[] = [
    {
      title: 'Autoscaling Web Application on AWS EKS 🚀',
      description: 'Deployed a containerized web application on a multi-node Kubernetes cluster with Terraform, automated CI/CD pipeline, and horizontal pod autoscaling on AWS.',
      image: 'src/assets/autoscaling.webp',
      tech: ['Terraform','Kubernetes','Docker','AWS EKS','GitHub Actions','AWS S3'],
      github: 'https://github.com/gokul-s05/eks-devops-project',
      
    },
    {
      title: 'AWS EKS CI/CD Platform ⚙️',
      description: 'Built a production-grade EKS platform with fully automated CI/CD pipeline for Docker image builds, ECR pushes, and zero-downtime Kubernetes deployments with real-time monitoring.',
      image: 'src/assets/eks.webp',
      tech: ['Grafana', 'Prometheus', 'Helm', 'Docker','AWS ECR','Terraform'],
      github: 'https://github.com/gokul-s05/eks-cicd-platform',
      
    },
    {title: 'Football Analytics Platform⚽',
      description: 'Built an AI platform leveraging ML and real-time data to analyze and predict football team performance.',
      image: 'src/assets/football.webp',
      tech: ['Python', 'Streamlit', 'OpenCV', 'YOLOv8'],
      github: 'https://github.com/gokul-s05/football_analysis.git',
      demo: 'unavailable'
    },
    {
      title: 'virtual Mouse🖱️',
      description: 'Created a gesture-controlled virtual mouse using OpenCV for touchless cursor control via real-time hand tracking.',
      image: 'src/assets/mouse.webp',
      tech: ['OpenCV', 'MediaPipe', 'Python','PyAutoGUI'],
      github: 'https://github.com/gokul-s05/virtual_mouse.git',
      demo: 'unavailable'
    },
    {
      title: 'Profile 360👤',
      description: 'Built an Android app in Java for managing member profiles with image support and intuitive user interface.',
      image: 'src/assets/web.webp',
      tech: ['Java', 'XML', 'Java for API','Firebase'],
      github: 'https://github.com/gokul-s05/profile360.git',
      
    },
    {
      title: 'Cyber Security Tools🔒',
      description: 'Developed cybersecurity tools including Caesar cipher, pixel-based image encryption, keylogger, and password strength checker for enhanced data protection.',
      image: 'src/assets/tools.webp',
      tech: ['Python', 'Git','Tkinter'],
      github: 'https://github.com/gokul-s05/Intern_Project.git',
      demo: 'https://cyber-security-tools.streamlit.app/'
    },
    {
      title: 'Portfolio Website🌐',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      image: 'src/assets/portfolio.webp',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/gokul-s05/my-portfolio',
      demo: 'https://gokul-s05.github.io/portfolio/',
      isCurrentSite: true
    },
    {
      title: 'Employee Management System🛄',
      description: 'A Django-based Employee Management System with PostgreSQL, Bootstrap 5 UI, and Crispy Forms for smooth CRUD operations.',
      image: 'src/assets/employee.webp',
      tech: ['Django', 'PostgreSQL', 'Bootstrap', 'Git'],
      github: 'https://github.com/gokul-s05/employee-management-system.git',
      
    }
  ];

  return (
    <>
    <Helmet>
  <title>Projects | Gokul S DevOps Portfolio</title>
  <meta name="description" content="DevOps projects by Gokul S – AWS EKS autoscaling, CI/CD pipelines, Kubernetes deployments, Football Analytics and more." />
</Helmet>
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        {/* 3D Carousel Stage */}
<div style={{ perspective: '1200px', width: '100%', position: 'relative' }}>
  <div className="relative flex items-center justify-center" style={{ height: '460px' }}>
    {(() => {
      const total = projects.length;
      return projects.map((project, index) => {
        const offset = ((index - activeIndex) % total + total) % total;
      const norm = offset <= total / 2 ? offset : offset - total;
      if (Math.abs(norm) > 2) return null;
      const x = norm * 230;
      const z = -Math.abs(norm) * 130;
      const scale = 1 - Math.abs(norm) * 0.15;
      const opacity = norm === 0 ? 1 : Math.abs(norm) === 1 ? 0.65 : 0.3;
      const zIndex = 10 - Math.abs(norm);
      const isActive = norm === 0;
      return (
        <motion.div
          key={project.title}
          onClick={() => !isActive && setActiveIndex(index)}
          animate={{ x, z, scale, opacity }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            width: '300px',
            zIndex,
            cursor: isActive ? 'default' : 'pointer',
            transformStyle: 'preserve-3d',
          }}
          className="group"
        >
          <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300" style={{ height: '450px' }}>
            <div className="relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-44 object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {project.isCurrentSite && (
                <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-background/80 border border-border/50">
                  Current site
                </span>
              )}
            </div>
            <CardContent className="p-5 flex flex-col gap-3">
              <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto pt-1">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-1.5" />Code
                  </a>
                </Button>
                {project.demo && (
                  project.demo === 'unavailable' ? (
                    <Button size="sm" className="flex-1 text-xs" disabled>Demo unavailable</Button>
                  ) : project.isCurrentSite ? (
                    <Button size="sm" className="flex-1 text-xs" disabled>Viewing now</Button>
                  ) : (
                    <Button asChild size="sm" className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
      });
    })()}
  </div>

  {/* Nav row */}
  <div className="flex items-center justify-center gap-4 mt-6">
    <button
      onClick={() => setActiveIndex((activeIndex - 1 + projects.length) % projects.length)}
      className="w-9 h-9 rounded-full border border-border/50 bg-card/50 flex items-center justify-center hover:bg-card transition-colors"
      aria-label="Previous project"
    >‹</button>
    <div className="flex gap-2">
      {projects.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          aria-label={`Go to project ${i + 1}`}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{ width: i === activeIndex ? '20px' : '6px', background: i === activeIndex ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
        />
      ))}
    </div>
    <button
      onClick={() => setActiveIndex((activeIndex + 1) % projects.length)}
      className="w-9 h-9 rounded-full border border-border/50 bg-card/50 flex items-center justify-center hover:bg-card transition-colors"
      aria-label="Next project"
    >›</button>
  </div>
  <p className="text-center text-xs text-muted-foreground mt-2">{activeIndex + 1} / {projects.length}</p>
</div>
      </div>
    </div>
  
  </>
);
};

export default Projects;
