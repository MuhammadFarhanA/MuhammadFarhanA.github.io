import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['about', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = (section: string) => {
    const baseClass = "transition-colors";
    const normalClass = "text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400";
    const activeClass = "text-primary-600 dark:text-primary-400 font-medium";
    
    return `${baseClass} ${activeSection === section ? activeClass : normalClass}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-light/90 dark:bg-gray-900/90 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            <span className="text-primary-600 dark:text-primary-400">farhan</span>
            <span className="text-neutral-800 dark:text-white">atif</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className={getLinkClass('about')}
            >
              About
            </a>
            <a
              href="#experience"
              className={getLinkClass('experience')}
            >
              Experience
            </a>
            <a
              href="#skills"
              className={getLinkClass('skills')}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={getLinkClass('projects')}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={getLinkClass('contact')}
            >
              Contact
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-surface-light dark:bg-gray-900 shadow-lg transform transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-8 py-4">
          <nav className="flex flex-col space-y-4">
            <a
              href="#about"
              className={getLinkClass('about')}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#experience"
              className={getLinkClass('experience')}
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#skills"
              className={getLinkClass('skills')}
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className={getLinkClass('projects')}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className={getLinkClass('contact')}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;