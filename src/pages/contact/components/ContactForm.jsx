import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useLanguage } from '../../../contexts/LanguageContext';

const ContactForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { t } = useLanguage();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? t("contactForm.nameField.disclaimer") : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? t("contactForm.emailField.disclaimer") : '';
      case 'subject':
        return value.trim().length < 5 ? t("contactForm.subjectField.disclaimer") : '';
      case 'message':
        return value.trim().length < 10 ? t("contactForm.messageField.disclaimer") : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const isFormValid = Object.keys(formData).every(key => 
    formData[key].trim() && !validateField(key, formData[key])
  );

  return (
    <div className="bg-surface border border-border rounded-neo p-6 lg:p-8 shadow-neo-ambient">
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">
          {t("contactForm.title1")} <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("contactForm.title2")}</span>
        </h2>
        <p className="font-body text-text-secondary">
          {t("contactForm.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block font-body font-medium text-text-primary">
            {t("contactForm.nameField.title")}
          </label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder= {t("contactForm.nameField.placeholder")}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${errors.name ? 'border-error focus:border-error' : ''}`}
              disabled={isSubmitting}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="User" size={18} className="text-text-secondary" />
            </div>
          </div>
          {errors.name && touched.name && (
            <p className="text-error text-sm font-caption flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-body font-medium text-text-primary">
            {t("contactForm.emailField.title")}
          </label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("contactForm.emailField.placeholder")}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${errors.email ? 'border-error focus:border-error' : ''}`}
              disabled={isSubmitting}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Mail" size={18} className="text-text-secondary" />
            </div>
          </div>
          {errors.email && touched.email && (
            <p className="text-error text-sm font-caption flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label htmlFor="subject" className="block font-body font-medium text-text-primary">
            {t("contactForm.subjectField.title")}
          </label>
          <div className="relative">
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder={t("contactForm.subjectField.placeholder")}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${errors.subject ? 'border-error focus:border-error' : ''}`}
              disabled={isSubmitting}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Tag" size={18} className="text-text-secondary" />
            </div>
          </div>
          {errors.subject && touched.subject && (
            <p className="text-error text-sm font-caption flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block font-body font-medium text-text-primary">
            {t("contactForm.messageField.title")}
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("contactForm.messageField.placeholder")}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 bg-background border rounded-neo font-body text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-micro ${
                errors.message ? 'border-error focus:border-error focus:ring-error' : 'border-border'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <div className="absolute right-3 top-3">
              <Icon name="MessageSquare" size={18} className="text-text-secondary" />
            </div>
          </div>
          {errors.message && touched.message && (
            <p className="text-error text-sm font-caption flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.message}</span>
            </p>
          )}
          <div className="flex justify-between items-center">
            <p className="text-text-secondary text-sm font-caption">
              {t("contactForm.messageField.minimum")}
            </p>
            <p className="text-text-secondary text-sm font-caption">
              {formData.message.length}/500
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid || isSubmitting}
            loading={isSubmitting}
            iconName={isSubmitting ? "Loader2" : "Send"}
            iconPosition="right"
            className="w-full"
          >
            {isSubmitting ? t("sendMessage.messageButton.submitting") : t("sendMessage.messageButton.send")}
          </Button>
        </div>

        {/* Form Footer */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-text-secondary text-sm font-caption">
            <Icon name="Shield" size={16} />
            <span> {t("contactForm.secure")} </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;