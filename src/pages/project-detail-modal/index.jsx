import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectModalHeader from './components/ProjectModalHeader';
import ProjectImageCarousel from './components/ProjectImageCarousel';
import ProjectDescription from './components/ProjectDescription';
import ProjectTechStack from './components/ProjectTechStack';
import ProjectActionButtons from './components/ProjectActionButtons';
import ProjectSocialShare from './components/ProjectSocialShare';

const ProjectDetailModal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock projects data
  const projects = [
    {
      id: "ecommerce-dashboard",
      title: "E-Commerce Analytics Dashboard",
      category: "Web Application",
      duration: "3 months",
      status: "completed",
      description: `A comprehensive e-commerce analytics dashboard built with React and modern web technologies. This project showcases advanced data visualization, real-time updates, and responsive design principles.\n\nThe dashboard provides merchants with detailed insights into their sales performance, customer behavior, and inventory management. It features interactive charts, customizable widgets, and seamless integration with various e-commerce platforms.\n\nBuilt with performance in mind, the application handles large datasets efficiently and provides a smooth user experience across all devices.`,
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
      ],
      technologies: [
        { name: "React", level: 5, description: "Frontend framework for building user interfaces" },
        { name: "TypeScript", level: 4, description: "Type-safe JavaScript development" },
        { name: "Tailwind", level: 5, description: "Utility-first CSS framework" },
        { name: "D3.js", level: 3, description: "Data visualization library" },
        { name: "Node.js", level: 4, description: "Backend runtime environment" },
        { name: "MongoDB", level: 3, description: "NoSQL database for data storage" }
      ],
      challenges: [
        "Handling large datasets with thousands of transactions while maintaining smooth performance",
        "Creating responsive charts that work seamlessly across desktop, tablet, and mobile devices",
        "Implementing real-time data updates without overwhelming the user interface",
        "Designing an intuitive user experience for complex analytics data"
      ],
      solutions: [
        "Implemented virtual scrolling and data pagination to handle large datasets efficiently",
        "Used responsive design patterns and CSS Grid for adaptive chart layouts",
        "Integrated WebSocket connections for real-time updates with throttling mechanisms",
        "Conducted user testing sessions to refine the interface and improve usability"
      ],
      features: [
        "Interactive sales analytics with drill-down capabilities",
        "Real-time dashboard updates and notifications",
        "Customizable widget layouts and preferences",
        "Export functionality for reports and data",
        "Multi-theme support with dark and light modes",
        "Advanced filtering and search capabilities"
      ],
      learnings: [
        "Advanced React patterns including custom hooks and context optimization",
        "Data visualization best practices and accessibility considerations",
        "Performance optimization techniques for large-scale applications",
        "User experience design principles for complex data interfaces"
      ],
      liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
      githubUrl: "https://github.com/lucas/ecommerce-dashboard",
      downloadUrl: "https://github.com/lucas/ecommerce-dashboard/archive/main.zip"
    },
    {
      id: "task-management-app",
      title: "Collaborative Task Management",
      category: "Productivity App",
      duration: "2 months",
      status: "completed",
      description: `A modern task management application designed for teams and individuals to organize, track, and collaborate on projects efficiently. The app features intuitive drag-and-drop interfaces, real-time collaboration, and comprehensive project tracking.\n\nBuilt with a focus on user experience and productivity, the application includes advanced features like time tracking, team collaboration tools, and detailed analytics. The responsive design ensures seamless usage across all devices.\n\nThe project demonstrates proficiency in modern React development, state management, and real-time communication technologies.`,
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop"
      ],
      technologies: [
        { name: "React", level: 5 },
        { name: "Redux", level: 4 },
        { name: "Firebase", level: 4 },
        { name: "Framer Motion", level: 3 },
        { name: "Tailwind", level: 5 }
      ],
      challenges: [
        "Implementing real-time collaboration features with conflict resolution",
        "Creating smooth drag-and-drop interactions across different screen sizes",
        "Managing complex state for multiple projects and team members"
      ],
      solutions: [
        "Used Firebase Firestore for real-time data synchronization",
        "Implemented custom drag-and-drop logic with touch support",
        "Designed normalized state structure with Redux Toolkit"
      ],
      features: [
        "Drag-and-drop task organization",
        "Real-time team collaboration",
        "Project timeline and milestone tracking",
        "Time tracking and productivity analytics",
        "Team member management and permissions"
      ],
      learnings: [
        "Real-time database design and optimization",
        "Complex state management patterns",
        "Touch-friendly interface development",
        "Team collaboration feature implementation"
      ],
      liveUrl: "https://task-manager-collab.netlify.app",
      githubUrl: "https://github.com/lucas/task-management-app"
    },
    {
      id: "weather-forecast-app",
      title: "Advanced Weather Forecast",
      category: "Mobile-First App",
      duration: "1 month",
      status: "completed",
      description: `A comprehensive weather application that provides detailed forecasts, interactive maps, and personalized weather insights. The app features beautiful animations, location-based services, and offline capabilities.\n\nDesigned with a mobile-first approach, the application delivers accurate weather information with an intuitive and visually appealing interface. It includes advanced features like weather alerts, historical data, and customizable widgets.`,
      images: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop"
      ],
      technologies: [
        { name: "React", level: 5 },
        { name: "JavaScript", level: 5 },
        { name: "CSS", level: 4 },
        { name: "REST API", level: 4 }
      ],
      challenges: [
        "Handling multiple API calls efficiently",
        "Creating smooth animations for weather transitions",
        "Implementing offline functionality"
      ],
      solutions: [
        "Used React Query for API state management",
        "Implemented CSS animations with performance optimization",
        "Added service worker for offline capabilities"
      ],
      features: [
        "7-day detailed weather forecast",
        "Interactive weather maps",
        "Location-based weather alerts",
        "Offline mode support",
        "Customizable weather widgets"
      ],
      learnings: [
        "API integration and error handling",
        "Progressive Web App development",
        "Animation performance optimization",
        "Geolocation services implementation"
      ],
      liveUrl: "https://weather-forecast-advanced.vercel.app",
      githubUrl: "https://github.com/lucas/weather-forecast-app",
      downloadUrl: "https://github.com/lucas/weather-forecast-app/archive/main.zip"
    },
    {
      id: "portfolio-website",
      title: "Personal Portfolio Hub",
      category: "Portfolio Website",
      duration: "2 weeks",
      status: "in-progress",
      description: `A modern, responsive portfolio website showcasing my development skills, projects, and professional journey. Built with React and featuring smooth animations, dark theme, and optimized performance.\n\nThe portfolio demonstrates my expertise in front-end development, UI/UX design, and modern web technologies. It includes interactive project showcases, detailed skill presentations, and seamless navigation.`,
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop"
      ],
      technologies: [
        { name: "React", level: 5 },
        { name: "Tailwind", level: 5 },
        { name: "Framer Motion", level: 4 },
        { name: "Vite", level: 4 }
      ],
      challenges: [
        "Creating engaging animations without impacting performance",
        "Designing responsive layouts for all device sizes",
        "Optimizing loading times and user experience"
      ],
      solutions: [
        "Used Framer Motion with performance optimizations",
        "Implemented mobile-first responsive design",
        "Applied code splitting and lazy loading"
      ],
      features: [
        "Interactive project showcases",
        "Smooth page transitions",
        "Responsive design across all devices",
        "Dark theme with vibrant accents",
        "Contact form integration"
      ],
      learnings: [
        "Advanced animation techniques",
        "Performance optimization strategies",
        "Modern CSS layout methods",
        "User experience design principles"
      ],
      liveUrl: "https://lucas-portfolio-hub.vercel.app",
      githubUrl: "https://github.com/lucas/portfolio-website"
    }
  ];

  useEffect(() => {
    const projectId = searchParams.get('id');
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
        setCurrentIndex(projects.findIndex(p => p.id === projectId));
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    navigate('/projects-portfolio');
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const newProject = projects[newIndex];
    setCurrentProject(newProject);
    setCurrentIndex(newIndex);
    navigate(`/project-detail-modal?id=${newProject.id}`, { replace: true });
  };

  const handleNext = () => {
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    const newProject = projects[newIndex];
    setCurrentProject(newProject);
    setCurrentIndex(newIndex);
    navigate(`/project-detail-modal?id=${newProject.id}`, { replace: true });
  };

  const handleShare = () => {
    console.log('Sharing project:', currentProject?.title);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-modal bg-background/95 backdrop-blur-neo flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-text-secondary font-caption">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="fixed inset-0 z-modal bg-background/95 backdrop-blur-neo flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <Icon name="AlertCircle" size={48} className="text-warning mx-auto" />
          <h2 className="font-heading font-bold text-xl text-text-primary">Project Not Found</h2>
          <p className="text-text-secondary font-body">
            The requested project could not be found. Please check the URL or return to the projects page.
          </p>
          <Button
            variant="primary"
            onClick={handleClose}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-modal bg-background/95 backdrop-blur-neo">
      {/* Modal Backdrop */}
      <div 
        className="absolute inset-0 bg-background/50"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative h-full flex flex-col">
        <ProjectModalHeader
          title={currentProject.title}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={projects.length > 1}
          hasNext={projects.length > 1}
          currentIndex={currentIndex}
          totalProjects={projects.length}
          isLoading={isLoading}
        />

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Media & Actions */}
              <div className="space-y-6">
                <ProjectImageCarousel
                  images={currentProject.images}
                  projectTitle={currentProject.title}
                />
                
                <div className="lg:hidden">
                  <ProjectActionButtons
                    liveUrl={currentProject.liveUrl}
                    githubUrl={currentProject.githubUrl}
                    downloadUrl={currentProject.downloadUrl}
                    projectTitle={currentProject.title}
                    onShare={handleShare}
                  />
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <ProjectDescription
                  title={currentProject.title}
                  description={currentProject.description}
                  challenges={currentProject.challenges}
                  solutions={currentProject.solutions}
                  features={currentProject.features}
                  learnings={currentProject.learnings}
                  category={currentProject.category}
                  duration={currentProject.duration}
                  status={currentProject.status}
                />

                <ProjectTechStack
                  technologies={currentProject.technologies}
                  category="Technology Stack"
                />

                <div className="hidden lg:block">
                  <ProjectActionButtons
                    liveUrl={currentProject.liveUrl}
                    githubUrl={currentProject.githubUrl}
                    downloadUrl={currentProject.downloadUrl}
                    projectTitle={currentProject.title}
                    onShare={handleShare}
                  />
                </div>

                <ProjectSocialShare
                  projectTitle={currentProject.title}
                  projectUrl={currentProject.liveUrl}
                  projectDescription={currentProject.description}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Footer */}
        <div className="lg:hidden border-t border-border bg-surface/50 backdrop-blur-neo p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={projects.length <= 1}
              className="flex items-center space-x-2"
              iconName="ChevronLeft"
              iconPosition="left"
            >
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
              <span className="font-caption text-sm text-text-secondary">
                {currentIndex + 1} / {projects.length}
              </span>
            </div>
            
            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={projects.length <= 1}
              className="flex items-center space-x-2"
              iconName="ChevronRight"
              iconPosition="right"
            >
              <span>Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;