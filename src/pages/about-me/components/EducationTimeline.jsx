import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../contexts/LanguageContext';

const EducationTimeline = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedItem, setExpandedItem] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const timelineData = [
    {
      id: 1,
      type: "education",
      title: t("timelineData.id1.subtitle"),
      institution: t("timelineData.id1.institution"),
      period: t("timelineData.id1.period"),
      status: t("timelineData.id1.status"),
      description: t("timelineData.id1.description"),
      highlights: [
        t("timelineData.id1.highlights.programmingLogic"),
        t("timelineData.id1.highlights.algorithms"),
        t("timelineData.id1.highlights.oop"),
        t("timelineData.id1.highlights.softwareEngineering"),
        t("timelineData.id1.highlights.webDev"),
        t("timelineData.id1.highlights.projectManagement"),
        t("timelineData.id1.highlights.operatingSystems")
      ],
      icon: "GraduationCap",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      type: "education",
      title: t("timelineData2.id2.subtitle"),
      institution: t("timelineData2.id2.institution"),
      period: t("timelineData2.id2.period"),
      status: t("timelineData2.id2.status"),
      description: t("timelineData2.id2.description"),
      highlights: [
        t("timelineData2.id2.highlights.advancedConversation"),
        t("timelineData2.id2.highlights.listeningComprehension"),
        t("timelineData2.id2.highlights.readingTechnicalTexts"),
        t("timelineData2.id2.highlights.academicWriting"),
        t("timelineData2.id2.highlights.technicalVocabulary"),
        t("timelineData2.id2.highlights.advancedGrammar"),
        t("timelineData2.id2.highlights.fluentCommunication"),
      ],
      icon: "GraduationCap",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      type: "education",
      title: t("timelineData3.id3.subtitle"),
      institution: t("timelineData3.id3.institution"),
      period: t("timelineData3.id3.period"),
      status: t("timelineData3.id3.status"),
      description: t("timelineData3.id3.description"),
      highlights: [
        t("timelineData3.id3.highlights.freecode"),
        t("timelineData3.id3.highlights.fireship"),
        t("timelineData3.id3.highlights.supersimple"),
        t("timelineData3.id3.highlights.omelhozin"),
        t("timelineData3.id3.highlights.responsiveDesign"),
        t("timelineData3.id3.highlights.debuggingSkills"),
        t("timelineData3.id3.highlights."),
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
      case 'Em Andamento':
        return 'text-warning bg-warning/10 border-warning/30';
      case 'Completed':
        return 'text-success bg-success/10 border-success/30';
      case 'Concluído':
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
          {t("EducationTimeline.title")}
        </h2>
        <p className="font-body text-text-secondary">
          {t("EducationTimeline.subtitle")}
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
                        <span> {t("timelineData.id1.title")}  </span>
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
              {t("learningFocus.title")}
            </h3>
            <p className="font-body text-text-secondary leading-relaxed mb-4">
              {t("learningFocus.subtitle")}
            </p>
            <div className="flex flex-wrap gap-2">
              {[t("learningFocus.react"), "AWS Cloud", "DevSecOps", "GraphQL", "Docker"].map((skill) => (
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