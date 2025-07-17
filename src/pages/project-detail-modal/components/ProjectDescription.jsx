import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectDescription = ({ 
  title = '',
  description = '',
  challenges = [],
  solutions = [],
  features = [],
  learnings = [],
  category = '',
  duration = '',
  status = 'completed'
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'completed': 'text-success',
      'in-progress': 'text-warning',
      'planned': 'text-info',
      'on-hold': 'text-text-secondary'
    };
    return statusColors[status] || 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      'completed': 'CheckCircle',
      'in-progress': 'Clock',
      'planned': 'Calendar',
      'on-hold': 'Pause'
    };
    return statusIcons[status] || 'Circle';
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const sections = [
    {
      id: 'challenges',
      title: 'Technical Challenges',
      icon: 'AlertTriangle',
      data: challenges,
      color: 'text-warning'
    },
    {
      id: 'solutions',
      title: 'Solutions Implemented',
      icon: 'Lightbulb',
      data: solutions,
      color: 'text-success'
    },
    {
      id: 'features',
      title: 'Key Features',
      icon: 'Star',
      data: features,
      color: 'text-primary'
    },
    {
      id: 'learnings',
      title: 'Key Learnings',
      icon: 'BookOpen',
      data: learnings,
      color: 'text-secondary'
    }
  ];

  return (
    <div className="project-description space-y-6">
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-2">
              {title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm">
              {category && (
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} className="text-primary" />
                  <span className="text-text-secondary font-caption">{category}</span>
                </div>
              )}
              
              {duration && (
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary font-caption">{duration}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Icon name={getStatusIcon(status)} size={14} className={getStatusColor(status)} />
                <span className={`font-caption capitalize ${getStatusColor(status)}`}>
                  {status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-surface/30 border border-border rounded-neo p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="FileText" size={18} className="text-primary" />
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Project Overview
            </h3>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary font-body leading-relaxed">
              {showFullDescription ? description : truncateText(description)}
            </p>
            
            {description.length > 300 && (
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-3 text-primary hover:text-primary/80"
                iconName={showFullDescription ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          if (!section.data || section.data.length === 0) return null;
          
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className="bg-surface/30 border border-border rounded-neo overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-surface/50 transition-colors duration-micro"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={section.icon} size={18} className={section.color} />
                  <h3 className="font-heading font-semibold text-text-primary">
                    {section.title}
                  </h3>
                  <div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-caption">
                    {section.data.length}
                  </div>
                </div>
                
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={18} 
                  className={`text-text-secondary transition-transform duration-micro ${
                    isExpanded ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="pt-4 space-y-3">
                    {section.data.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          section.color.replace('text-', 'bg-')
                        }`}></div>
                        <p className="text-text-secondary font-body text-sm leading-relaxed">
                          {typeof item === 'string' ? item : item.description || item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Project Metrics */}
      <div className="bg-surface/30 border border-border rounded-neo p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Project Insights
          </h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/20 rounded-neo flex items-center justify-center mx-auto">
              <Icon name="Code" size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">
                {challenges.length + solutions.length}
              </p>
              <p className="font-caption text-xs text-text-secondary">
                Technical Points
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-secondary/20 rounded-neo flex items-center justify-center mx-auto">
              <Icon name="Star" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">
                {features.length}
              </p>
              <p className="font-caption text-xs text-text-secondary">
                Key Features
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-accent/20 rounded-neo flex items-center justify-center mx-auto">
              <Icon name="BookOpen" size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">
                {learnings.length}
              </p>
              <p className="font-caption text-xs text-text-secondary">
                Learnings
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-success/20 rounded-neo flex items-center justify-center mx-auto">
              <Icon name={getStatusIcon(status)} size={20} className="text-success" />
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary capitalize">
                {status.replace('-', ' ')}
              </p>
              <p className="font-caption text-xs text-text-secondary">
                Status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;