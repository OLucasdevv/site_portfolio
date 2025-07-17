import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectImageCarousel = ({ images = [], projectTitle = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (images.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  const handlePrevious = () => {
    if (isLoading || images.length === 0) return;
    setIsLoading(true);
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleNext = () => {
    if (isLoading || images.length === 0) return;
    setIsLoading(true);
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleThumbnailClick = (index) => {
    if (isLoading || index === currentIndex) return;
    setIsLoading(true);
    setCurrentIndex(index);
    setTimeout(() => setIsLoading(false), 300);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-surface rounded-neo flex items-center justify-center border border-border">
        <div className="text-center">
          <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary font-caption">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-image-carousel">
      {/* Main Image Display */}
      <div className="relative group">
        <div 
          className="relative w-full h-64 md:h-80 lg:h-96 bg-surface rounded-neo overflow-hidden border border-border"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={images[currentIndex]?.url || images[currentIndex]}
            alt={`${projectTitle} - Screenshot ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoading ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={isLoading}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-micro"
                aria-label="Previous image"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleNext}
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-micro"
                aria-label="Next image"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-neo px-3 py-1">
              <span className="text-text-primary font-caption text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Mobile Swipe Indicator */}
          <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border rounded-neo px-3 py-1">
            <Icon name="ChevronLeft" size={14} className="text-text-secondary" />
            <span className="text-text-secondary font-caption text-xs">Swipe</span>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                disabled={isLoading}
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
                  <Image
                    src={image?.url || image}
                    alt={`${projectTitle} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {index === currentIndex && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-glow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {images.length > 1 && (
        <div className="mt-3">
          <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-component shadow-glow-primary"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;