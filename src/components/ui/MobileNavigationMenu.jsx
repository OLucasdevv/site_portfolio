import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigationMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [animationClass, setAnimationClass] = useState('');

  const navigationItems = [
    { label: 'Home', path: '/home-landing-page', icon: 'Home', description: 'Welcome & Featured Work' },
    { label: 'About', path: '/about-me', icon: 'User', description: 'Background & Skills' },
    { label: 'Projects', path: '/projects-portfolio', icon: 'Code', description: 'Technical Showcase' },
    { label: 'Contact', path: '/contact', icon: 'Mail', description: 'Let\'s Connect' }
  ];

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slide-down');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('animate-slide-up');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-mobile-menu lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-neo animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className={`relative h-full flex flex-col glass ${animationClass}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center shadow-neo-primary">
              <span className="text-background font-heading font-bold">L</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-text-primary">Navigation</h2>
              <p className="font-caption text-xs text-text-secondary -mt-1">Choose your destination</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 hover:bg-surface/50"
            aria-label="Close navigation menu"
          >
            <Icon name="X" size={24} className="text-text-primary" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="space-y-3">
            {navigationItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`block p-4 rounded-neo transition-all duration-micro group hover-lift ${
                  isActiveRoute(item.path)
                    ? 'bg-primary/10 border border-primary/30 shadow-glow-primary'
                    : 'bg-surface/30 border border-border hover:bg-surface/50 hover:border-border-active'
                }`}
                style={{ 
                  animationDelay: `${(index + 1) * 100}ms`,
                  animation: 'slideUp 400ms cubic-bezier(0.4, 0, 0.2, 1) both'
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-neo transition-all duration-micro ${
                    isActiveRoute(item.path)
                      ? 'bg-primary/20 text-primary shadow-glow-primary'
                      : 'bg-surface text-text-secondary group-hover:text-text-primary group-hover:bg-primary/10'
                  }`}>
                    <Icon name={item.icon} size={22} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-body font-semibold text-lg transition-colors duration-micro ${
                        isActiveRoute(item.path) ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                      }`}>
                        {item.label}
                      </h3>
                      {isActiveRoute(item.path) && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
                      )}
                    </div>
                    <p className="font-caption text-sm text-text-secondary mt-1 group-hover:text-text-primary transition-colors duration-micro">
                      {item.description}
                    </p>
                    {isActiveRoute(item.path) && (
                      <div className="w-8 h-0.5 bg-primary rounded-full mt-2 animate-scale-in"></div>
                    )}
                  </div>
                  
                  <Icon 
                    name="ChevronRight" 
                    size={18} 
                    className={`transition-all duration-micro ${
                      isActiveRoute(item.path) 
                        ? 'text-primary transform translate-x-1' 
                        : 'text-text-secondary group-hover:text-primary group-hover:transform group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="p-6 border-t border-border bg-surface/20">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-heading font-semibold text-text-primary">Ready to collaborate?</h3>
              <p className="font-caption text-sm text-text-secondary mt-1">
                Let's discuss your next project
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background font-body font-semibold rounded-neo shadow-neo-primary hover:shadow-glow-primary transition-all duration-micro hover-lift"
              >
                <Icon name="Send" size={18} />
                <span>Start Conversation</span>
              </Link>
              
              <Link
                to="/projects-portfolio"
                onClick={handleNavClick}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-surface border border-border text-text-primary font-body font-medium rounded-neo hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-micro"
              >
                <Icon name="Eye" size={18} />
                <span>View My Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationMenu;