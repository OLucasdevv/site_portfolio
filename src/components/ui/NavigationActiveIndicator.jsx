import React from 'react';
import { useLocation } from 'react-router-dom';

const NavigationActiveIndicator = ({ 
  navigationItems, 
  variant = 'underline', 
  className = '',
  showLabel = false 
}) => {
  const location = useLocation();

  const getActiveItem = () => {
    return navigationItems.find(item => item.path === location.pathname);
  };

  const getActiveIndex = () => {
    return navigationItems.findIndex(item => item.path === location.pathname);
  };

  const activeItem = getActiveItem();
  const activeIndex = getActiveIndex();

  if (!activeItem || activeIndex === -1) return null;

  const renderUnderlineIndicator = () => (
    <div className="relative">
      <div 
        className={`absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-component ${className}`}
        style={{
          left: `${(activeIndex * 100) / navigationItems.length}%`,
          width: `${100 / navigationItems.length}%`,
        }}
      />
      <div 
        className="absolute bottom-0 h-0.5 bg-primary/30 rounded-full animate-glow"
        style={{
          left: `${(activeIndex * 100) / navigationItems.length}%`,
          width: `${100 / navigationItems.length}%`,
        }}
      />
    </div>
  );

  const renderDotIndicator = () => (
    <div className="flex items-center justify-center space-x-2">
      {navigationItems.map((item, index) => (
        <div
          key={item.path}
          className={`w-2 h-2 rounded-full transition-all duration-micro ${
            index === activeIndex
              ? 'bg-primary shadow-glow-primary scale-125'
              : 'bg-text-secondary/30 hover:bg-text-secondary/50'
          }`}
        />
      ))}
    </div>
  );

  const renderProgressIndicator = () => {
    const progress = ((activeIndex + 1) / navigationItems.length) * 100;
    
    return (
      <div className={`relative w-full h-1 bg-surface rounded-full overflow-hidden ${className}`}>
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-component shadow-glow-primary"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute top-0 left-0 h-full bg-primary/20 rounded-full animate-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderBreadcrumbIndicator = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      {navigationItems.slice(0, activeIndex + 1).map((item, index) => (
        <React.Fragment key={item.path}>
          <div className={`flex items-center space-x-2 ${
            index === activeIndex ? 'text-primary' : 'text-text-secondary'
          }`}>
            <div className={`w-2 h-2 rounded-full transition-colors duration-micro ${
              index === activeIndex ? 'bg-primary animate-glow' : 'bg-text-secondary/50'
            }`} />
            {showLabel && (
              <span className={`font-caption text-sm transition-colors duration-micro ${
                index === activeIndex ? 'text-primary font-medium' : 'text-text-secondary'
              }`}>
                {item.label}
              </span>
            )}
          </div>
          {index < activeIndex && (
            <div className="w-4 h-px bg-text-secondary/30" />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderGlowIndicator = () => (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 bg-primary/10 rounded-neo border border-primary/30 shadow-glow-primary animate-glow"
        style={{
          left: `${(activeIndex * 100) / navigationItems.length}%`,
          width: `${100 / navigationItems.length}%`,
        }}
      />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dot':
        return renderDotIndicator();
      case 'progress':
        return renderProgressIndicator();
      case 'breadcrumb':
        return renderBreadcrumbIndicator();
      case 'glow':
        return renderGlowIndicator();
      case 'underline':
      default:
        return renderUnderlineIndicator();
    }
  };

  return (
    <div className="navigation-active-indicator">
      {renderVariant()}
      {showLabel && variant === 'underline' && (
        <div className="mt-2 text-center">
          <span className="font-caption text-xs text-primary font-medium">
            {activeItem.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default NavigationActiveIndicator;