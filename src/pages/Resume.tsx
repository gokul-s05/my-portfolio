import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Calendar, MapPin } from 'lucide-react';

const Resume = () => {
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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
            Resume
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            My professional journey and qualifications
          </p>
          <Button size="lg" className="group">
            <Download size={20} className="mr-2 group-hover:animate-bounce" />
            Download PDF
          </Button>
        </motion.div>

        <div className="space-y-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Experience</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{job.title}</h3>
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 gradient-text">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="backdrop-blur-sm bg-card/50 border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{edu.degree}</h3>
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
    </div>
  );
};

export default Resume;
