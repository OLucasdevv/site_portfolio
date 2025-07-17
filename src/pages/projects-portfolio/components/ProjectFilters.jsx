import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  projectCounts 
}) => {
  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: 'Grid3x3', count: projectCounts.all },
    { id: 'web-app', label: 'Web Apps', icon: 'Globe', count: projectCounts.webApp },
    { id: 'landing-page', label: 'Landing Pages', icon: 'Layout', count: projectCounts.landingPage },
    { id: 'api', label: 'APIs', icon: 'Database', count: projectCounts.api },
    { id: 'featured', label: 'Featured', icon: 'Star', count: projectCounts.featured }
  ];

  const technologyFilters = [
    { id: 'react', label: 'React', color: 'text-blue-400' },
    { id: 'javascript', label: 'JavaScript', color: 'text-yellow-400' },
    { id: 'css', label: 'CSS', color: 'text-blue-500' },
    { id: 'nodejs', label: 'Node.js', color: 'text-green-400' },
    { id: 'tailwind', label: 'Tailwind', color: 'text-cyan-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        <input
          type="text"
          placeholder="Search projects by name, technology, or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-neo text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/30 transition-all duration-micro"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary transition-colors duration-micro"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>

      {/* Main Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? 'primary' : 'ghost'}
            size="sm"
            iconName={filter.icon}
            iconPosition="left"
            onClick={() => onFilterChange(filter.id)}
            className={`transition-all duration-micro ${
              activeFilter === filter.id 
                ? 'shadow-glow-primary' 
                : 'hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {filter.label}
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-neo ${
              activeFilter === filter.id
                ? 'bg-background/20 text-background' :'bg-surface text-text-secondary'
            }`}>
              {filter.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Technology Quick Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-text-secondary" />
          <span className="font-caption text-sm text-text-secondary">Quick filters by technology:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {technologyFilters.map((tech) => (
            <button
              key={tech.id}
              onClick={() => onFilterChange(tech.id)}
              className={`px-3 py-1.5 text-sm font-caption font-medium rounded-neo border transition-all duration-micro hover-lift ${
                activeFilter === tech.id
                  ? 'bg-primary/20 border-primary/30 text-primary shadow-glow-primary'
                  : 'bg-surface/50 border-border text-text-secondary hover:border-border-active hover:text-text-primary'
              }`}
            >
              <span className={tech.color}>●</span>
              <span className="ml-1">{tech.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter !== 'all' && (
        <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-neo">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="font-caption text-sm text-primary">
              Filtered by: <span className="font-medium">{
                filterOptions.find(f => f.id === activeFilter)?.label ||
                technologyFilters.find(t => t.id === activeFilter)?.label ||
                activeFilter
              }</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onFilterChange('all')}
            className="text-primary hover:bg-primary/20"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;