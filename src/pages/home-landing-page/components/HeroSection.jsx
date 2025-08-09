import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { t, language } = useLanguage(); // <- agora pega language real tipo 'en' ou 'pt'

  const dynamicTexts = t('hero.roles') || [
    "Frontend Developer",
    "Programming Student", 
    "Cybersecurity Enthusiast",
    "Problem Solver"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, [dynamicTexts.length]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 217, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Greeting */}
            <div className="space-y-2">
              <p className="font-caption text-primary font-medium text-lg tracking-wide">
                {t('hero.greeting')}
              </p>
              <h1 className="font-heading font-bold text-5xl lg:text-7xl text-text-primary leading-tight">
                {t('hero.name')}
              </h1>
            </div>

            {/* Dynamic Role Text */}
            <div className="h-16 flex items-center justify-center lg:justify-start">
              <div className="relative overflow-hidden">
                <h2 className="font-body text-2xl lg:text-3xl text-text-secondary font-medium">
                  <span className="inline-block transition-all duration-500 transform">
                    {dynamicTexts[currentTextIndex]}
                  </span>
                </h2>
              </div>
            </div>

            {/* Personal Motto */}
            <div className="relative">
              <blockquote className="font-body text-lg lg:text-xl text-text-primary italic border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-neo">
                "{t('hero.motto')}"
              </blockquote>
            </div>

            {/* Brief Introduction */}
            <p className="font-body text-text-secondary text-lg leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/projects-portfolio">
                <Button 
                  variant="primary" 
                  iconName="Code" 
                  iconPosition="right"
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-neo-primary hover:shadow-glow-primary"
                >
                  {t('hero.viewWork')}
                </Button>
              </Link>          
              <Button 
                variant="outline" 
                iconName="Download" 
                iconPosition="right"
                onClick={() => {
                  const fileName = language === 'en'
                    ? 'curriculo-(ingles).pdf'
                    : 'curriculo-(pt).pdf';

                  const link = document.createElement('a');
                  link.href = `/assets/images/resume/${fileName}`;
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                {t('hero.downloadResume')}
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
              <a 
                href="https://github.com/OLucasdevv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-surface border border-border rounded-neo hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-primary transition-all duration-micro group"
              >
                <Icon name="Github" size={24} className="text-text-secondary group-hover:text-primary" />
              </a>
              <a 
                href="https://www.linkedin.com/in/lucas-eduardo-23b7a8350/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-surface border border-border rounded-neo hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-primary transition-all duration-micro group"
              >
                <Icon name="Linkedin" size={24} className="text-text-secondary group-hover:text-primary" />
              </a>
              <a 
                href="mailto:lucastiusammm@gmail.com"
                className="p-3 bg-surface border border-border rounded-neo hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-primary transition-all duration-micro group"
              >
                <Icon name="Mail" size={24} className="text-text-secondary group-hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Image Column */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-neo-primary">
                <Image
                  src="/assets/images/profile_pic.jpeg"
                  alt="Lucas - Web Developer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-neo flex items-center justify-center animate-bounce">
                <Icon name="Code" size={24} className="text-primary" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-neo flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                <Icon name="Shield" size={24} className="text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center space-y-2 text-text-secondary hover:text-primary transition-colors duration-micro group"
          >
            <span className="font-caption text-sm">{t('hero.exploreMore')}</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
