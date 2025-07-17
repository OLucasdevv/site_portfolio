import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import SkillsOverview from './components/SkillsOverview';
import ContactPreview from './components/ContactPreview';

const HomeLandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Lucas - Frontend Developer & Programming Student | Portfolio Hub</title>
        <meta 
          name="description" 
          content="Welcome to Lucas's portfolio - a passionate programming student specializing in frontend development and cybersecurity. Explore my projects, skills, and professional journey." 
        />
        <meta name="keywords" content="Lucas, frontend developer, programming student, cybersecurity, React, JavaScript, portfolio, web development" />
        <meta name="author" content="Lucas" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Lucas - Frontend Developer & Programming Student" />
        <meta property="og:description" content="Passionate programming student with expertise in frontend development and cybersecurity. Coding with purpose, learning with passion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lucas-portfolio-hub.netlify.app" />
        <meta property="og:image" content="/assets/images/profile_pic.jpeg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lucas - Frontend Developer & Programming Student" />
        <meta name="twitter:description" content="Passionate programming student with expertise in frontend development and cybersecurity." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face" />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00D9FF" />
        <link rel="canonical" href="https://lucas-portfolio-hub.netlify.app/home-landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Featured Projects Section */}
          <FeaturedProjects />
          
          {/* Skills Overview Section */}
          <SkillsOverview />
          
          {/* Contact Preview Section */}
          <ContactPreview />
        </main>
      </div>
    </>
  );
};

export default HomeLandingPage;