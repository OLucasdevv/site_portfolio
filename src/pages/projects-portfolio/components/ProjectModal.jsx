import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose, onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && project?.images?.length > 1) {
        handlePreviousImage();
      } else if (event.key === 'ArrowRight' && project?.images?.length > 1) {
        handleNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, currentImageIndex]);

  const handlePreviousImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!project?.images?.length) return;
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDemoClick = () => {
    if (project?.demoUrl) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubClick = () => {
    if (project?.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen || !project) return null;

  const images = project.images || [project.image];
  const currentImage = images[currentImageIndex];

  return (
    <div className="fixed inset-0 z-modal bg-background/95 backdrop-blur-neo animate-fade-in">
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleBackdropClick}
      />
      
      <div className="relative h-full flex flex-col">
        {/* Modal Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border bg-surface/50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center">
                <Icon name="Code" size={20} className="text-background" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-text-primary">
                  {project.title}
                </h2>
                <p className="font-caption text-sm text-text-secondary">
                  {project.type} • {project.completedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onNavigate && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronLeft"
                  onClick={() => onNavigate('prev')}
                  className="hover:bg-primary/10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronRight"
                  onClick={() => onNavigate('next')}
                  className="hover:bg-primary/10"
                />
                <div className="w-px h-6 bg-border mx-2" />
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="hover:bg-error/10 hover:text-error"
            />
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-surface rounded-neo overflow-hidden border border-border">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={currentImage}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={() => setIsImageLoading(false)}
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePreviousImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-neo border border-border rounded-neo flex items-center justify-center text-text-primary hover:bg-primary/20 hover:border-primary/30 transition-all duration-micro"
                      >
                        <Icon name="ChevronLeft" size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-neo border border-border rounded-neo flex items-center justify-center text-text-primary hover:bg-primary/20 hover:border-primary/30 transition-all duration-micro"
                      >
                        <Icon name="ChevronRight" size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded-neo overflow-hidden border-2 transition-all duration-micro ${
                          index === currentImageIndex
                            ? 'border-primary shadow-glow-primary'
                            : 'border-border hover:border-border-active'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    iconName="ExternalLink"
                    iconPosition="left"
                    onClick={handleDemoClick}
                    className="flex-1"
                  >
                    View Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Github"
                    iconPosition="left"
                    onClick={handleGithubClick}
                    className="flex-1"
                  >
                    GitHub Repo
                  </Button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                    Project Overview
                  </h3>
                  <p className="text-text-secondary font-body leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-caption font-medium rounded-neo border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                {project.challenges && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                      Challenges & Solutions
                    </h3>
                    <div className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="p-4 bg-surface/50 rounded-neo border border-border">
                          <h4 className="font-body font-medium text-text-primary mb-2">
                            {challenge.title}
                          </h4>
                          <p className="text-text-secondary text-sm">
                            {challenge.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {project.features && (
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface/30 rounded-neo border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="font-caption text-sm text-text-secondary">Duration</span>
                    </div>
                    <span className="font-body font-medium text-text-primary">{project.duration}</span>
                  </div>
                  <div className="p-4 bg-surface/30 rounded-neo border border-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="font-caption text-sm text-text-secondary">Team Size</span>
                    </div>
                    <span className="font-body font-medium text-text-primary">{project.teamSize || 'Solo Project'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;