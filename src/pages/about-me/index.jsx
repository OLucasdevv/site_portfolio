import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import PersonalIntroduction from './components/PersonalIntroduction';
import SkillsShowcase from './components/SkillsShowcase';
import EducationTimeline from './components/EducationTimeline';
import PersonalValues from './components/PersonalValues';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutMe = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');
  const { t } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'skills', 'education', 'values'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationSections = [
  { id: 'introduction', label: t('about.nav.introduction'), icon: 'User' },
  { id: 'skills', label: t('about.nav.skills'), icon: 'Code' },
  { id: 'education', label: t('about.nav.education'), icon: 'GraduationCap' },
  { id: 'values', label: t('about.nav.values'), icon: 'Heart' }
];


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="font-body text-text-secondary">Loading my story...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>About Me - Lucas Eduardo | Web Developer & Cybersecurity Enthusiast</title>
        <meta name="description" content="Learn about Lucas Eduardo, a passionate programming student specializing in front-end development and cybersecurity. Discover my journey, skills, and values." />
        <meta name="keywords" content="Lucas Eduardo,Web developer, cybersecurity, React developer, programming student, web development, portfolio" />
        <meta property="og:title" content="About Me - Lucas Eduardo" />
        <meta property="og:description" content="Passionate programming student with expertise in React development and cybersecurity interests." />
        <meta property="og:type" content="profile" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Hero Section */}
          <section className="relative pt-20 lg:pt-24 pb-12 lg:pb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-neo text-primary font-caption text-sm"
                >
                  <Icon name="Sparkles" size={16} />
                  <span> {t("indexAboutMeSubtitle.getToKnow")}  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-heading font-bold text-4xl lg:text-6xl text-text-primary"
                >
                  {t("indexAboutMe.about")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t("indexAboutMe.lucas")}</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-body text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                >
                  {t("indexAboutMeSubtitle.subtitle")}
                </motion.p>
              </div>
            </div>
          </section>

          {/* Sticky Navigation */}
          <div className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-neo border-b border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <nav className="flex items-center justify-center lg:justify-start space-x-1 py-4 overflow-x-auto scrollbar-hide">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-neo font-body font-medium transition-all duration-micro whitespace-nowrap ${
                      activeSection === section.id
                        ? 'text-primary bg-primary/10 shadow-glow-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon name={section.icon} size={16} />
                    <span className="hidden sm:inline">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-8 space-y-16 lg:space-y-24">
                {/* Personal Introduction */}
                <motion.section
                  id="introduction"
                  variants={sectionVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <PersonalIntroduction />
                </motion.section>

                {/* Skills Showcase */}
                <motion.section
                  id="skills"
                  variants={sectionVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <SkillsShowcase />
                </motion.section>

                {/* Education Timeline */}
                <motion.section
                  id="education"
                  variants={sectionVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <EducationTimeline />
                </motion.section>

                {/* Personal Values */}
                <motion.section
                  id="values"
                  variants={sectionVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <PersonalValues />
                </motion.section>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  {/* Quick Stats */}
                  <motion.div
                    variants={sectionVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo"
                  >
                    <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
                      <Icon name="BarChart3" size={18} className="text-primary" />
                      <span> {t("quickStats.title")} </span>
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        { label: t("quickStats.years"), value: "2+", icon: "Calendar" },
                        { label: t("quickStats.projects"), value: "2+", icon: "Code" },
                        { label: t("quickStats.tech"), value: "10+", icon: "Layers" },
                        { label: t("quickStats.certifications"), value: "0", icon: "Award" }
                      ].map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon name={stat.icon} size={14} className="text-primary" />
                            <span className="font-caption text-sm text-text-secondary">{stat.label}</span>
                          </div>
                          <span className="font-body font-bold text-text-primary">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Current Status */}
                  <motion.div
                    variants={sectionVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-success/10 to-emerald-500/10 border border-success/30 rounded-neo p-6 backdrop-blur-neo"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <h3 className="font-heading font-bold text-lg text-text-primary"> {t("currently.title")} </h3>
                    </div>
                    
                    <p className="font-body text-text-secondary leading-relaxed mb-4">
                      {t("currently.subtitles")}
                    </p>
                    
                    <div className="flex flex-col space-y-2">
                      <Link to="/projects-portfolio">
                        <Button variant="success" className="w-full" iconName="Eye" iconPosition="left">
                          {t("currently.button")}
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full" iconName="Mail" iconPosition="left">
                          {t("currently.touch")}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>

                  {/* Fun Facts */}
                  <motion.div
                    variants={sectionVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="bg-surface/50 border border-border rounded-neo p-6 backdrop-blur-neo"
                  >
                    <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center space-x-2">
                      <Icon name="Zap" size={18} className="text-primary" />
                      <span> {t("funFacts.title")} </span>
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        t("funFacts.sub1"),
                        t("funFacts.sub2"),
                        t("funFacts.sub3"),
                        t("funFacts.sub4")
                      ].map((fact, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="font-caption text-sm text-text-secondary">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </main>

          {/* Call to Action Section */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-primary">
                  {t("collab.title1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> {t("collab.title2")} </span>?
                </h2>
                
                <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
                  {t("collab.subtitle")}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link to="/projects-portfolio">
                    <Button variant="primary" iconName="Code" iconPosition="left" className="w-full sm:w-auto">
                      {t("collab.button1")}
                    </Button>
                  </Link>
                  
                  <Link to="/contact">
                    <Button variant="outline" iconName="Send" iconPosition="left" className="w-full sm:w-auto">
                      {t("collab.button2")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default AboutMe;