import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTechStack = ({ technologies = [], category = 'Technologies Used' }) => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const getTechIcon = (techName) => {
    const iconMap = {
      'React': 'Code',
      'JavaScript': 'Code2',
      'TypeScript': 'FileCode',
      'Node.js': 'Server',
      'Express': 'Database',
      'MongoDB': 'Database',
      'PostgreSQL': 'Database',
      'HTML': 'FileText',
      'CSS': 'Palette',
      'Tailwind': 'Paintbrush',
      'SASS': 'Palette',
      'Git': 'GitBranch',
      'GitHub': 'Github',
      'Docker': 'Package',
      'AWS': 'Cloud',
      'Firebase': 'Flame',
      'Vercel': 'Zap',
      'Netlify': 'Globe',
      'Python': 'Code',
      'Java': 'Coffee',
      'C++': 'Code',
      'Vue': 'Code',
      'Angular': 'Code',
      'Next.js': 'ArrowRight',
      'Nuxt.js': 'ArrowRight',
      'GraphQL': 'Share2',
      'REST API': 'Link',
      'Redux': 'RefreshCw',
      'Zustand': 'Box',
      'Framer Motion': 'Zap',
      'Three.js': 'Box',
      'D3.js': 'BarChart3',
      'Chart.js': 'PieChart',
      'Webpack': 'Package2',
      'Vite': 'Zap',
      'Jest': 'CheckCircle',
      'Cypress': 'TestTube',
      'ESLint': 'Shield',
      'Prettier': 'Sparkles'
    };
    
    return iconMap[techName] || 'Code';
  };

  const getTechColor = (techName) => {
    const colorMap = {
      'React': 'text-blue-400',
      'JavaScript': 'text-yellow-400',
      'TypeScript': 'text-blue-500',
      'Node.js': 'text-green-400',
      'Python': 'text-yellow-500',
      'HTML': 'text-orange-400',
      'CSS': 'text-blue-400',
      'Tailwind': 'text-cyan-400',
      'Git': 'text-orange-500',
      'GitHub': 'text-gray-400',
      'MongoDB': 'text-green-500',
      'PostgreSQL': 'text-blue-600',
      'Firebase': 'text-orange-400',
      'AWS': 'text-orange-500',
      'Docker': 'text-blue-500',
      'Vue': 'text-green-400',
      'Angular': 'text-red-500'
    };
    
    return colorMap[techName] || 'text-primary';
  };

  if (technologies.length === 0) {
    return (
      <div className="project-tech-stack">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          {category}
        </h3>
        <div className="bg-surface/50 border border-border rounded-neo p-6 text-center">
          <Icon name="Code" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary font-caption">No technologies specified</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-tech-stack">
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center space-x-2">
        <Icon name="Layers" size={20} className="text-primary" />
        <span>{category}</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {technologies.map((tech, index) => {
          const techName = typeof tech === 'string' ? tech : tech.name;
          const techLevel = typeof tech === 'object' ? tech.level : null;
          const techDescription = typeof tech === 'object' ? tech.description : null;
          
          return (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className={`bg-surface border border-border rounded-neo p-4 transition-all duration-micro hover-lift hover:border-primary/30 hover:shadow-glow-primary ${
                hoveredTech === index ? 'bg-primary/5 border-primary/30' : ''
              }`}>
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-2 rounded-neo bg-background/50 transition-colors duration-micro ${
                    hoveredTech === index ? 'bg-primary/10' : ''
                  }`}>
                    <Icon 
                      name={getTechIcon(techName)} 
                      size={24} 
                      className={`transition-colors duration-micro ${
                        hoveredTech === index ? 'text-primary' : getTechColor(techName)
                      }`}
                    />
                  </div>
                  
                  <div className="text-center">
                    <h4 className={`font-body font-medium text-sm transition-colors duration-micro ${
                      hoveredTech === index ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {techName}
                    </h4>
                    
                    {techLevel && (
                      <div className="mt-1">
                        <div className="flex items-center justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-colors duration-micro ${
                                i < techLevel 
                                  ? (hoveredTech === index ? 'bg-primary' : 'bg-secondary') 
                                  : 'bg-text-secondary/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Tooltip */}
                {techDescription && hoveredTech === index && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                    <div className="bg-background border border-border rounded-neo p-3 shadow-neo-primary max-w-48">
                      <p className="text-text-secondary font-caption text-xs text-center">
                        {techDescription}
                      </p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Glow Effect */}
              {hoveredTech === index && (
                <div className="absolute inset-0 bg-primary/5 rounded-neo animate-glow pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Category Summary */}
      <div className="mt-6 p-4 bg-surface/30 border border-border rounded-neo">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-secondary" />
            <span className="font-caption text-sm text-text-secondary">
              Technology Stack
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-caption text-xs text-text-secondary">
                {technologies.length} Technologies
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="font-caption text-xs text-text-secondary">
                Modern Stack
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTechStack;