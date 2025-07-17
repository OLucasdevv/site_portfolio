import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../contexts/LanguageContext';


const PersonalValues = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [hoveredValue, setHoveredValue] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const values = [
    {
      id: 1,
      title: t("valueData.id1.title"),
      description: t("valueData.id1.description"),
      icon: "Shield",
      color: "from-red-500 to-pink-500",
      examples: [
        t("valueData.id1.examples.ex1"),
        t("valueData.id1.examples.ex2"),
        t("valueData.id1.examples.ex3"),
        t("valueData.id1.examples.ex4")
      ]
    },
    {
      id: 2,
      title: t("valueData2.id2.title"),
      description: t("valueData2.id2.description"),
      icon: "Users",
      color: "from-blue-500 to-cyan-500",
      examples: [
        t("valueData2.id2.examples.ex1"),
        t("valueData2.id2.examples.ex2"),
        t("valueData2.id2.examples.ex3"),
        t("valueData2.id2.examples.ex4")
      ]
    },
    {
      id: 3,
      title: t("valueData3.id3.title"),
      description: t("valueData3.id3.description"),
      icon: "BookOpen",
      color: "from-green-500 to-emerald-500",
      examples: [
        t("valueData3.id3.examples.ex1"),
        t("valueData3.id3.examples.ex2"),
        t("valueData3.id3.examples.ex3"),
        t("valueData3.id3.examples.ex4")
      ]
    },
    {
      id: 4,
      title: t("valueData4.id4.title"),
      description: t("valueData4.id4.description"),
      icon: "Code",
      color: "from-purple-500 to-indigo-500",
      examples: [
        t("valueData4.id4.examples.ex1"),
        t("valueData4.id4.examples.ex2"),
        t("valueData4.id4.examples.ex3"),
        t("valueData4.id4.examples.ex4")
      ]
    },
    {
      id: 5,
      title: t("valueData5.id5.title"),
      description: t("valueData5.id5.description"),
      icon: "Users",
      color: "from-orange-500 to-red-500",
      examples: [
        t("valueData5.id5.examples.ex1"),
        t("valueData5.id5.examples.ex2"),
        t("valueData5.id5.examples.ex3"),
        t("valueData5.id5.examples.ex4")
      ]
    },
    {
      id: 6,
      title: t("valueData6.id6.title"),
      description: t("valueData6.id6.description"),
      icon: "Lightbulb",
      color: "from-yellow-500 to-orange-500",
      examples: [
        t("valueData6.id6.examples.ex1"),
        t("valueData6.id6.examples.ex2"),
        t("valueData6.id6.examples.ex3"),
        t("valueData6.id6.examples.ex4")
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
          {t("valueData.title")}
        </h2>
        <p className="font-body text-text-secondary">
          {t("valueData.subtitle")}
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
                    <span> {t("valueData.status")} </span>
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
            {t("myDevPhilosophy.title")}
          </h3>
          
          <p className="font-body text-text-secondary leading-relaxed max-w-3xl mx-auto">
            {t("myDevPhilosophy.subtitle")}
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Icon name="Quote" size={16} />
            <span className="font-heading font-semibold italic">
              {t("hero.motto")}
            </span>
            <Icon name="Quote" size={16} className="transform rotate-180" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalValues;