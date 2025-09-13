import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';


const FeaturedProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  const featuredProjects = [
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('featured-projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-success bg-success/10 border-success/30';
      case 'In Progress':
        return 'text-warning bg-warning/10 border-warning/30';
      default:
        return 'text-text-secondary bg-surface border-border';
    }
  };

  return (
    <section id="featured-projects" className="py-20 lg:py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icon name="Code" size={28} className="text-primary" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary">
              {t("projects.title")}
            </h2>
          </div>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background border border-border rounded-neo overflow-hidden hover:border-primary/30 hover:shadow-glow-primary transition-all duration-component hover-lift ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-component group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-component"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-neo border font-caption text-xs font-medium ${getStatusColor(project.status)}`}>
                  {t(`statuses.${project.status}`)}
                </div>

                {/* Quick Actions */}
                <div className={`absolute bottom-4 left-4 right-4 flex space-x-2 transition-all duration-component ${
                  hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-surface/90 backdrop-blur-neo border border-border rounded-neo px-3 py-2 flex items-center justify-center space-x-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-micro"
                  >
                    <Icon name="Github" size={16} className="text-text-primary" />
                    <span className="font-caption text-sm text-text-primary">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary/90 backdrop-blur-neo border border-primary rounded-neo px-3 py-2 flex items-center justify-center space-x-2 hover:bg-primary transition-all duration-micro"
                  >
                    <Icon name="ExternalLink" size={16} className="text-background" />
                    <span className="font-caption text-sm text-background">Live</span>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Category & Title */}
                <div>
                  <span className="font-caption text-sm text-primary font-medium">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-text-primary mt-1 group-hover:text-primary transition-colors duration-micro">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-body text-text-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-surface border border-border rounded-neo font-caption text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link to="/projects-portfolio">
            <Button 
              variant="outline" 
              iconName="ArrowRight" 
              iconPosition="right"
              className="px-8 py-4 text-lg font-medium border-primary/30 hover:bg-primary/10 hover:border-primary hover:shadow-glow-primary"
            >
              {t("projects.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;