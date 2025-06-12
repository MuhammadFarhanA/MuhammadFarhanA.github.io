import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { poems } from '../data/poems';

const Poems: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate in on mount with no jerky animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Longer delay for smoother entrance
    return () => clearTimeout(timer);
  }, []);

  // Handle wheel scrolling for poem navigation with improved smoothness
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      // Require more scroll distance to trigger navigation
      if (Math.abs(e.deltaY) < 80) return;
      
      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentIndex < poems.length - 1) {
        // Scroll down - next poem
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous poem
        setCurrentIndex(prev => prev - 1);
      }
      
      // Longer timeout for smoother experience
      setTimeout(() => setIsScrolling(false), 1500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, isScrolling, poems.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' && currentIndex < poems.length - 1) {
        setIsScrolling(true);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1500);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setIsScrolling(true);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isScrolling, poems.length]);

  // Navigate to specific poem
  const goToPoem = (index: number) => {
    if (isScrolling || index === currentIndex) return;
    setIsScrolling(true);
    setCurrentIndex(index);
    setTimeout(() => setIsScrolling(false), 1500);
  };

  return (
    <PageTransition>
      <div 
        ref={containerRef}
        className="h-screen overflow-hidden bg-gradient-to-br from-secondary-50/30 to-surface-light dark:from-background-dark dark:to-surface-dark relative"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-tertiary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-tertiary-200/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Header */}
        <div className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-neutral-200/50 dark:border-neutral-700/50 sticky top-0 z-40 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Portfolio</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
                  <BookOpen size={20} className="text-secondary-600 dark:text-secondary-400" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Poetry Collection
                </h1>
              </div>

              <div className="w-32"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Progress Dots - Desktop */}
        <div className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`} style={{ transitionDelay: '0.4s' }}>
          <div className="flex flex-col gap-3">
            {poems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPoem(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-secondary-600 dark:bg-secondary-400 scale-125 shadow-lg shadow-secondary-500/50'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-secondary-300 dark:hover:bg-secondary-700'
                }`}
                title={poems[index].title}
              />
            ))}
          </div>
        </div>

        {/* Poems Container */}
        <div className="relative h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
          {poems.map((poem, index) => (
            <div
              key={poem.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1200 ease-out ${
                index === currentIndex
                  ? 'opacity-100 transform translate-y-0 scale-100'
                  : index < currentIndex
                  ? 'opacity-0 transform -translate-y-12 scale-95'
                  : 'opacity-0 transform translate-y-12 scale-95'
              }`}
            >
              <div className="max-w-4xl mx-auto w-full text-center">
                <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 lg:p-12 layered-shadow hover:shadow-strong transition-all duration-500">
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 leading-tight">
                      {poem.title}
                    </h1>
                    <p className="text-secondary-600 dark:text-secondary-400 font-medium text-lg">
                      {poem.date}
                    </p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      {poem.content.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className={
                            line === '' 
                              ? 'h-6' 
                              : 'text-lg md:text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light'
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Progress Indicator */}
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '0.5s' }}>
          <div className="flex gap-2 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-full px-4 py-2 layered-shadow">
            {poems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPoem(index)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-secondary-600 dark:bg-secondary-400 scale-150'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-secondary-300 dark:hover:bg-secondary-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Poem Counter */}
        <div className={`fixed bottom-8 right-8 z-40 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '0.6s' }}>
          <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 layered-shadow">
            {currentIndex + 1} / {poems.length}
          </div>
        </div>

        {/* Instructions */}
        <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 lg:block hidden transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '0.7s' }}>
          <div className="bg-white/70 dark:bg-surface-dark/70 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400">
            Use scroll wheel or arrow keys to navigate
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Poems;