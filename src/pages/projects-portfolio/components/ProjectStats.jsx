import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects, activeFilter }) => {
  const getFilteredProjects = () => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'featured') return projects.filter(p => p.featured);
    if (activeFilter === 'web-app') return projects.filter(p => p.type === 'web-app');
    if (activeFilter === 'landing-page') return projects.filter(p => p.type === 'landing-page');
    if (activeFilter === 'api') return projects.filter(p => p.type === 'api');
    
    // Technology filters
    return projects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  };

  const filteredProjects = getFilteredProjects();
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const featuredProjects = projects.filter(p => p.featured).length;

  const stats = [
    {
      icon: 'FolderOpen',
      label: 'Total Projects',
      value: projects.length,
      color: 'text-primary'
    },
    {
      icon: 'CheckCircle',
      label: 'Completed',
      value: completedProjects,
      color: 'text-success'
    },
    {
      icon: 'Clock',
      label: 'In Progress',
      value: inProgressProjects,
      color: 'text-warning'
    },
    {
      icon: 'Star',
      label: 'Featured',
      value: featuredProjects,
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-surface/50 border border-border rounded-neo hover:border-border-active transition-all duration-micro hover-lift"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-neo bg-surface ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div>
                <div className="text-2xl font-heading font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-xs font-caption text-text-secondary">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Results */}
      {activeFilter !== 'all' && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-neo">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Filter" size={18} className="text-primary" />
              <div>
                <span className="font-body font-medium text-text-primary">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                </span>
                <p className="text-sm text-text-secondary font-caption">
                  Filtered by: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1).replace('-', ' ')}
                </p>
              </div>
            </div>
            <div className="text-primary font-heading font-bold text-xl">
              {filteredProjects.length}
            </div>
          </div>
        </div>
      )}

      {/* Technology Distribution */}
      <div className="p-4 bg-surface/30 border border-border rounded-neo">
        <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Code" size={18} className="text-primary" />
          <span>Technology Stack</span>
        </h3>
        
        <div className="space-y-2">
          {['React', 'JavaScript', 'CSS', 'Node.js', 'Tailwind'].map((tech) => {
            const count = projects.filter(p => 
              p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
            ).length;
            const percentage = (count / projects.length) * 100;
            
            return (
              <div key={tech} className="flex items-center justify-between">
                <span className="font-caption text-sm text-text-secondary">{tech}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-component"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-caption text-xs text-text-primary font-medium w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;