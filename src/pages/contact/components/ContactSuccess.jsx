import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext';

const ContactSuccess = ({ onClose, formData }) => {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);
  const { t } = useLanguage();
  const expectedResponseTime = t("contactSuccess.happensNext.responseTime");
  const currentTime = new Date().toLocaleString();
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-neo">
      <div className="w-full max-w-md bg-surface border border-border rounded-neo p-8 shadow-neo-primary animate-scale-in">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="relative inline-flex">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center shadow-neo-primary">
              <Icon name="CheckCircle" size={32} className="text-white" />
            </div>
            <div className="absolute -inset-2 bg-success/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="font-heading font-bold text-2xl text-text-primary">
            {t("contactSuccess.title")}
          </h2>
          <p className="font-body text-text-secondary">
            {t("contactSuccess.subtitle1")} {formData?.name || 'there'}! {t("contactSuccess.subtitle2")} 
          </p>
        </div>

        {/* Message Summary */}
        <div className="bg-background/50 rounded-neo p-4 border border-border mb-6 space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary"> {t("contactSuccess.messageSummary.from")} :</span>
            <span className="font-body text-sm text-text-primary">{formData?.name}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">{t("contactSuccess.messageSummary.email")}:</span>
            <span className="font-body text-sm text-text-primary">{formData?.email}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">{t("contactSuccess.messageSummary.subject")}:</span>
            <span className="font-body text-sm text-text-primary">{formData?.subject}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">{t("contactSuccess.messageSummary.sent")}:</span>
            <span className="font-body text-sm text-text-primary">{currentTime}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary/10 border border-primary/20 rounded-neo p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-semibold text-text-primary mb-1">
                {t("contactSuccess.happensNext.title")}
              </h3>
              <ul className="space-y-1 text-sm text-text-secondary font-caption">
                <li>• {t("contactSuccess.happensNext.li1")}</li>
                <li>• {t("contactSuccess.happensNext.li2")} {expectedResponseTime}</li>
                <li>• {t("contactSuccess.happensNext.li3")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={onClose}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            {t("contactSuccess.button1")}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/projects-portfolio'}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            {t("contactSuccess.button2")}
          </Button>
        </div>

        {/* Auto-close indicator */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-text-secondary text-sm font-caption">
            <Icon name="Timer" size={14} />
            <span>{t("contactSuccess.disclaimer")}</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors duration-micro"
          aria-label="Close success message"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContactSuccess;