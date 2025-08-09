import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {title: 'Football Analytics Platform⚽',
      description: 'Built an AI platform leveraging ML and real-time data to analyze and predict football team performance.',
      image: 'src/assets/football.jpg',
      tech: ['Python', 'Streamlit', 'OpenCV', 'YOLOv8'],
      github: 'https://github.com/gokul-s05/football_analysis.git',
      demo: 'https://demo.com'
    },
    {
      title: 'virtual Mouse🖱️',
      description: 'Created a gesture-controlled virtual mouse using OpenCV for touchless cursor control via real-time hand tracking.',
      image: 'src/assets/mouse.jpg',
      tech: ['OpenCV', 'MediaPipe', 'Python','PyAutoGUI'],
      github: 'https://github.com/gokul-s05/virtual_mouse.git',
      
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
      image: 'src/assets/portfolio.jpg',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/gokul-s05/portfolio.git',
      demo: 'https://gokul-s05.github.io/portfolio/'
    },
    {
      title: 'Employee Management System🛄',
      description: 'A Django-based Employee Management System with PostgreSQL, Bootstrap 5 UI, and Crispy Forms for smooth CRUD operations.',
      image: 'src/assets/employee.png',
      tech: ['Django', 'PostgreSQL', 'Bootstrap', 'Git'],
      github: 'https://github.com/gokul-s05/employee-management-system.git',
      
    }
  ];

  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
