import { motion } from 'framer-motion';
import { ArrowDown, Download, Calendar, MapPin, Github, Mail, Phone, Send, X, User } from 'lucide-react';
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
  const getPublicAssetUrl = (relativePath: string) => `${import.meta.env.BASE_URL}${relativePath}`;
  const form = useRef<HTMLFormElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone_number: '',
    company_name: '',
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
      setFormData({ from_name: '', from_email: '', phone_number: '',company_name: '', message: '' });
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
    { name: 'Python', icon: getPublicAssetUrl('images/python.webp'), level: 85 },
    { name: 'AWS', icon: getPublicAssetUrl('images/aws cloud.webp'), level: 69 },
    { name: 'Docker', icon: getPublicAssetUrl('images/docker.png'), level: 75 },
    { name: 'Kubernetes', icon: getPublicAssetUrl('images/k8s.webp'), level: 95 },
    { name: 'Jenkins', icon: getPublicAssetUrl('images/jenkins.webp'), level: 92 },
    { name: 'Terraform', icon: getPublicAssetUrl('images/terraform.webp'), level: 80 },
    { name: 'GitHub', icon: getPublicAssetUrl('images/github.webp'), level: 70 },
    { name: 'GitHub Actions', icon: getPublicAssetUrl('images/github action.png'), level: 70 },
    { name: 'Bash', icon: getPublicAssetUrl('images/bash.webp'), level: 70 },
    { name: 'Grafana', icon: getPublicAssetUrl('images/grafana.webp'), level: 70 },
    { name: 'Prometheus', icon: getPublicAssetUrl('images/prometheus.webp'), level: 70 },
    { name: 'RedHat Linux', icon: getPublicAssetUrl('images/redhat.webp'), level: 90 }
  ];

  const projects = [
    {
      title: 'Autoscaling Web Application on AWS EKS 🚀',
      description: 'Deployed a containerized web application on a multi-node Kubernetes cluster with Terraform, automated CI/CD pipeline, and horizontal pod autoscaling on AWS.',
      image: getPublicAssetUrl('images/autoscaling.webp'),
      tech: ['Terraform', 'Kubernetes', 'Docker', 'AWS EKS','GitHub Actions','AWS S3'],
      github: 'https://github.com/gokul-s05/eks-devops-project',
    },
    {
      title: 'AWS EKS CI/CD Platform ⚙️',
      description: 'Built a production-grade EKS platform with fully automated CI/CD pipeline for Docker image builds, ECR pushes, and zero-downtime Kubernetes deployments with real-time monitoring.',
      image: getPublicAssetUrl('images/eks.webp'),
      tech: ['Grafana', 'Prometheus', 'Helm', 'Docker','AWS ECR','Terraform'],
      github: 'https://github.com/gokul-s05/eks-cicd-platform',
    },
    {
      title: 'Three-Tier AWS Infrastructure 💻',
      description: 'Modular three-tier architecture on AWS with isolated networking, auto-scaled compute, and a zero-exposure private database tier. ',
      image: getPublicAssetUrl('images/tier.webp'),
      tech: ['Terraform', 'AWS VPC', 'AWS EC2', 'RDS','Secret Manager','ALB'],
      github: 'https://github.com/gokul-s05/three-tier-aws-terraform',
    },
    {
      title: 'Football Analytics Platform ⚽',
      description: 'Built an AI platform leveraging ML and real-time data to analyze and predict football team performance.',
      image: getPublicAssetUrl('images/football.webp'),
      tech: ['Python', 'Streamlit', 'OpenCV', 'YOLOv8'],
      github: 'https://github.com/gokul-s05/football_analysis.git',
      demo: 'unavailable'
    },
    {
      title: 'Virtual Mouse 🖱️',
      description: 'Created a gesture-controlled virtual mouse using OpenCV for touchless cursor control via real-time hand tracking.',
      image: getPublicAssetUrl('images/mouse.webp'),
      tech: ['OpenCV', 'MediaPipe', 'Python','PyAutoGUI'],
      github: 'https://github.com/gokul-s05/virtual_mouse.git',
      demo: 'unavailable'
    },
    {
      title: 'Profile 360 👤',
      description: 'Built an Android app in Java for managing member profiles with image support and intuitive user interface.',
      image: getPublicAssetUrl('images/web.webp'),
      tech: ['Java', 'XML', 'Java for API','Firebase'],
      github: 'https://github.com/gokul-s05/profile360.git',
      
    },
    {
      title: 'Cyber Security Tools 🔒',
      description: 'Developed cybersecurity tools including Caesar cipher, pixel-based image encryption, keylogger, and password strength checker for enhanced data protection.',
      image: getPublicAssetUrl('images/tools.webp'),
      tech: ['Python', 'Git','Tkinter'],
      github: 'https://github.com/gokul-s05/Intern_Project.git',
      demo: 'https://cyber-security-tools.streamlit.app/'
    },
    {
      title: 'Portfolio Website 🌐',
      description: 'Modern portfolio website with smooth animations and responsive design.',
      image: getPublicAssetUrl('images/portfolio.webp'),
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/gokul-s05/my-portfolio',
      demo: 'https://gokul-s05.github.io/portfolio/',
      isCurrentSite: true
    },
    {
      title: 'Employee Management System 🛄',
      description: 'A Django-based Employee Management System with PostgreSQL, Bootstrap 5 UI, and Crispy Forms for smooth CRUD operations.',
      image: getPublicAssetUrl('images/employee.webp'),
      tech: ['Django', 'PostgreSQL', 'Bootstrap', 'Git'],
      github: 'https://github.com/gokul-s05/employee-management-system.git',
    
    }
  ];

  const education = [
  {
    degree: 'Bachelor of Engineering in Computer Science',
    school: 'Anna University',
    period: '2022 - 2026',
    location: 'Hosur, Tamil Nadu',
    score: 'CGPA: 7.80/10 (till 7th sem)'
  },
  {
    degree: 'Computer Science',
    school: 'Sri vijay vidyalaya matriculation higher secondary school',
    period: '2021 - 2022',
    location: 'Hosur, Tamil Nadu',
    score: 'Class XII - 75.83%'
  }
];

  const experience = [
    {
      title: 'DevOps Engineer Intern',
      company: 'Besant Technologies',
      period: '6 month',
      location: 'Bangalore, Karnataka',
      achievements: [
        'Gained hands-on experience with AWS core services including cloud infrastructure setup, deployment, and management.',
        'Worked with Docker and Kubernetes for containerization and orchestration of cloud-based applications.',
        'Developed proficiency in Linux administration for server management, shell scripting, and cloud environment configuration.'
      ]
    },
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
    },
    {
      title: 'Cyber Security & Ethical Hacking Intern',
      company: 'Rinex',
      period: '1 month',
      location: 'Remote',
      achievements: [
        'Performed comprehensive Vulnerability Assessment on systems and applications, identifying security loopholes and suggesting remediation strategies.',
        'Executed Penetration Testing simulations to analyze system defenses, detect exploits, and strengthen overall security posture.',
        'Applied Network Security and Ethical Hacking techniques to monitor traffic, prevent unauthorized access, and ensure data protection in real-world scenarios.'
      ]
    }
  ];

  const certificates = [
    {
      title: 'AWS Cloud Architecting',
      issuer: 'AWS Academy',
      date: 'Aug 2025',
      image: getPublicAssetUrl('images/AWS.webp'),
      credentialUrl: 'https://www.credly.com/badges/460bbe95-f1db-4a9d-b8eb-1a0ffa95466a/public_url'
    },
    {
      title: 'DevOps Foundations',
      issuer: 'LinkedIn Learning',
      date: 'June 2026',
      image: getPublicAssetUrl('images/devops.webp'),
      credentialUrl: 'https://drive.google.com/file/d/1H7tGK1f7ieMhN7eyk5XOiZkmRRYjWoxp/view?usp=drive_link'
    },
    {
      title: 'DevOps Foundations: CI/CD',
      issuer: 'LinkedIn Learning',
      date: 'June 2026',
      image: getPublicAssetUrl('images/devops cicd.webp'),
      credentialUrl: 'https://drive.google.com/file/d/1EW4u1Q0CAkRocse_pEsDGUc59YvSDiwE/view?usp=sharing'
    },
    {
      title: 'Cyber Security Foundation Certication',
      issuer: 'Infosys Springboard',
      date: 'Aug 2025',
      image: getPublicAssetUrl('images/infosys.webp'),
      credentialUrl: 'https://drive.google.com/file/d/1I08Aon7lIdr8gWfHtqELovQmK3yNtxZA/view?usp=drive_link'
    },
    {
      title: 'Complete IP Addressing and Subnetting Course',
      issuer: 'Geek for Geeks',
      date: 'June - July 2025',
      image: getPublicAssetUrl('images/geek for geeks.webp'),
      credentialUrl: 'https://media.geeksforgeeks.org/courses/certificates/f6dfe1b8d746d1da5f84027c74d4afcc.pdf'
    },
    {
      title: 'Cyber security with Ethical Hacking Intern',
      issuer: 'Rinex',
      date: 'Sept - Oct 2023',
      image: getPublicAssetUrl('images/rinex.webp'),
      credentialUrl: 'https://drive.google.com/file/d/1iR4RTXoplLVmlQjib0V8rD0IW8JFjNzw/view?usp=sharing'
    },
    {
      title: 'Cybersecurity Intern',
      issuer: 'SkillCraft Technologies',
      date: 'June - July 2025',
      image: getPublicAssetUrl('images/Skillcraft.webp'),
      credentialUrl: 'https://skillcrafttech.com/verify?id=SCT/JUN25/6339'
    },
    {
      title: 'Cyber Job Simulation',
      issuer: 'Deloitte / Forage',
      date: 'Sep 2025',
      image: getPublicAssetUrl('images/Deloitte.webp'),
      credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_sQyFDqhToW3FagtWh_1757235729943_completion_certificate.pdf'
    },
    {
      title: 'Cybersecurity Analyst Job Simulation',
      issuer: 'TCS / Forage',
      date: 'Sep 2025',
      image: getPublicAssetUrl('images/Tata cyber.webp'),
      credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_sQyFDqhToW3FagtWh_1757238290185_completion_certificate.pdf'
    },
    {
      title: 'Solutions Architecture Job Simulation',
      issuer: 'AWS / Forage',
      date: 'Sep 2025',
      image: getPublicAssetUrl('images/AWS forage.webp'),
      credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_sQyFDqhToW3FagtWh_1757241032270_completion_certificate.pdf'
    },
  ];

  const handleToggleCertificates = () => {
    setShowAllCertificates((prev) => {
      const next = !prev;
      if (!next) {
        requestAnimationFrame(() => {
          const el = document.getElementById('certificates');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
      return next;
    });
  };

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
              Passionate DevOps Engineer skilled in cloud infrastructure, CI/CD automation, containerization using Docker & Kubernetes, and AWS services — building scalable, reliable systems with modern DevOps tools.

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

            <motion.div
  className="flex justify-center mt-6"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.8 }}
>
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Button
      size="lg"
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 flex items-center gap-2"
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <User className="w-5 h-5" />
      Hire Me
    </Button>
  </motion.div>
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
                  <div
  className="relative w-full h-full rounded-full"
  onContextMenu={(e) => e.preventDefault()}
>
  <img
    src={getPublicAssetUrl('images/gokul.webp')}
    alt="Gokul - Profile"
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

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                <CardContent className="p-4 sm:p-8">
                  <h3 className="!text-xl sm:!text-2xl font-semibold mb-3 sm:mb-6 text-center">My Story</h3>



                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="!text-base sm:!text-lg leading-relaxed mb-3 sm:mb-4">

                    I am a passionate DevOps Engineer currently pursuing my Bachelor of Computer Science at Er. Perumal Manimekalai College of Engineering, Hosur. I specialize in cloud infrastructure on AWS, working with services like EC2, VPC, EKS, ELB, and S3, and I focus on building scalable, highly available, and fault-tolerant systems.
                    </p>
                    <p className="!text-base sm:!text-lg leading-relaxed mb-3 sm:mb-4">

                    I have hands-on internship experience at AWS Academy and Besant Technologies, where I worked with Docker and Kubernetes for containerization, built CI/CD pipelines using GitHub Actions and Jenkins, and deployed production-grade infrastructure using Terraform and AWS CloudFormation. I enjoy automating everything, from image builds to zero-downtime rolling deployments.
                    </p>
                      <p className="!text-base sm:!text-lg leading-relaxed mb-3 sm:mb-4">

                    When I'm not building pipelines, you can find me exploring new DevOps tools, working on cloud-native projects, or levelling up my AWS skills. I believe in continuous learning, clean infrastructure, and writing code that scales, because good systems should just work.
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
                { title: 'Innovation', desc: 'Automating infrastructure with modern DevOps tools' },
                { title: 'Quality', desc: 'Clean, scalable systems built to production standards' },
                { title: 'Impact', desc: 'Delivering reliable cloud solutions that perform at scale' }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30"
                >
                  <h4 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{value.title}</h4>

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

          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
  key={skill.name}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    e.currentTarget.style.boxShadow = `${-x * 0.05}px ${-y * 0.05}px 20px rgba(139,92,246,0.3)`;
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    e.currentTarget.style.transform = 'translate(0px, 0px)';
    e.currentTarget.style.boxShadow = 'none';
  }}
  onTouchMove={(e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    e.currentTarget.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    e.currentTarget.style.boxShadow = `${-x * 0.05}px ${-y * 0.05}px 20px rgba(139,92,246,0.3)`;
  }}
  onTouchEnd={(e) => {
    e.currentTarget.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    e.currentTarget.style.transform = 'translate(0px, 0px)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
                <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-colors text-center">
                  <CardContent className="p-3 sm:p-6 flex flex-col items-center">
  <img
    src={skill.icon}
    alt={skill.name}
    className="w-9 h-9 sm:w-12 sm:h-12 mb-2 sm:mb-4 object-contain"
    loading="lazy"
  />
  <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-3">{skill.name}</h3>
                    
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
  className="text-4xl sm:text-5xl font-bold mb-6 gradient-text text-center !text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
  style={{ lineHeight: '1.3', paddingBottom: '4px' }}
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
  className="group"
  style={{ perspective: '1000px' }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) * 7;
    const card = e.currentTarget.querySelector('.project-card') as HTMLElement;
    const spotlight = e.currentTarget.querySelector('.project-spotlight') as HTMLElement;
    if (card) {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    }
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139,92,246,0.25) 0%, transparent 65%)`;
      spotlight.style.opacity = '1';
    }
  }}
  onMouseLeave={(e) => {
    const card = e.currentTarget.querySelector('.project-card') as HTMLElement;
    const spotlight = e.currentTarget.querySelector('.project-spotlight') as HTMLElement;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  }}
  onTouchMove={(e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) * 7;
    const card = e.currentTarget.querySelector('.project-card') as HTMLElement;
    if (card) {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    }
  }}
  onTouchEnd={(e) => {
    const card = e.currentTarget.querySelector('.project-card') as HTMLElement;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }}
>
                <Card className="project-card h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 relative"
  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
>
  {/* Spotlight overlay */}
  <div
    className="project-spotlight absolute inset-0 z-10 pointer-events-none rounded-lg opacity-0"
    style={{ transition: 'opacity 0.2s ease' }}
  />
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
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild size="sm" variant="outline" className="w-full sm:flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.demo && (
                        project.isCurrentSite ? (
                          <Button size="sm" className="w-full sm:flex-1 text-xs" disabled>
                            You are currently viewing this project
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full sm:flex-1"
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
                        )
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
              <a href={getPublicAssetUrl("images/Gokul_DevOps_Resume.pdf")} download>
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
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
                {experience.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                      <CardContent className="p-3 md:p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-4">
  <div>
    <h4 className="text-sm md:text-xl font-semibold leading-tight">{job.title}</h4>
<p className="text-xs md:text-base text-primary font-medium leading-tight mt-1">{job.company}</p>
  </div>
                          <div className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-0 md:text-right">
  <div className="flex items-center md:justify-end">
    <Calendar size={12} className="mr-1 md:hidden" />
    <Calendar size={14} className="mr-1 hidden md:inline" />
    {job.period}
  </div>
  <div className="flex items-center md:justify-end mt-1">
    <MapPin size={12} className="mr-1 md:hidden" />
    <MapPin size={14} className="mr-1 hidden md:inline" />
    {job.location}
  </div>
</div>
                        </div>
                        <ul className="space-y-1 md:space-y-2">
  {job.achievements.map((achievement, idx) => (
    <li key={idx} className="flex items-start">
      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
      <span className="text-xs md:text-base text-muted-foreground leading-snug">{achievement}</span>
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
  <p className="text-sm text-muted-foreground mt-1">{edu.score}</p>
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

      {/* Certificates Section */}
      <section id="certificates" className="min-h-screen py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Verified certificates and courses I've completed
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">

            {(showAllCertificates ? certificates : certificates.slice(0, 3)).map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <div className="relative">
                    <motion.img
  src={cert.image}
  alt={cert.title}
  className="w-full h-20 sm:h-56 md:h-64 object-contain bg-secondary/20 p-1.5 sm:p-6 cursor-zoom-in select-none"

  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.25 }}
  draggable="false"
  onContextMenu={(e) => e.preventDefault()}
  onDragStart={(e) => e.preventDefault()}
  style={{ WebkitUserDrag: 'none', userSelect: 'none' } as React.CSSProperties}
  onClick={() => {
    setLightboxImage(cert.image);
    setIsLightboxOpen(true);
  }}
/>
                  </div>
                  <CardContent className="p-2 sm:p-6">
  <h3 className="text-xs sm:text-lg font-semibold leading-tight">{cert.title}</h3>
  <p className="text-[11px] sm:text-sm text-muted-foreground mt-1">{cert.issuer}</p>
  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 flex items-center">
    <Calendar size={10} className="mr-1" />
    {cert.date}
  </p>
                    {cert.credentialUrl && (
  <div className="mt-2 sm:mt-4">
    <Button asChild size="sm" variant="outline" className="text-[10px] sm:text-sm px-1.5 sm:px-4 h-6 sm:h-9 w-full sm:w-auto">
      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            {(cert.issuer === 'Geek for Geeks' || cert.issuer === 'Rinex' || cert.issuer === 'Deloitte / Forage' || cert.issuer === 'AWS / Forage' || cert.issuer === 'TCS / Forage' || cert.issuer === 'Infosys Springboard' || cert.issuer === 'LinkedIn Learning') ? 'View Certificate' : 'View Credential'}
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-4 sm:mt-8">
            <Button variant="outline" onClick={handleToggleCertificates}>
              {showAllCertificates ? 'Show less' : 'View all certificates'}
            </Button>
          </div>
        </div>

        {isLightboxOpen && lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Close"
                className="absolute -top-3 -right-3 sm:top-0 sm:right-0 translate-y-[-100%] sm:translate-y-0 bg-background/90 border border-border text-foreground rounded-full p-2 hover:bg-background z-[61]"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X size={18} />
              </button>
              <motion.img
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.2 }}
  src={lightboxImage}
  alt="Certificate enlarged"
  className="w-full max-h-[80vh] object-contain rounded-md shadow-xl select-none"
  draggable="false"
  onContextMenu={(e) => e.preventDefault()}
  onDragStart={(e) => e.preventDefault()}
  style={{ WebkitUserDrag: 'none', userSelect: 'none' } as React.CSSProperties}
/>
            </div>
          </motion.div>
        )}
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background/25">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               I'm currently looking for <span className="font-semibold">
  {"new opportunities".split(' ').map((word, wordIndex, words) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap">
      {word.split('').map((char, i) => {
        const globalIndex = words.slice(0, wordIndex).join(' ').length + wordIndex + i;
        return (
          <span
            key={i}
            className="gradient-wave-letter"
            style={{ animationDelay: `0s, ${globalIndex * 0.08}s` }}
          >
            {char}
          </span>
        );
      })}
      {wordIndex < words.length - 1 && '\u00A0'}
    </span>
  ))}
</span> - feel free to reach out if you'd like to connect.
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
                  <h3 className="text-2xl font-semibold mb-2">Interested in Hiring Me?</h3>
<p className="text-sm text-muted-foreground mb-6">Recruiters and hiring managers, I'd love to hear about the opportunity.</p>
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
  transition={{ delay: 0.55 }}
>
  <label htmlFor="company_name" className="block text-sm font-medium mb-2">
    Company (Optional)
  </label>
  <Input
    id="company_name"
    name="company_name"
    value={formData.company_name}
    onChange={handleChange}
    placeholder="Enter your company name"
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
  Role Details / Message <span className="text-red-500">*</span>
</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about the role, tech stack, and what you're looking for..."
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
                            Send to Gokul
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
