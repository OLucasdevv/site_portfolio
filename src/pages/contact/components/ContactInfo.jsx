import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

const ContactInfo = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [resumeDownloading, setResumeDownloading] = useState(false);
  const { t, language } = useLanguage();  // Pega o language aqui

  const contactDetails = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'olucasdevv@gmail.com',
      href: null,
      description: t("available.reach")
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+55 (61) 98295-4380',
      href: null,
      description: t("location.status")
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: t("location.title"),
      href: null,
      description: t("location.subtitle")
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: t("location.responseTime"),
      href: null,
      description: t("location.responseTimesub")
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'Github',
      url: 'https://github.com/OLucasdevv',
      color: 'text-text-primary hover:text-primary',
      description: t("connectWithMe.github")
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://www.linkedin.com/in/lucas-eduardo-23b7a8350',
      color: 'text-text-primary hover:text-blue-400',
      description: t("connectWithMe.linkedIn")
    },
  ];

  const availabilityStatus = {
    status: 'available',
    message: t("available.subtitle"),
    nextAvailable: null
  };

  const handleResumeDownload = () => {
    setResumeDownloading(true);

    setTimeout(() => {
      const resumeUrl = language === 'pt' 
        ? '/assets/images/resume/curriculo-(pt).pdf'
        : '/assets/images/resume/curriculo-(ingles).pdf';

      const resumeFileName = language === 'pt' 
        ? 'curriculo-(pt).pdf'
        : 'curriculo-(ingles).pdf';

      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = resumeFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setResumeDownloading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'busy':
        return 'text-warning';
      case 'unavailable':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'busy':
        return 'Clock';
      case 'unavailable':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Availability Status */}
      <div className="bg-surface border border-border rounded-neo p-6 shadow-neo-ambient">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <Icon 
              name={getStatusIcon(availabilityStatus.status)} 
              size={24} 
              className={getStatusColor(availabilityStatus.status)}
            />
            {availabilityStatus.status === 'available' && (
              <div className="absolute -inset-1 bg-success/20 rounded-full animate-ping"></div>
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">
              {t("available.title")}
            </h3>
            <p className={`font-body text-sm ${getStatusColor(availabilityStatus.status)}`}>
              {availabilityStatus.message}
            </p>
          </div>
        </div>
        
        <div className="bg-background/50 rounded-neo p-4 border border-border">
          <div className="flex items-center space-x-2 text-text-secondary text-sm font-caption">
            <Icon name="Calendar" size={16} />
            <span>
              {availabilityStatus.status === 'available' ? t("available.start") 
                : `Next available: ${availabilityStatus.nextAvailable}`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-surface border border-border rounded-neo p-6 shadow-neo-ambient">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-6">
          {t("footer.getInTouch")}
        </h3>
        
        <div className="space-y-4">
          {contactDetails.map((detail, index) => (
            <div key={index} className="group">
              {detail.href ? (
                <a
                  href={detail.href}
                  className="flex items-start space-x-4 p-3 rounded-neo hover:bg-background/50 transition-all duration-micro hover-lift"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-neo flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-micro">
                    <Icon name={detail.icon} size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-text-primary group-hover:text-primary transition-colors duration-micro">
                      {detail.value}
                    </p>
                    <p className="font-caption text-sm text-text-secondary">
                      {detail.description}
                    </p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-text-secondary group-hover:text-primary transition-colors duration-micro" />
                </a>
              ) : (
                <div className="flex items-start space-x-4 p-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-neo flex items-center justify-center">
                    <Icon name={detail.icon} size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-text-primary">
                      {detail.value}
                    </p>
                    <p className="font-caption text-sm text-text-secondary">
                      {detail.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-surface border border-border rounded-neo p-6 shadow-neo-ambient">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-6">
          {t("connectWithMe.title1")} <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("connectWithMe.title2")}</span>?
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="group flex items-center space-x-3 p-4 bg-background/50 rounded-neo border border-border hover:border-border-active transition-all duration-micro hover-lift"
            >
              <div className={`flex-shrink-0 transition-colors duration-micro ${social.color}`}>
                <Icon name={social.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-text-primary group-hover:text-primary transition-colors duration-micro">
                  {social.name}
                </p>
                {hoveredSocial === social.name && (
                  <p className="font-caption text-xs text-text-secondary animate-fade-in">
                    {social.description}
                  </p>
                )}
              </div>
              <Icon name="ExternalLink" size={14} className="text-text-secondary group-hover:text-primary transition-colors duration-micro" />
            </a>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      <div className="bg-surface border border-border rounded-neo p-6 shadow-neo-ambient">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center mx-auto shadow-neo-primary">
            <Icon name="FileText" size={24} className="text-background" />
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
              {t("download.title")}
            </h3>
            <p className="font-body text-text-secondary">
              {t("download.subtitle")}
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={handleResumeDownload}
            disabled={resumeDownloading}
            loading={resumeDownloading}
            iconName={resumeDownloading ? "Loader2" : "Download"}
            iconPosition="left"
            className="w-full"
          >
            {resumeDownloading ? 'Preparing Download...' : 'Download Resume (PDF)'}
          </Button>
          
          <div className="flex items-center justify-center space-x-2 text-text-secondary text-sm font-caption">
            <Icon name="Shield" size={14} />
            <span>Updated {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Personal Motto */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-neo p-6 shadow-glow-primary">
        <div className="text-center">
          <Icon name="Quote" size={32} className="text-primary mx-auto mb-4" />
          <blockquote className="font-heading font-bold text-xl text-text-primary mb-2">
            "Coding with purpose, learning with passion"
          </blockquote>
          <p className="font-body text-text-secondary">
            My approach to development and continuous growth
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

