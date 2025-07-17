import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onViewDemo, onViewGithub }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onViewDetails(project);
  };

  const handleDemoClick = (e) => {
    e.stopPropagation();
    onViewDemo(project.demoUrl);
  };

  const handleGithubClick = (e) => {
    e.stopPropagation();
    onViewGithub(project.githubUrl);
  };

  return (
    <div
      className={`group relative bg-surface border border-border rounded-neo overflow-hidden cursor-pointer transition-all duration-component hover-lift ${
        isHovered ? 'shadow-neo-primary border-primary/30' : 'hover:border-border-active'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-component group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-component ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={handleDemoClick}
              className="flex-1"
            >
              Live Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Github"
              onClick={handleGithubClick}
              className="px-3"
            />
          </div>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-caption font-medium rounded-neo ${
              project.status === 'completed' 
                ? 'bg-success/20 text-success border border-success/30'
                : project.status === 'in-progress' ?'bg-warning/20 text-warning border border-warning/30' :'bg-primary/20 text-primary border border-primary/30'
            }`}>
              {project.status === 'completed' ? 'Completed' : 
               project.status === 'in-progress' ? 'In Progress' : 'New'}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Type */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-micro">
            {project.title}
          </h3>
          <Icon 
            name="ArrowUpRight" 
            size={18} 
            className={`text-text-secondary transition-all duration-micro ${
              isHovered ? 'text-primary transform translate-x-1 -translate-y-1' : ''
            }`}
          />
        </div>

        {/* Description */}
        <p className="text-text-secondary font-body text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption font-medium rounded-neo border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-caption rounded-neo border border-border">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-text-secondary font-caption">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{project.completedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{project.duration}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning" />
            <span>{project.featured ? 'Featured' : 'Project'}</span>
          </div>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-neo transition-opacity duration-component pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-neo bg-gradient-to-r from-primary/5 to-secondary/5 animate-glow" />
      </div>
    </div>
  );
};

export default ProjectCard;