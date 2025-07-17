import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../contexts/LanguageContext';

const SkillsShowcase = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [animatedSkills, setAnimatedSkills] = useState(new Set());
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, threshold: 0.3 });
  const { t } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const skillCategories = [
    {
      title: t("skillsCategory.frontend"),
      icon: "Monitor",
      skills: [
        { name: "React", level: 85, icon: "Code", color: "from-blue-500 to-cyan-500" },
        { name: "JavaScript", level: 90, icon: "Zap", color: "from-yellow-500 to-orange-500" },
        { name: "HTML/CSS", level: 95, icon: "Layout", color: "from-orange-500 to-red-500" },
        { name: "Tailwind CSS", level: 80, icon: "Palette", color: "from-cyan-500 to-blue-500" },
        { name: "TypeScript", level: 70, icon: "FileCode", color: "from-blue-600 to-indigo-600" }
      ]
    },
    {
      title: t("skillsCategory.tools"),
      icon: "Settings",
      skills: [
        { name: "Git/GitHub", level: 85, icon: "GitBranch", color: "from-gray-600 to-gray-800" },
        { name: "Vite", level: 75, icon: "Zap", color: "from-purple-500 to-pink-500" },
        { name: "Node.js", level: 65, icon: "Server", color: "from-green-500 to-emerald-500" },
        { name: "REST APIs", level: 70, icon: "Globe", color: "from-indigo-500 to-purple-500" },
        { name: t("skillsCategory.responsiveDesign"), level: 90, icon: "Smartphone", color: "from-teal-500 to-cyan-500" }
      ]
    },
    {
      title: t("skillsCategory.cybersecurity.title"),
      icon: "Shield",
      skills: [
        { name: t("skillsCategory.cybersecurity.web"), level: 60, icon: "Lock", color: "from-red-500 to-pink-500" },
        { name: t("skillsCategory.cybersecurity.penTest"), level: 45, icon: "Search", color: "from-orange-500 to-red-600" },
        { name: t("skillsCategory.cybersecurity.networkSecurity"), level: 55, icon: "Wifi", color: "from-purple-500 to-indigo-500" },
        { name: t("skillsCategory.cybersecurity.vulnerabilityAssessment"), level: 50, icon: "AlertTriangle", color: "from-yellow-500 to-orange-600" }
      ]
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const SkillBar = ({ skill, index, categoryIndex }) => {
    const [progress, setProgress] = useState(0);
    const skillKey = `${categoryIndex}-${index}`;
    const progressRef = useRef(progress);

    useEffect(() => {
      if (isInView && progressRef.current === 0) {
        // anima progress bar suave
        let start = 0;
        const end = skill.level;
        const increment = 1;
        const intervalTime = 10; // ms
        const interval = setInterval(() => {
          start += increment;
          if (start > end) {
            start = end;
            clearInterval(interval);
          }
          setProgress(start);
          progressRef.current = start;
        }, intervalTime);
        return () => clearInterval(interval);
      }
    }, [isInView, skill.level]);

    return (
      <div className="skill-item space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name={skill.icon} size={16} className="text-primary" />
            <span className="font-body font-medium text-text-primary">{skill.name}</span>
          </div>
          <span className="font-caption text-sm text-text-secondary font-semibold">
            {progress}%
          </span>
        </div>

        <div className="relative h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full shadow-glow-primary`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={skillsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="skills-showcase space-y-8"
    >
      <div className="text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-2">
          {t("technicalSkills.title")}
        </h2>
        <p className="font-body text-text-secondary">
          {t("technicalSkills.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            variants={categoryVariants}
            className="skill-category"
          >
            <div className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo hover:border-primary/30 transition-colors duration-component">
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-neo">
                  <Icon name={category.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills Summary */}
      <motion.div
        variants={categoryVariants}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-neo p-6 backdrop-blur-neo"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/20 rounded-neo">
            <Icon name="TrendingUp" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
              {t("growth.title")}
            </h3>
            <p className="font-body text-text-secondary leading-relaxed">
              {t("growth.subtitle")}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsShowcase;
