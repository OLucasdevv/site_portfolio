import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProjectDetailModalNavigation = ({ 
  projects = [], 
  currentProjectId, 
  onProjectChange, 
  onClose,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const index = projects.findIndex(project => project.id === currentProjectId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentProjectId, projects]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects.length]);

  const handlePrevious = () => {
    if (isAnimating || projects.length === 0) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    setCurrentIndex(newIndex);
    onProjectChange(projects[newIndex].id);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleNext = () => {
    if (isAnimating || projects.length === 0) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    onProjectChange(projects[newIndex].id);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleProjectSelect = (projectId, index) => {
    if (isAnimating || projectId === currentProjectId) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    onProjectChange(projectId);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];
  const hasPrevious = projects.length > 1;
  const hasNext = projects.length > 1;

  return (
    <div className={`project-modal-navigation ${className}`}>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50 backdrop-blur-neo">
        {/* Project Counter */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={18} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">
              Project {currentIndex + 1} of {projects.length}
            </span>
          </div>
          
          {currentProject && (
            <div className="hidden sm:block">
              <span className="font-body font-medium text-text-primary">
                {currentProject.title}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={!hasPrevious || isAnimating}
            className="p-2 hover:bg-primary/10"
            aria-label="Previous project"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-primary" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={!hasNext || isAnimating}
            className="p-2 hover:bg-primary/10"
            aria-label="Next project"
          >
            <Icon name="ChevronRight" size={20} className="text-text-primary" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 hover:bg-error/10 hover:text-error"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Project Thumbnails (Desktop) */}
      <div className="hidden lg:block p-4 border-b border-border bg-surface/30">
        <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project.id, index)}
              disabled={isAnimating}
              className={`flex-shrink-0 relative group transition-all duration-micro ${
                index === currentIndex
                  ? 'ring-2 ring-primary shadow-glow-primary'
                  : 'hover:ring-1 hover:ring-border-active'
              }`}
            >
              <div className={`w-16 h-12 rounded-neo overflow-hidden bg-surface border transition-all duration-micro ${
                index === currentIndex 
                  ? 'border-primary' :'border-border group-hover:border-border-active'
              }`}>
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Code" size={16} className="text-text-secondary" />
                  </div>
                )}
              </div>
              
              {index === currentIndex && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-glow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Indicator */}
      <div className="lg:hidden p-3 border-b border-border bg-surface/30">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
          <span className="font-caption text-xs text-text-secondary">
            Swipe to navigate
          </span>
          <Icon name="ChevronRight" size={16} className="text-text-secondary" />
        </div>
      </div>

      {/* Bottom Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-component shadow-glow-primary"
          style={{ 
            width: `${((currentIndex + 1) / projects.length) * 100}%` 
          }}
        />
      </div>

      {/* Keyboard Shortcuts Hint (Desktop) */}
      <div className="hidden xl:block absolute bottom-4 right-4">
        <div className="bg-surface/90 backdrop-blur-neo border border-border rounded-neo p-2">
          <div className="flex items-center space-x-4 text-xs text-text-secondary font-caption">
            <div className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">→</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModalNavigation;