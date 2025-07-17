import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectModalHeader = ({ 
  title = '',
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  currentIndex = 0,
  totalProjects = 0,
  isLoading = false
}) => {
  return (
    <div className="project-modal-header sticky top-0 z-10 bg-background/95 backdrop-blur-neo border-b border-border">
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Left Section - Project Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={18} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">
              {totalProjects > 0 ? `${currentIndex + 1} of ${totalProjects}` : 'Project Details'}
            </span>
          </div>
          
          {title && (
            <div className="hidden sm:block">
              <h2 className="font-heading font-semibold text-lg text-text-primary truncate max-w-xs lg:max-w-md">
                {title}
              </h2>
            </div>
          )}
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-2">
          {/* Navigation Controls */}
          {totalProjects > 1 && (
            <>
              <Button
                variant="ghost"
                onClick={onPrevious}
                disabled={!hasPrevious || isLoading}
                className="p-2 hover:bg-primary/10 disabled:opacity-50"
                aria-label="Previous project"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={onNext}
                disabled={!hasNext || isLoading}
                className="p-2 hover:bg-primary/10 disabled:opacity-50"
                aria-label="Next project"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </Button>
              
              <div className="w-px h-6 bg-border mx-2" />
            </>
          )}
          
          {/* Close Button */}
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

      {/* Mobile Title */}
      {title && (
        <div className="sm:hidden px-4 pb-4">
          <h2 className="font-heading font-semibold text-lg text-text-primary">
            {title}
          </h2>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
        </div>
      )}

      {/* Progress Indicator */}
      {totalProjects > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-component shadow-glow-primary"
            style={{ 
              width: `${((currentIndex + 1) / totalProjects) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectModalHeader;