import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectModal from './components/ProjectModal';
import ProjectSkeletonCard from './components/ProjectSkeletonCard';
import ProjectStats from './components/ProjectStats';
import { useLanguage } from '../../contexts/LanguageContext'

const ProjectsPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const {t} = useLanguage();
  

  // Mock projects data
  const mockProjects = [
    
    
    
  ];

  useEffect(() => {
    // Simulate API loading
    const loadProjects = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [activeFilter, searchQuery, projects, sortBy]);

  const filterProjects = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'featured') {
        filtered = filtered.filter(project => project.featured);
      } else if (activeFilter === 'web-app') {
        filtered = filtered.filter(project => project.type === 'web-app');
      } else if (activeFilter === 'landing-page') {
        filtered = filtered.filter(project => project.type === 'landing-page');
      } else if (activeFilter === 'api') {
        filtered = filtered.filter(project => project.type === 'api');
      } else {
        // Technology filters
        filtered = filtered.filter(project =>
          project.technologies.some(tech =>
            tech.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.completedDate) - new Date(a.completedDate);
        case 'oldest':
          return new Date(a.completedDate) - new Date(b.completedDate);
        case 'featured':
          return b.featured - a.featured;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  };

  const getProjectCounts = () => {
    return {
      all: projects.length,
      webApp: projects.filter(p => p.type === 'web-app').length,
      landingPage: projects.filter(p => p.type === 'landing-page').length,
      api: projects.filter(p => p.type === 'api').length,
      featured: projects.filter(p => p.featured).length
    };
  };

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleViewDemo = (demoUrl) => {
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewGithub = (githubUrl) => {
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleModalNavigation = (direction) => {
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    }
    
    setSelectedProject(filteredProjects[newIndex]);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'oldest', label: 'Oldest First', icon: 'CalendarDays' },
    { value: 'featured', label: 'Featured First', icon: 'Star' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  return (
    <>
      <Helmet>
        <title>Projects Portfolio - Lucas | Front-End Developer</title>
        <meta name="description" content="Explore Lucas's portfolio of web development projects including React applications, landing pages, and API integrations. View live demos and GitHub repositories." />
        <meta name="keywords" content="portfolio, projects, React, JavaScript, web development, front-end, Lucas" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="relative pt-24 pb-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-neo text-primary font-caption text-sm">
                <Icon name="Code" size={16} />
                <span> {t("myProjects.portshowcase")} </span>
              </div>
              
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-text-primary">
               {t("myProjects.title1")} <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t("myProjects.title2")}</span>
              </h1>
              
              <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                {t("myProjects.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2 text-text-secondary font-caption">
                  <Icon name="FolderOpen" size={18} className="text-primary" />
                  <span>{projects.length} Projects</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary font-caption">
                  <Icon name="Star" size={18} className="text-accent" />
                  <span>{projects.filter(p => p.featured).length} Featured</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary font-caption">
                  <Icon name="Github" size={18} className="text-secondary" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <ProjectStats 
                  projects={projects}
                  activeFilter={activeFilter}
                />

                <div className="p-4 bg-surface/30 border border-border rounded-neo">
                  <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="ArrowUpDown" size={18} className="text-primary" />
                    <span>Sort By</span>
                  </h3>
                  
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`w-full flex items-center space-x-3 p-2 rounded-neo text-left transition-all duration-micro ${
                          sortBy === option.value
                            ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                        }`}
                      >
                        <Icon name={option.icon} size={16} />
                        <span className="font-caption text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-8">
                <ProjectFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  projectCounts={getProjectCounts()}
                />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h2 className="font-heading font-semibold text-xl text-text-primary">
                        {searchQuery ? 'Search Results' : 'All Projects'}
                      </h2>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-caption rounded-neo">
                        {filteredProjects.length}
                      </span>
                    </div>

                    {!isLoading && filteredProjects.length > 0 && (
                      <div className="hidden sm:flex items-center space-x-2 text-text-secondary font-caption text-sm">
                        <Icon name="Grid3x3" size={16} />
                        <span>Grid View</span>
                      </div>
                    )}
                  </div>

                  {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, index) => (
                        <ProjectSkeletonCard key={index} />
                      ))}
                    </div>
                  )}

                  {!isLoading && filteredProjects.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onViewDetails={handleProjectDetails}
                          onViewDemo={handleViewDemo}
                          onViewGithub={handleViewGithub}
                        />
                      ))}
                    </div>
                  )}

                  {!isLoading && filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-surface rounded-neo flex items-center justify-center mx-auto mb-6">
                        <Icon name="Search" size={32} className="text-text-secondary" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                        {t("projectsFound.title")}
                      </h3>
                      <p className="text-text-secondary font-body mb-6 max-w-md mx-auto">
                        {searchQuery 
                          ? `No projects match "${searchQuery}". Try adjusting your search terms or filters.`
                          : t("projectsFound.subtitle")
                        }
                      </p>
                      <Button
                        variant="outline"
                        iconName="RotateCcw"
                        iconPosition="left"
                        onClick={() => {
                          setActiveFilter('all');
                          setSearchQuery('');
                        }}
                      >
                        {t("projectsFound.reset.title")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isLoading && filteredProjects.length > 0 && (
          <section className="px-6 lg:px-12 pb-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-neo">
                <h2 className="font-heading font-bold text-2xl text-text-primary mb-4">
                  Interested in working together?
                </h2>
                <p className="text-text-secondary font-body mb-6">
                  I'm always excited to take on new challenges and collaborate on innovative projects.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="primary"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get In Touch
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Github"
                    iconPosition="left"
                    onClick={() => window.open('https://github.com/lucas', '_blank')}
                  >
                    View GitHub
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onNavigate={filteredProjects.length > 1 ? handleModalNavigation : null}
        />
      </div>
    </>
  );
};

export default ProjectsPortfolio;