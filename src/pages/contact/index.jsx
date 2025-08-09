import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import ContactSuccess from './components/ContactSuccess';
import Icon from '../../components/AppIcon';
import { useLanguage } from '../../contexts/LanguageContext';


const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
    const { t } = useLanguage();

  useEffect(() => {
    // Simulate page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Form submitted:', formData);
      
      setSubmittedData(formData);
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSubmittedData(null);
  };

  return (
    <>
      <Helmet>
        <title>Contact - Lucas Portfolio Hub</title>
        <meta name="description" content="Get in touch with Lucas, a passionate front-end developer specializing in React and modern web technologies. Available for new projects and collaborations." />
        <meta name="keywords" content="contact, hire developer, front-end developer, React developer, web development services" />
        <meta property="og:title" content="Contact Lucas - Front-End Developer" />
        <meta property="og:description" content="Ready to bring your ideas to life? Contact Lucas for your next web development project." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center space-y-6 transition-all duration-page ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-neo px-4 py-2">
                <Icon name="MessageCircle" size={18} className="text-primary" />
                <span className="font-caption text-sm text-primary font-medium">
                  {t("contactPreview.title")}
                </span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-text-primary">
                {t("contactTitle.title1")}
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t("contactTitle.title2")}
                </span>
              </h1>
              
              <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
                {t("contactTitle.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-page delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <ContactForm 
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>

              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>  

        {/* FAQ Section */}
        <section className="pb-20 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className={`transition-all duration-page delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl text-text-primary mb-4">
                  {t("faq.title")}
                </h2>
                <p className="font-body text-text-secondary">
                  {t("faq.subtitle")}
                </p>
              </div>
              

              <div className="space-y-4">
                {[
                  {
                    question: t("faq.question01.title"),
                    answer: t("faq.question01.subtitle")
                  },
                  {
                    question: t("faq.question02.title"),
                    answer: t("faq.question02.subtitle")
                  },
                  {
                    question: t("faq.question03.title"),
                    answer: t("faq.question03.subtitle")
                  },
                  {
                    question: t("faq.question04.title"),
                    answer: t("faq.question04.subtitle")
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-surface border border-border rounded-neo p-6 shadow-neo-ambient">
                    <h3 className="font-heading font-semibold text-text-primary mb-2 flex items-center space-x-2">
                      <Icon name="HelpCircle" size={18} className="text-primary" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="font-body text-text-secondary pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-surface/50 py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-neo flex items-center justify-center">
                  <span className="text-background font-heading font-bold">L</span>
                </div>
                <span className="font-heading font-bold text-text-primary">Lucas Portfolio Hub</span>
              </div>
              
              <p className="font-body text-text-secondary">
                Building the future, one line of code at a time.
              </p>
              
              <p className="font-caption text-sm text-text-secondary">
                © {new Date().getFullYear()} Lucas. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Success Modal */}
        {showSuccess && (
          <ContactSuccess 
            onClose={handleSuccessClose}
            formData={submittedData}
          />
        )}
      </div>
    </>
  );
};

export default Contact;