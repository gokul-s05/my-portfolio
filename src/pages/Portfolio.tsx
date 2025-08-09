import { motion } from 'framer-motion';
import { ArrowDown, Download, Calendar, MapPin, Github, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import FloatingIcons from '@/components/FloatingIcons';
import emailjs from '@emailjs/browser';
import { initEmailJS, EMAILJS_CONFIG } from '@/lib/emailjs';

const Portfolio = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone_number: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      initEmailJS();
      console.log('EmailJS initialized in Portfolio');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      from_name: '',
      from_email: '',
      message: ''
    };

    // Name validation
    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email address';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove all spaces and non-digit characters
    const digits = phone.replace(/[^\d]/g, '');
    // Check if it has exactly 10 digits
    if (digits.length !== 10) return false;
    
    // Check if it only contains digits and at most 2 spaces
    const spaces = phone.split('').filter(char => char === ' ').length;
    const validFormat = /^[\d\s]+$/.test(phone); // Only digits and spaces allowed
    
    return validFormat && spaces <= 2;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number if provided
    if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number (spaces allowed).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!form.current) {
        throw new Error('Form reference is not available');
      }

      // Format phone number to remove extra spaces before sending
      const formattedPhoneNumber = formData.phone_number.replace(/[^\d]/g, '');
      const formDataToSend = new FormData(form.current);
      if (formData.phone_number) {
        formDataToSend.set('phone_number', formattedPhoneNumber);
      }

      console.log('Sending form data:', Object.fromEntries(formDataToSend));

      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form.current,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email sent successfully:', result);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form and errors
      setFormData({ from_name: '', from_email: '', phone_number: '', message: '' });
      setErrors({ from_name: '', from_email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const skills = [
    { name: 'Python', icon: '/portfolio/images/python.png', level: 85 },
    { name: 'Java', icon: '/portfolio/images/java.png', level: 69 },
    { name: 'Machine Learning', icon: '/portfolio/images/machine.png', level: 75 },
    { name: 'HTML', icon: '/portfolio/images/html.png', level: 95 },
    { name: 'CSS', icon: '/portfolio/images/css.png', level: 92 },
    { name: 'Android Studio', icon: '/portfolio/images/android.png', level: 80 },
    { name: 'C', icon: '/portfolio/images/c.png', level: 70 },
    { name: 'Kali Linux', icon: '/portfolio/images/kali.png', level: 90 }
  ];

  const projects = [
    {
      title: 'Football Analytics Platform⚽',
      description: 'Built an AI platform leveraging ML and real-time data to analyze and predict football team performance.',
      image: '/portfolio/images/football.jpg',
      tech: ['Python', 'Streamlit', 'OpenCV', 'YOLOv8'],
      github: 'https://github.com/gokul-s05/football_analysis.git',
      demo: 'unavailable'
    },
    {
      title: 'Virtual Mouse🖱️',
      description: 'Created a gesture-controlled virtual mouse using OpenCV for touchless cursor control via real-time hand tracking.',
      image: '/portfolio/images/mouse.jpg',
      tech: ['OpenCV', 'MediaPipe', 'Python','PyAutoGUI'],
      github: 'https://github.com/gokul-s05/virtual_mouse.git',
      demo: 'unavailable'
    },
    {
      title: 'Profile 360👤',
      description: 'Built an Android app in Java for managing member profiles with image support and intuitive user interface.',
      image: '/portfolio/images/web.webp',
      tech: ['Java', 'XML', 'Java for API','Firebase'],
      github: 'https://github.com/gokul-s05/profile360.git',
      demo: 'unavailable'
    },
    {
      title: 'Cyber Security Tools🔒',
      description: 'Developed cybersecurity tools including Caesar cipher, pixel-based image encryption, keylogger, and password strength checker for enhanced data protection.',
      image: '/portfolio/images/tools.webp',
      tech: ['Python', 'Git','Tkinter'],
      github: 'https://github.com/gokul-s05/Intern_Project.git',
      demo: 'https://cyber-security-tools.streamlit.app/'
    },
    {
      title: 'Portfolio Website🌐',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      image: '/portfolio/images/portfolio.jpg',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/gokul-s05/portfolio.git',
      demo: 'https://gokul-s05.github.io/portfolio/'
    },
    {
      title: 'Employee Management System🛄',
      description: 'A Django-based Employee Management System with PostgreSQL, Bootstrap 5 UI, and Crispy Forms for smooth CRUD operations.',
      image: '/portfolio/images/employee.png',
      tech: ['Django', 'PostgreSQL', 'Bootstrap', 'Git'],
      github: 'https://github.com/gokul-s05/employee-management-system.git',
      demo: 'unavailable'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      school: 'Anna University',
      period: '2022 - 2026',
      location: 'Hosur, Tamil Nadu'
    },
    {
      degree: 'Computer Science',
      school: 'Sri vijay vidyalaya matriculation higher secondary school',
      period: '2021 - 2022',
      location: 'Hosur, Tamil Nadu'
    }
  ];

  const experience = [
    {
      title: 'Cyber Security Intern',
      company: 'SkillCraft Technologies',
      period: '1 month',
      location: 'Remote',
      achievements: [
        'Built tools like Caesar cipher, image pixel encryption, and password strength checker to secure user data and information.',
        'Learned ethical hacking, keylogging, and cryptographic methods to understand system vulnerabilities and improve cybersecurity awareness.',
        'Enhanced application security by integrating encryption methods and secure input validation to protect user credentials and sensitive data.'
      ]
    },
    {
      title: 'Web Developement Intern',
      company: 'JRM Infotech',
      period: '15 days',
      location: 'Hosur, Tamil Nadu',
      achievements: [
        'Implemented a complete Employee Management System using Django and PostgreSQL, with full CRUD operations (Create, Read, Update, Delete) for efficient employee data handling and practical database interaction.',
        'Created a clean, responsive interface by integrating Bootstrap 5 with Django Crispy Forms, applying modern UI/UX practices for improved form handling and user experience.',
        'Developed a well‑structured architecture combining frontend design, backend logic, and database management, providing a solid template for similar management systems.'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gokulsarav2005@gmail.com',
      href: 'mailto:gokulsarav2005@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 73392 29906',
      href: 'tel:+917339229906'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hosur, Tamil Nadu',
      href: 'https://www.google.com/maps/place/Hosur'
    }
  ];

  return (
    <div className="w-full">
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <FloatingIcons />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hello, I'm{' '}
              <motion.span
                className="inline-block"
                animate={{ 
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gokul
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Passionate tech enthusiast skilled in ethical hacking, cybersecurity, front-end development, and mobile app creation using modern tools and technologies.

            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="lg" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View My Work
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
              
              <Button variant="outline" size="lg" className="flex items-center gap-2 justify-center" onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}>
                <ArrowDown className="w-5 h-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know the person behind the code
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent p-1"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/portfolio/images/gokul.jpg"
                    alt="Gokul - Profile"
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

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">My Story</h3>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 gradient-text text-center leading-tight !text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 overflow-visible"
            >
              Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
              Technologies and tools I work with
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-colors text-center">
                  <CardContent className="p-6 flex flex-col items-center">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 mb-4 object-contain"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>
                    <div className="flex flex-col items-center w-full space-y-1">
                      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
                        <div
                          className="h-full rounded-full absolute left-0 top-0"
                          style={{
                            width: `${skill.level}%`,
                            background: skill.level <= 34 ? '#ef4444' : 
                                       skill.level <= 69 ? 'linear-gradient(90deg, #ef4444 0%, #facc15 100%)' : 
                                       'linear-gradient(90deg, #ef4444 0%, #facc15 50%, #22c55e 100%)',
                            transition: 'width 1s',
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold mb-2 gradient-text text-center leading-tight !text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 overflow-visible"
            >
              My Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
              A collection of projects that showcase my skills and passion for development
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 text-sm text-muted-foreground text-center bg-secondary/20 p-3 rounded-lg mx-auto max-w-2xl"
            >
              <span className="font-medium">Note:</span> Some project demos are marked as unavailable as they require specific setup or are currently under maintenance.
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 min-h-[72px]">
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
                        <Button 
                          size="sm" 
                          className="flex-1" 
                          disabled={project.demo === 'unavailable'}
                        >
                          {project.demo === 'unavailable' ? (
                            <span>Live Demo (Unavailable)</span>
                          ) : (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </a>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Resume
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              My professional journey and qualifications
            </p>
            <Button asChild size="lg" className="group">
              <a href="/portfolio/images/Gokul's Resume.pdf" download>
                <Download size={20} className="mr-2 group-hover:animate-bounce" />
                Download PDF
              </a>
            </Button>
          </motion.div>

          <div className="space-y-12">
            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8 gradient-text">Experience</h3>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                          <div>
                            <h4 className="text-xl font-semibold">{job.title}</h4>
                            <p className="text-primary font-medium">{job.company}</p>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                            <div className="flex items-center md:justify-end">
                              <Calendar size={14} className="mr-1" />
                              {job.period}
                            </div>
                            <div className="flex items-center md:justify-end mt-1">
                              <MapPin size={14} className="mr-1" />
                              {job.location}
                            </div>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold mb-8 gradient-text">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h4 className="text-xl font-semibold">{edu.degree}</h4>
                            <p className="text-primary font-medium">{edu.school}</p>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                            <div className="flex items-center md:justify-end">
                              <Calendar size={14} className="mr-1" />
                              {edu.period}
                            </div>
                            <div className="flex items-center md:justify-end mt-1">
                              <MapPin size={14} className="mr-1" />
                              {edu.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-background/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="from_name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className={`transition-all duration-200 focus:scale-105 ${
                          errors.from_name ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.from_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.from_name}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="from_email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="from_email"
                        name="from_email"
                        type="email"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                        className={`transition-all duration-200 focus:scale-105 ${
                          errors.from_email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.from_email && (
                        <p className="mt-1 text-sm text-red-500">{errors.from_email}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
                        Phone (Optional)
                      </label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="transition-all duration-200 focus:scale-105"
                      />
                      
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Type your message here..."
                        className={`transition-all duration-200 focus:scale-105 ${
                          errors.message ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            ⏳
                          </motion.div>
                        ) : (
                          <>
                            <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, x: -20, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center p-4 hover:text-primary group relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300 ease-out">
                        <info.icon size={20} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="font-medium transition-colors duration-300">{info.label}</p>
                        <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">{info.value}</p>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Interactive Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="w-full h-[300px] rounded-lg overflow-hidden border border-border/30"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62265.605608561646!2d77.79488374863281!3d12.739476199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae70c883f728a3%3A0xd71a6bc0275ac9be!2sHosur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1707316847575!5m2!1sen!2sin"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hosur Map"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
