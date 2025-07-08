import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactPreview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: "Mail",
      title: "Email",
      description: "lucas@example.com",
      action: "mailto:lucas@example.com",
      color: "primary"
    },
    {
      icon: "Linkedin",
      title: "LinkedIn",
      description: "Connect professionally",
      action: "https://linkedin.com/in/lucas-dev",
      color: "secondary"
    },
    {
      icon: "Github",
      title: "GitHub",
      description: "View my repositories",
      action: "https://github.com/lucas-dev",
      color: "accent"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  const getColorClass = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10 border-primary/30';
      case 'secondary':
        return 'text-secondary bg-secondary/10 border-secondary/30';
      case 'accent':
        return 'text-accent bg-accent/10 border-accent/30';
      default:
        return 'text-primary bg-primary/10 border-primary/30';
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-surface/50 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icon name="MessageCircle" size={28} className="text-primary" />
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-text-primary">
              Let's Connect
            </h2>
          </div>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? I'm always excited to discuss new opportunities 
            and innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-text-primary mb-6">
                Get In Touch
              </h3>
              <p className="font-body text-text-secondary mb-8 leading-relaxed">
                Whether you have a project in mind, want to discuss collaboration opportunities, 
                or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : '_self'}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center space-x-4 p-4 bg-surface border border-border rounded-neo hover:border-primary/30 hover:shadow-glow-primary transition-all duration-component hover-lift group"
                >
                  <div className={`w-12 h-12 rounded-neo border flex items-center justify-center transition-all duration-micro ${getColorClass(method.color)}`}>
                    <Icon name={method.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-body font-semibold text-text-primary group-hover:text-primary transition-colors duration-micro">
                      {method.title}
                    </h4>
                    <p className="font-caption text-sm text-text-secondary">
                      {method.description}
                    </p>
                  </div>
                  <Icon name="ArrowUpRight" size={18} className="text-text-secondary group-hover:text-primary transition-colors duration-micro" />
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-primary/5 border border-primary/20 rounded-neo p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Clock" size={20} className="text-primary" />
                <h4 className="font-body font-semibold text-text-primary">
                  Response Time
                </h4>
              </div>
              <p className="font-caption text-text-secondary">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                feel free to reach out via LinkedIn for faster response.
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-surface border border-border rounded-neo p-8">
            <h3 className="font-heading font-bold text-2xl text-text-primary mb-6">
              Send a Message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-neo flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="font-body text-success">
                  Message sent successfully! I'll get back to you soon.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-body font-medium text-text-primary mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-body font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-body font-medium text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or inquiry..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-neo text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-micro resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                loading={isSubmitting}
                iconName={isSubmitting ? "Loader" : "Send"}
                iconPosition="right"
                className="w-full py-3 font-semibold"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-caption text-sm text-text-secondary text-center">
                For detailed inquiries, visit my{' '}
                <Link 
                  to="/contact" 
                  className="text-primary hover:underline transition-colors duration-micro"
                >
                  full contact page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;