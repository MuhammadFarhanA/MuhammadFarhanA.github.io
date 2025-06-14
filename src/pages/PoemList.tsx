import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { BookOpen, ArrowLeft } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const PoemList: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-secondary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-secondary-100/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header - Same as Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface-light/90 dark:bg-gray-900/90 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-bold tracking-tighter"
            >
              <span className="text-primary-600 dark:text-primary-400">farhan</span>
              <span className="text-neutral-800 dark:text-white">atif</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/#about")}
                className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/#experience")}
                className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => navigate("/#projects")}
                className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => navigate("/#contact")}
                className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </button>
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => navigate("/")}
                className="text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Back to home"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 pt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className={`flex items-center justify-center gap-3 mb-4 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                <BookOpen size={24} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Poetry Collection
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {poems.map((poem, idx) => (
              <div
                key={poem.id}
                onClick={() => navigate(`/poems/${idx}`)}
                className={`group cursor-pointer w-full bg-white/80 dark:bg-surface-dark backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl px-8 py-8 transition-all duration-500 layered-shadow hover:shadow-strong hover:-translate-y-2 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100 + 400}ms` }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 transform group-hover:translate-x-2">
                  {poem.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemList;