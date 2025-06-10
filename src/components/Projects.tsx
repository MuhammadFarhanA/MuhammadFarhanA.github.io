import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Tag, X, ChevronUp, ChevronDown } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  year: string;
  category: string;
  features: string[];
}

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Finance Dashboard App",
      description: "A comprehensive finance dashboard with data visualization and responsive design.",
      fullDescription: "A modern finance dashboard application built with React and TypeScript, featuring real-time data visualization, portfolio tracking, and comprehensive financial analytics. The application provides users with intuitive charts, transaction management, and investment insights.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
      link: "#",
      github: "#",
      year: "2024",
      category: "Web Application",
      features: [
        "Real-time data visualization",
        "Portfolio tracking and analytics",
        "Transaction management",
        "Responsive design",
        "Dark/light theme support"
      ]
    },
    {
      id: 2,
      title: "Health & Fitness Mobile App",
      description: "A mobile application for tracking fitness activities and health metrics.",
      fullDescription: "A comprehensive health and fitness tracking application designed for mobile devices. Features workout planning, nutrition tracking, progress monitoring, and social sharing capabilities. Built with React Native for cross-platform compatibility.",
      image: "https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React Native", "Redux", "Node.js", "MongoDB"],
      link: "#",
      github: "#",
      year: "2023",
      category: "Mobile Application",
      features: [
        "Workout planning and tracking",
        "Nutrition and calorie monitoring",
        "Progress analytics and insights",
        "Social sharing and challenges",
        "Offline data synchronization"
      ]
    },
    {
      id: 3,
      title: "E-commerce Website Redesign",
      description: "Complete redesign of an e-commerce platform focusing on user experience.",
      fullDescription: "A complete redesign and rebuild of an e-commerce platform with focus on improving user experience, conversion rates, and performance. Features modern design, advanced search, personalized recommendations, and seamless checkout process.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      link: "#",
      github: "#",
      year: "2023",
      category: "E-commerce",
      features: [
        "Advanced product search and filtering",
        "Personalized recommendations",
        "Seamless checkout process",
        "Inventory management",
        "Payment gateway integration"
      ]
    },
    {
      id: 4,
      title: "Social Media Analytics Platform",
      description: "Analytics platform for social media performance tracking and insights.",
      fullDescription: "A comprehensive social media analytics platform that helps businesses track their social media performance across multiple platforms. Features real-time analytics, competitor analysis, and automated reporting.",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Vue.js", "Python", "FastAPI", "PostgreSQL"],
      link: "#",
      github: "#",
      year: "2022",
      category: "Analytics Platform",
      features: [
        "Multi-platform social media tracking",
        "Real-time analytics dashboard",
        "Competitor analysis tools",
        "Automated report generation",
        "Custom KPI tracking"
      ]
    },
    {
      id: 5,
      title: "Real Estate Management System",
      description: "Property management system for real estate agencies and landlords.",
      fullDescription: "A comprehensive real estate management system designed for agencies and property managers. Features property listings, tenant management, maintenance tracking, and financial reporting.",
      image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "#",
      year: "2022",
      category: "Management System",
      features: [
        "Property listing management",
        "Tenant and lease tracking",
        "Maintenance request system",
        "Financial reporting",
        "Document management"
      ]
    },
    {
      id: 6,
      title: "Task Management Application",
      description: "Collaborative task management tool for teams and individuals.",
      fullDescription: "A modern task management application built for teams and individuals. Features project organization, team collaboration, time tracking, and productivity analytics with a clean, intuitive interface.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Angular", "Firebase", "TypeScript", "Material UI"],
      link: "#",
      github: "#",
      year: "2021",
      category: "Productivity Tool",
      features: [
        "Project and task organization",
        "Team collaboration tools",
        "Time tracking and reporting",
        "Kanban board interface",
        "Real-time notifications"
      ]
    }
  ];

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate to specific project
  const goToProject = (index: number) => {
    if (index === currentIndex || selectedProject) return;
    setCurrentIndex(index);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0 && !selectedProject) {
      goToProject(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1 && !selectedProject) {
      goToProject(currentIndex + 1);
    }
  };

  return (
    <>
      <section 
        id="projects" 
        className="h-screen overflow-hidden bg-gradient-to-br from-rose-50/40 via-pink-50/30 to-fuchsia-50/20 dark:from-background-dark dark:to-surface-dark relative"
      >
        {/* Section Title - Fixed at top */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 text-center">
            Projects
          </h2>
        </div>

        {/* Navigation Arrows - Positioned outside content area */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:shadow-lg layered-shadow'
            }`}
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === projects.length - 1}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === projects.length - 1
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:shadow-lg layered-shadow'
            }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Progress Dots - Positioned outside content area */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400 scale-150 shadow-lg shadow-primary-500/50'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300 dark:hover:bg-primary-700 hover:scale-125'
                }`}
                title={projects[index].title}
              />
            ))}
          </div>
        </div>

        {/* Projects Container */}
        <div className="relative h-full pt-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 transition-all duration-800 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 transform translate-y-0'
                  : index < currentIndex
                  ? 'opacity-0 transform -translate-y-full'
                  : 'opacity-0 transform translate-y-full'
              }`}
            >
              <div className="max-w-6xl mx-auto w-full">
                <div className="relative h-[500px] md:h-[450px] overflow-hidden rounded-3xl">
                  {/* Background Image with Heavy Blur */}
                  <div className="absolute inset-0">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter blur-2xl scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full p-8 md:p-12">
                      {/* Left Side - Project Info */}
                      <div className="flex flex-col justify-center space-y-6">
                        {/* Year Badge */}
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/10">
                            {project.year}
                          </span>
                          <span className="px-4 py-2 bg-primary-500/20 backdrop-blur-sm text-primary-200 text-sm font-medium rounded-full border border-primary-400/20">
                            {project.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg text-white/90 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Enhanced Tags */}
                        <div className="flex flex-wrap gap-3">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="group relative px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              <span className="relative z-10">{tag}</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
                              +{project.tags.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => openProjectDetails(project)}
                            className="px-6 py-3 bg-white text-neutral-800 font-medium rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong"
                          >
                            View Details
                          </button>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong inline-flex items-center gap-2"
                            >
                              <ExternalLink size={16} />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Project Preview (Hidden on mobile) */}
                      <div className="hidden lg:flex items-center justify-center">
                        <div className="relative">
                          <div className="w-80 h-60 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={`${project.title} preview`}
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                          {/* Floating elements for visual interest */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500/30 backdrop-blur-sm rounded-full animate-pulse" />
                          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500/30 backdrop-blur-sm rounded-full animate-pulse delay-1000" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
          <div className="flex gap-2 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-full px-4 py-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400 scale-150'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300 dark:hover:bg-primary-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Counter */}
        <div className="absolute bottom-8 right-20 z-40">
          <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentIndex + 1} / {projects.length}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-strong modal-enter">
            {/* Close Button */}
            <button
              onClick={closeProjectDetails}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-surface-dark transition-colors"
              aria-label="Close project details"
            >
              <X size={20} className="text-neutral-700 dark:text-neutral-300" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Project Image */}
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Project Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-3 mb-3">
                    {selectedProject.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {selectedProject.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag size={16} />
                      {selectedProject.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                        Project Overview
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 dark:bg-primary-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg border border-primary-200 dark:border-primary-700/50 hover:shadow-md transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                        Project Links
                      </h3>
                      <div className="space-y-3">
                        {selectedProject.link && (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg transition-colors"
                          >
                            <Github size={16} />
                            View Code
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                      <h4 className="font-medium text-neutral-800 dark:text-neutral-100 mb-2">
                        Project Details
                      </h4>
                      <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex justify-between">
                          <span>Year:</span>
                          <span>{selectedProject.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Technologies:</span>
                          <span>{selectedProject.tags.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;