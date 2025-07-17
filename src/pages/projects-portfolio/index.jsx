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
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for managing online store operations with real-time analytics, inventory management, and customer insights.",
      fullDescription: `A full-featured e-commerce dashboard built with React and modern web technologies. This project demonstrates advanced state management, data visualization, and responsive design principles. The dashboard includes real-time sales analytics, inventory tracking, customer management, and order processing capabilities.\n\nThe application features a clean, intuitive interface that allows store administrators to efficiently manage their online business operations. Built with performance and scalability in mind, it handles large datasets and provides smooth user interactions across all device sizes.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "Chart.js", "Redux"],
      type: "web-app",
      status: "completed",
      featured: true,
      demoUrl: "https://demo-ecommerce-dashboard.netlify.app",
      githubUrl: "https://github.com/lucas/ecommerce-dashboard",
      completedDate: "Dec 2023",
      duration: "6 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "Real-time Data Synchronization",
          solution: "Implemented WebSocket connections for live updates and optimized state management to handle frequent data changes without performance degradation."
        },
        {
          title: "Complex Data Visualization",
          solution: "Created custom chart components using Chart.js with responsive design and interactive features for better user experience."
        }
      ],
      features: [
        "Real-time sales analytics and reporting",
        "Inventory management with low-stock alerts",
        "Customer relationship management",
        "Order processing and tracking",
        "Responsive design for all devices",
        "Dark/light theme support"
      ]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with drag-and-drop functionality, team collaboration features, and progress tracking.",
      fullDescription: `A modern task management application designed for teams and individuals to organize, track, and complete projects efficiently. Built with React and featuring an intuitive drag-and-drop interface, the app provides a seamless experience for managing tasks across different project stages.\n\nThe application includes advanced features like team collaboration, real-time updates, deadline tracking, and comprehensive reporting. Users can create projects, assign tasks, set priorities, and monitor progress through various visualization tools.`,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "CSS"],
      type: "web-app",
      status: "completed",
      featured: true,
      demoUrl: "https://task-manager-pro.netlify.app",
      githubUrl: "https://github.com/lucas/task-manager",
      completedDate: "Nov 2023",
      duration: "4 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "Drag and Drop Implementation",
          solution: "Utilized React DnD library with custom hooks to create smooth drag-and-drop interactions while maintaining data consistency."
        }
      ],
      features: [
        "Drag-and-drop task organization",
        "Team collaboration tools",
        "Real-time notifications",
        "Progress tracking and analytics",
        "Deadline management",
        "File attachments support"
      ]
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.",
      fullDescription: `A personal portfolio website built to showcase my development skills and projects. The site features a modern, responsive design with smooth animations and interactive elements that demonstrate my proficiency in front-end development.\n\nThe portfolio includes sections for projects, skills, experience, and contact information. Built with performance in mind, it loads quickly and provides an excellent user experience across all devices.`,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
      type: "landing-page",
      status: "completed",
      featured: false,
      demoUrl: "https://lucas-portfolio.netlify.app",
      githubUrl: "https://github.com/lucas/portfolio",
      completedDate: "Oct 2023",
      duration: "3 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "Animation Performance",
          solution: "Optimized animations using Framer Motion and implemented lazy loading for smooth performance across devices."
        }
      ],
      features: [
        "Responsive design",
        "Smooth scroll animations",
        "Interactive project showcase",
        "Contact form integration",
        "SEO optimization",
        "Fast loading performance"
      ]
    },
    {
      id: 4,
      title: "Weather App",
      description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather information.",
      fullDescription: `A comprehensive weather application that provides current weather conditions, forecasts, and interactive weather maps. The app uses geolocation to provide personalized weather information and includes features like weather alerts and historical data.\n\nBuilt with modern web technologies, the application offers a clean, intuitive interface with smooth animations and responsive design. Users can search for weather in different locations and save their favorite cities for quick access.`,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "JavaScript", "CSS", "Weather API"],
      type: "web-app",
      status: "completed",
      featured: false,
      demoUrl: "https://weather-app-lucas.netlify.app",
      githubUrl: "https://github.com/lucas/weather-app",
      completedDate: "Sep 2023",
      duration: "2 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "API Integration",
          solution: "Implemented robust error handling and caching mechanisms to ensure reliable weather data retrieval and display."
        }
      ],
      features: [
        "Current weather conditions",
        "7-day weather forecast",
        "Location-based weather",
        "Interactive weather maps",
        "Weather alerts",
        "Favorite locations"
      ]
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "A full-stack blog platform with user authentication, content management, and social features for writers and readers.",
      fullDescription: `A complete blog platform that allows users to create, publish, and manage blog posts. The platform includes user authentication, content management tools, and social features like comments and likes.\n\nBuilt with a modern tech stack, the platform provides a rich text editor, image upload capabilities, and SEO optimization features. The responsive design ensures a great reading experience across all devices.`,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      type: "web-app",
      status: "in-progress",
      featured: false,
      demoUrl: "https://blog-platform-lucas.netlify.app",
      githubUrl: "https://github.com/lucas/blog-platform",
      completedDate: "In Progress",
      duration: "8 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "Content Management",
          solution: "Developed a flexible content management system with rich text editing and media upload capabilities."
        }
      ],
      features: [
        "User authentication and profiles",
        "Rich text editor",
        "Image upload and management",
        "Comment system",
        "Social sharing",
        "SEO optimization"
      ]
    },
    {
      id: 6,
      title: "Restaurant Landing Page",
      description: "An elegant landing page for a fine dining restaurant with online reservation system and menu showcase.",
      fullDescription: `A sophisticated landing page designed for a fine dining restaurant, featuring an elegant design that reflects the restaurant's premium brand. The page includes an online reservation system, interactive menu showcase, and customer testimonials.\n\nThe design emphasizes visual appeal with high-quality imagery and smooth animations. The responsive layout ensures the site looks beautiful on all devices, from desktop to mobile.`,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
      type: "landing-page",
      status: "completed",
      featured: false,
      demoUrl: "https://restaurant-landing.netlify.app",
      githubUrl: "https://github.com/lucas/restaurant-landing",
      completedDate: "Aug 2023",
      duration: "2 weeks",
      teamSize: "Solo Project",
      challenges: [
        {
          title: "Visual Design",
          solution: "Created a visually stunning design with careful attention to typography, spacing, and color harmony to reflect the restaurant's brand."
        }
      ],
      features: [
        "Elegant visual design","Online reservation system","Interactive menu showcase","Customer testimonials","Location and contact info","Mobile-optimized experience"
      ]
    },
    {
      id: 7,
      title: "API Documentation Site",description: "A comprehensive API documentation website with interactive examples, code snippets, and testing capabilities.",
      fullDescription: `A professional API documentation website that provides comprehensive information about API endpoints, parameters, and responses. The site includes interactive examples, code snippets in multiple languages, and built-in testing capabilities.\n\nDesigned with developers in mind, the documentation site features a clean, organized layout with easy navigation and search functionality. The responsive design ensures accessibility across all devices.`,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "JavaScript", "CSS", "Markdown"],
      type: "api",status: "completed",featured: false,demoUrl: "https://api-docs-lucas.netlify.app",githubUrl: "https://github.com/lucas/api-docs",completedDate: "Jul 2023",duration: "3 weeks",teamSize: "Solo Project",
      challenges: [
        {
          title: "Interactive Examples",solution: "Implemented a code playground with syntax highlighting and live API testing capabilities for better developer experience."
        }
      ],
      features: [
        "Comprehensive API documentation","Interactive code examples","Multi-language code snippets","Built-in API testing","Search functionality","Responsive design"
      ]
    },
    {
      id: 8,
      title: "Fitness Tracker",description: "A personal fitness tracking application with workout logging, progress visualization, and goal setting features.",
      fullDescription: `A comprehensive fitness tracking application that helps users monitor their workout routines, track progress, and achieve their fitness goals. The app includes features for logging workouts, tracking various exercises, and visualizing progress over time.\n\nBuilt with user experience in mind, the application provides an intuitive interface for managing fitness data and includes motivational features to help users stay committed to their fitness journey.`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "JavaScript", "Chart.js", "Local Storage"],
      type: "web-app",status: "in-progress",featured: false,demoUrl: "https://fitness-tracker-lucas.netlify.app",githubUrl: "https://github.com/lucas/fitness-tracker",completedDate: "In Progress",duration: "5 weeks",teamSize: "Solo Project",
      challenges: [
        {
          title: "Data Persistence",solution: "Implemented local storage with data backup and sync capabilities to ensure user data is never lost."
        }
      ],
      features: [
        "Workout logging and tracking","Progress visualization","Goal setting and monitoring","Exercise database","Personal records tracking","Motivational features"
      ]
    }
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
                        No projects found
                      </h3>
                      <p className="text-text-secondary font-body mb-6 max-w-md mx-auto">
                        {searchQuery 
                          ? `No projects match "${searchQuery}". Try adjusting your search terms or filters.`
                          : 'No projects match the current filter. Try selecting a different category.'
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
                        Reset Filters
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