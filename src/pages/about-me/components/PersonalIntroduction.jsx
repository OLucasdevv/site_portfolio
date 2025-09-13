import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const PersonalIntroduction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const {t} = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
    setIsVisible(true);
  }, []);

  
  const personalInfo = {
    name: "Lucas Eduardo",
    title: t("aboutMe.role"),
    location: "Brasilia, DF",
    motto: t("hero.motto"),
    bio: t("aboutMe.subtitle"),
    profileImage: "/assets/images/profile_pic.jpeg",
    interests: [
      { name: t("interests.web.title"), icon: "Shield", description: t("interests.web.subtitle") },
      { name: t("interests.reactDevelopment.title"), icon: "Code", description: t("interests.reactDevelopment.subtitle") },
      { name: "Open Source", icon: "GitBranch", description: t("interests.openSource.subtitle") },
      { name: t("interests.contLearning.title"), icon: "BookOpen", description: t("interests.contLearning.subtitle") }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="personal-introduction space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-neo overflow-hidden border-2 border-primary/30 shadow-neo-primary group-hover:shadow-glow-primary transition-all duration-component">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-component"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-neo opacity-20 group-hover:opacity-40 transition-opacity duration-component blur-sm -z-10"></div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-2">
                {personalInfo.name}
              </h1>
              <p className="font-body text-lg text-primary font-medium mb-1">
                {personalInfo.title}
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-text-secondary">
                <Icon name="MapPin" size={16} />
                <span className="font-caption text-sm">{personalInfo.location}</span>
              </div>
            </div>

            {/* Motto */}
            <div className="relative">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-neo p-4 backdrop-blur-neo">
                <div className="flex items-center space-x-3">
                  <Icon name="Quote" size={20} className="text-primary flex-shrink-0" />
                  <p className="font-heading font-semibold text-lg text-text-primary italic">
                    "{personalInfo.motto}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bio Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo">
          <h2 className="font-heading font-bold text-xl text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="User" size={20} className="text-primary" />
            <span> {t("aboutMe.title")} </span>
          </h2>
          
          <div className="space-y-4">
            {personalInfo.bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="font-body text-text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Interests Grid */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="font-heading font-bold text-xl text-text-primary flex items-center space-x-2">
          <Icon name="Heart" size={20} className="text-primary" />
            <span> {t("aboutMe.drives")} </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.interests.map((interest, index) => (
            <motion.div
              key={interest.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface/30 border border-border rounded-neo p-4 hover:border-primary/30 hover:bg-primary/5 transition-all duration-micro group"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-neo group-hover:bg-primary/20 transition-colors duration-micro">
                  <Icon name={interest.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-micro">
                    {interest.name}
                  </h3>
                  <p className="font-caption text-sm text-text-secondary leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants} className="text-center lg:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/projects-portfolio">
          <Button
            variant="primary"
            iconName="Eye"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {t("ctaButtons.viewMyWork")}
          </Button>
          </Link>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
            onClick={(handleResumeDownload) => {
                  // Mock resume download
                  const link = document.createElement('a');
                  link.href = '/assets/images/resume/curriculo-(ingles).pdf';
                  link.download = 'curriculo-(ingles).pdf';
                  link.click();
                }}
          >
            {t("ctaButtons.resume")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalIntroduction;