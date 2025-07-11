import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const PersonalValues = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const values = [
    {
      id: 1,
      title: "Security First",
      description: "I believe that secure code is good code. Every application should be built with security considerations from the ground up, not as an afterthought.",
      icon: "Shield",
      color: "from-red-500 to-pink-500",
      examples: [
        "Input validation and sanitization",
        "Secure authentication practices",
        "Data encryption and protection",
        "Regular security audits"
      ]
    },
    {
      id: 2,
      title: "User-Centric Design",
      description: "Technology should serve people, not the other way around. I focus on creating intuitive, accessible experiences that solve real problems.",
      icon: "Users",
      color: "from-blue-500 to-cyan-500",
      examples: [
        "Accessibility compliance (WCAG)",
        "Responsive design principles",
        "Performance optimization",
        "User feedback integration"
      ]
    },
    {
      id: 3,
      title: "Continuous Learning",
      description: "The tech industry evolves rapidly, and I embrace this change by constantly learning new technologies, methodologies, and best practices.",
      icon: "BookOpen",
      color: "from-green-500 to-emerald-500",
      examples: [
        "Daily coding practice",
        "Open source contributions",
        "Tech community participation",
        "Mentoring fellow developers"
      ]
    },
    {
      id: 4,
      title: "Clean Code",
      description: "Code should be readable, maintainable, and well-documented. I strive to write code that my future self and teammates will thank me for.",
      icon: "Code",
      color: "from-purple-500 to-indigo-500",
      examples: [
        "Consistent coding standards",
        "Comprehensive documentation",
        "Test-driven development",
        "Code review practices"
      ]
    },
    {
      id: 5,
      title: "Collaboration",
      description: "Great software is built by great teams. I value open communication, knowledge sharing, and collective problem-solving.",
      icon: "Users",
      color: "from-orange-500 to-red-500",
      examples: [
        "Pair programming sessions",
        "Knowledge sharing workshops",
        "Cross-functional teamwork",
        "Constructive code reviews"
      ]
    },
    {
      id: 6,
      title: "Innovation",
      description: "I'm passionate about exploring new technologies and finding creative solutions to complex problems while maintaining practical feasibility.",
      icon: "Lightbulb",
      color: "from-yellow-500 to-orange-500",
      examples: [
        "Experimental side projects",
        "Technology research",
        "Creative problem solving",
        "Process improvement initiatives"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="personal-values space-y-8"
    >
      <div className="text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-2">
          Core Values & Philosophy
        </h2>
        <p className="font-body text-text-secondary">
          The principles that guide my approach to development and professional growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value) => (
          <motion.div
            key={value.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredValue(value.id)}
            onHoverEnd={() => setHoveredValue(null)}
            className="value-card group"
          >
            <div className="bg-surface/50 border border-border rounded-neo p-6 h-full backdrop-blur-neo hover:border-primary/30 hover:bg-primary/5 transition-all duration-component">
              {/* Icon Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 bg-gradient-to-br ${value.color} rounded-neo shadow-neo-primary group-hover:shadow-glow-primary transition-all duration-component`}>
                  <Icon name={value.icon} size={20} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary group-hover:text-primary transition-colors duration-micro">
                  {value.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                {value.description}
              </p>

              {/* Examples - Show on hover */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredValue === value.id ? 1 : 0,
                  height: hoveredValue === value.id ? "auto" : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border">
                  <h4 className="font-body font-semibold text-text-primary mb-2 text-sm flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span>In Practice</span>
                  </h4>
                  <div className="space-y-1">
                    {value.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <span className="font-caption text-xs text-text-secondary">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Hover Indicator */}
              <div className="mt-4 flex justify-center">
                <div className={`w-8 h-0.5 bg-gradient-to-r ${value.color} rounded-full transition-all duration-component ${
                  hoveredValue === value.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Philosophy Statement */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-neo p-8 backdrop-blur-neo"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-neo">
              <Icon name="Heart" size={32} className="text-primary" />
            </div>
          </div>
          
          <h3 className="font-heading font-bold text-xl text-text-primary">
            My Development Philosophy
          </h3>
          
          <p className="font-body text-text-secondary leading-relaxed max-w-3xl mx-auto">
            I believe that great software is born from the intersection of technical excellence, 
            user empathy, and continuous learning. Every line of code I write is an opportunity 
            to create something meaningful, secure, and impactful. My goal is not just to build 
            applications, but to craft digital experiences that make a positive difference in 
            people's lives while maintaining the highest standards of security and performance.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Icon name="Quote" size={16} />
            <span className="font-heading font-semibold italic">
              "Code with purpose, learn with passion, secure with intention"
            </span>
            <Icon name="Quote" size={16} className="transform rotate-180" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalValues;