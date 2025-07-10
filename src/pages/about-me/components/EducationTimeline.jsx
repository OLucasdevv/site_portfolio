import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EducationTimeline = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const timelineData = [
    {
      id: 1,
      type: "education",
      title: "Bachelor of Science in Computer Science",
      institution: "San Francisco State University",
      period: "2022 - Present",
      status: "In Progress",
      description: "Pursuing a comprehensive computer science degree with focus on software engineering, cybersecurity, and web development. Maintaining a 3.7 GPA while actively participating in coding competitions and tech clubs.",
      highlights: [
        "Data Structures & Algorithms",
        "Web Development Fundamentals",
        "Cybersecurity Principles",
        "Software Engineering Practices",
        "Database Management Systems"
      ],
      icon: "GraduationCap",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      type: "certification",
      title: "React Developer Certification",
      institution: "Meta (Facebook)",
      period: "2023",
      status: "Completed",
      description: "Comprehensive certification covering React fundamentals, advanced patterns, state management, and modern development practices. Completed with distinction through hands-on projects and real-world applications.",
      highlights: [
        "React Hooks & Context API",
        "Component Architecture",
        "State Management with Redux",
        "Testing with Jest & React Testing Library",
        "Performance Optimization"
      ],
      icon: "Award",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      type: "course",
      title: "Cybersecurity Fundamentals",
      institution: "Coursera - IBM",
      period: "2023",
      status: "Completed",
      description: "Intensive course covering cybersecurity principles, threat analysis, and security implementation strategies. Gained practical experience with security tools and vulnerability assessment techniques.",
      highlights: [
        "Network Security Protocols",
        "Penetration Testing Basics",
        "Risk Assessment & Management",
        "Incident Response Planning",
        "Security Compliance Standards"
      ],
      icon: "Shield",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 4,
      type: "bootcamp",
      title: "Full-Stack Web Development Bootcamp",
      institution: "General Assembly",
      period: "2022",
      status: "Completed",
      description: "Intensive 12-week bootcamp covering full-stack web development with emphasis on modern JavaScript frameworks, backend technologies, and deployment strategies.",
      highlights: [
        "JavaScript ES6+ & Modern Frameworks",
        "Node.js & Express.js",
        "Database Design & Implementation",
        "RESTful API Development",
        "Agile Development Methodologies"
      ],
      icon: "Code",
      color: "from-purple-500 to-indigo-500"
    }
  ];

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'text-warning bg-warning/10 border-warning/30';
      case 'Completed':
        return 'text-success bg-success/10 border-success/30';
      default:
        return 'text-text-secondary bg-surface border-border';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="education-timeline space-y-8"
    >
      <div className="text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-2">
          Education & Learning Journey
        </h2>
        <p className="font-body text-text-secondary">
          My academic background and continuous learning path in technology
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 lg:left-4 w-8 h-8 flex items-center justify-center">
                <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-2 border-background shadow-neo-primary flex items-center justify-center`}>
                  <Icon name={item.icon} size={12} className="text-white" />
                </div>
              </div>

              {/* Content Card */}
              <div className="ml-12 lg:ml-20">
                <div className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo hover:border-primary/30 transition-all duration-component group">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-micro">
                        {item.title}
                      </h3>
                      <p className="font-body text-primary font-medium">
                        {item.institution}
                      </p>
                      <p className="font-caption text-sm text-text-secondary">
                        {item.period}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-3 lg:mt-0">
                      <span className={`px-3 py-1 rounded-neo text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="p-2 hover:bg-primary/10 rounded-neo transition-colors duration-micro"
                        aria-label={expandedItem === item.id ? "Collapse details" : "Expand details"}
                      >
                        <Icon 
                          name={expandedItem === item.id ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-text-secondary hover:text-primary transition-colors duration-micro" 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-text-secondary leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedItem === item.id ? "auto" : 0,
                      opacity: expandedItem === item.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-body font-semibold text-text-primary mb-3 flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Key Learning Areas</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {item.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="font-caption text-sm text-text-secondary">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Focus */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-neo p-6 backdrop-blur-neo"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/20 rounded-neo">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
              Current Learning Focus
            </h3>
            <p className="font-body text-text-secondary leading-relaxed mb-4">
              I'm currently deepening my expertise in advanced React patterns, exploring serverless 
              architectures, and pursuing additional cybersecurity certifications to bridge the gap 
              between development and security.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Advanced React", "AWS Cloud", "DevSecOps", "GraphQL", "Docker"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-neo border border-primary/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationTimeline;