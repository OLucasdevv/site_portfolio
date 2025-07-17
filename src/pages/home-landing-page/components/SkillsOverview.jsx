import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useLanguage } from '../../../contexts/LanguageContext';

const SkillsOverview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t("frontEndDev.title"),
      icon: "Monitor",
      skills: [
        { name: "React", level: 85, color: "primary" },
        { name: "JavaScript", level: 90, color: "secondary" },
        { name: "HTML/CSS", level: 95, color: "accent" },
        { name: "Tailwind CSS", level: 80, color: "primary" }
      ]
    },
    {
      title: "Backend & Database",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 75, color: "secondary" },
        { name: "Python", level: 70, color: "accent" },
        { name: "MongoDB", level: 65, color: "primary" },
        { name: "SQL", level: 80, color: "secondary" }
      ]
    },
    {
      title: t("cybersecurity.name"),
      icon: "Shield",
      skills: [
        { name: t("cybersecurity.networkSecurity"), level: 70, color: "accent" },
        { name: t("cybersecurity.penetrationTesting"), level: 60, color: "primary" },
        { name: t("cybersecurity.vulnerabilityAssessment"), level: 75, color: "secondary" },
        { name: t("cybersecurity.securityProtocols"), level: 65, color: "accent" }
      ]
    }
  ];

  const stats = [
    { key: "projects", label: t("stats.projects"), value: 2, icon: "Code", suffix: "+" },
    { key: "commits", label: t("stats.commits"), value: 500, icon: "GitCommit", suffix: "+" },
    { key: "learning", label: t("stats.learning"), value: 1200, icon: "Clock", suffix: "+" },
    { key: "technologies", label: t("stats.technologies"), value: 10, icon: "Layers", suffix: "+" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('skills-overview');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({
          ...prev,
          [stat.key]: Math.floor(current)
        }));
      }, 30);
    });
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'accent':
        return 'bg-accent';
      default:
        return 'bg-primary';
    }
  };

  return (
    <section id="skills-overview" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icon name="Zap" size={28} className="text-primary" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary">
              {t("skill.title")}
            </h2>
          </div>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t("skill.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="bg-surface border border-border rounded-neo p-6 text-center hover:border-primary/30 hover:shadow-glow-primary transition-all duration-component hover-lift"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-neo flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="font-heading font-bold text-3xl text-text-primary mb-2">
                {animatedValues[stat.key] || 0}{stat.suffix}
              </div>
              <div className="font-caption text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-surface border border-border rounded-neo p-8 hover:border-primary/30 hover:shadow-glow-primary transition-all duration-component hover-lift ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(categoryIndex + 1) * 300}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-neo flex items-center justify-center">
                  <Icon name={category.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-primary font-medium">
                        {skill.name}
                      </span>
                      <span className="font-caption text-sm text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getColorClass(skill.color)} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 300) + (skillIndex * 100)}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Journey CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-neo p-8">
            <Icon name="BookOpen" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-heading font-bold text-2xl text-text-primary mb-2">
              {t("skill.continuous.title")}
            </h3>
            <p className="font-body text-text-secondary mb-6 max-w-2xl mx-auto">
              {t("skill.continuous.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Next.js", "TypeScript", "AWS", "Docker", "GraphQL"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-surface border border-border rounded-neo font-caption text-sm text-text-secondary hover:border-primary/30 hover:text-primary transition-all duration-micro"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
