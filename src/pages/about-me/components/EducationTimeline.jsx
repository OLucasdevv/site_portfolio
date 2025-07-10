// EducationTimeline.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../contexts/LanguageContext';

const EducationTimeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const { t } = useLanguage();

  const timelineData = [
    {
      id: 1,
      type: "education",
      title: t("about.education.bsc.title"),
      institution: t("about.education.bsc.institution"),
      period: "2022 - Present",
      status: t("statuses.In Progress"),
      description: t("about.education.bsc.description"),
      highlights: t("about.education.bsc.highlights", { returnObjects: true }),
      icon: "GraduationCap",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      type: "certification",
      title: t("about.education.react.title"),
      institution: t("about.education.react.institution"),
      period: "2023",
      status: t("statuses.Completed"),
      description: t("about.education.react.description"),
      highlights: t("about.education.react.highlights", { returnObjects: true }),
      icon: "Award",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      type: "course",
      title: t("about.education.cyber.title"),
      institution: t("about.education.cyber.institution"),
      period: "2023",
      status: t("statuses.Completed"),
      description: t("about.education.cyber.description"),
      highlights: t("about.education.cyber.highlights", { returnObjects: true }),
      icon: "Shield",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 4,
      type: "bootcamp",
      title: t("about.education.bootcamp.title"),
      institution: t("about.education.bootcamp.institution"),
      period: "2022",
      status: t("statuses.Completed"),
      description: t("about.education.bootcamp.description"),
      highlights: t("about.education.bootcamp.highlights", { returnObjects: true }),
      icon: "Code",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case t("statuses.In Progress"):
        return 'text-warning bg-warning/10 border-warning/30';
      case t("statuses.Completed"):
        return 'text-success bg-success/10 border-success/30';
      default:
        return 'text-text-secondary bg-surface border-border';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="education-timeline space-y-8"
    >
      <div className="text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-2">
          {t("about.education.title")}
        </h2>
        <p className="font-body text-text-secondary">
          {t("about.education.subtitle")}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>
        <div className="space-y-8">
          {timelineData.map((item) => (
            <motion.div key={item.id} className="relative">
              <div className="absolute left-0 lg:left-4 w-8 h-8 flex items-center justify-center">
                <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-2 border-background shadow-neo-primary flex items-center justify-center`}>
                  <Icon name={item.icon} size={12} className="text-white" />
                </div>
              </div>

              <div className="ml-12 lg:ml-20">
                <div className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo hover:border-primary/30 transition-all duration-component group">
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
                      <button onClick={() => toggleExpanded(item.id)} className="p-2 hover:bg-primary/10 rounded-neo transition-colors duration-micro">
                        <Icon name={expandedItem === item.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-text-secondary hover:text-primary" />
                      </button>
                    </div>
                  </div>

                  <p className="font-body text-text-secondary leading-relaxed mb-4">
                    {item.description}
                  </p>

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
                        <span>{t("about.education.keyAreas")}</span>
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

      <motion.div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-neo p-6 backdrop-blur-neo">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/20 rounded-neo">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
              {t("about.education.focusTitle")}
            </h3>
            <p className="font-body text-text-secondary leading-relaxed mb-4">
              {t("about.education.focusDescription")}
            </p>
            <div className="flex flex-wrap gap-2">
              {t("about.education.focusTags", { returnObjects: true }).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-neo border border-primary/30">
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
