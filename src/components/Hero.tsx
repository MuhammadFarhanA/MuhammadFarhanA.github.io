import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/30 dark:from-background-dark dark:to-surface-dark z-0"></div>
      
      <div className="container mx-auto px-8 md:px-16 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary-600 dark:text-primary-400 font-medium mb-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
            Hello, I'm
          </h2>
          
          <h1 
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300"
          >
            <span className="block">Creative UI/UX Designer</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
              Crafting Digital Experiences
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
            I design and build user-centered interfaces that are both beautiful and functional. 
            Specializing in creating seamless digital experiences that delight users and drive business growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white dark:bg-surface-dark border-2 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToProjects}
          className="p-3 rounded-full bg-white dark:bg-surface-dark transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-primary-600 dark:text-primary-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;