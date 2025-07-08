import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Icon from '../AppIcon';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    { label: t('nav.home'), path: '/home-landing-page', icon: 'Home' },
    { label: t('nav.about'), path: '/about-me', icon: 'User' },
    { label: t('nav.projects'), path: '/projects-portfolio', icon: 'Code' },
    { label: t('nav.contact'), path: '/contact', icon: 'Mail' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-navigation transition-all duration-component ${
          isScrolled 
            ? 'bg-surface/95 backdrop-blur-neo border-b border-border shadow-neo-ambient' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/home-landing-page" 
              className="flex items-center space-x-3 group animate-micro hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center shadow-neo-primary">
                  <span className="text-background font-heading font-bold text-lg">L</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-neo opacity-20 group-hover:opacity-40 transition-opacity duration-micro blur-sm"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl text-text-primary group-hover:text-primary transition-colors duration-micro">
                  Lucas
                </h1>
                <p className="font-caption text-xs text-text-secondary -mt-1">
                  Portfolio Hub
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-neo font-body font-medium transition-all duration-micro group ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/10 shadow-glow-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className={`transition-colors duration-micro ${
                      isActiveRoute(item.path) ? 'text-primary' : 'text-current'
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActiveRoute(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Toggle mobile menu"
              >
                <Icon 
                  name={isMobileMenuOpen ? 'X' : 'Menu'} 
                  size={24} 
                  className="text-text-primary"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-mobile-menu lg:hidden">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-neo"
            onClick={closeMobileMenu}
          ></div>
          
          <div className="relative h-full flex flex-col">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link 
                to="/home-landing-page" 
                className="flex items-center space-x-3"
                onClick={closeMobileMenu}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center">
                  <span className="text-background font-heading font-bold">L</span>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-lg text-text-primary">Lucas</h1>
                  <p className="font-caption text-xs text-text-secondary -mt-1">Portfolio Hub</p>
                </div>
              </Link>
              
              <Button
                variant="ghost"
                onClick={closeMobileMenu}
                className="p-2"
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} className="text-text-primary" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-4">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-4 p-4 rounded-neo transition-all duration-micro group ${
                      isActiveRoute(item.path)
                        ? 'text-primary bg-primary/10 shadow-glow-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-neo transition-colors duration-micro ${
                      isActiveRoute(item.path) 
                        ? 'bg-primary/20 text-primary' :'bg-surface text-text-secondary group-hover:text-text-primary'
                    }`}>
                      <Icon name={item.icon} size={20} />
                    </div>
                    <div>
                      <span className="font-body font-medium text-lg">{item.label}</span>
                      {isActiveRoute(item.path) && (
                        <div className="w-4 h-0.5 bg-primary rounded-full mt-1"></div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-border">
              <div className="text-center">
                <p className="font-caption text-sm text-text-secondary">
                  {t('footer.ready')}
                </p>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center space-x-2 mt-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-background font-body font-semibold rounded-neo shadow-neo-primary hover:shadow-glow-primary transition-all duration-micro"
                >
                  <Icon name="ArrowRight" size={18} />
                  <span>{t('footer.getInTouch')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;