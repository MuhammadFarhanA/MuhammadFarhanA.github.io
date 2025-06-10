import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

interface Poem {
  id: number;
  title: string;
  content: string[];
  date: string;
}

const Poems: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const poems: Poem[] = [
    {
      id: 1,
      title: "Digital Dreams",
      content: [
        "In lines of code, I find my voice,",
        "Each function call, a conscious choice.",
        "Variables dance in memory's hall,",
        "While algorithms answer logic's call.",
        "",
        "The screen glows bright with possibility,",
        "As syntax flows with agility.",
        "In this digital realm I've made my home,",
        "Where thoughts compile and ideas roam."
      ],
      date: "March 2024"
    },
    {
      id: 2,
      title: "The Writer's Paradox",
      content: [
        "Words flow like water from my pen,",
        "Yet sometimes drought consumes me when",
        "The blank page stares with hollow eyes,",
        "And inspiration slowly dies.",
        "",
        "But in the silence, seeds take root,",
        "And from the void springs tender fruit.",
        "For every writer knows the truth:",
        "Creation needs both age and youth."
      ],
      date: "February 2024"
    },
    {
      id: 3,
      title: "Midnight Debugging",
      content: [
        "The clock strikes twelve, the world sleeps sound,",
        "But here I sit, by errors bound.",
        "A semicolon out of place,",
        "Has brought my program to disgrace.",
        "",
        "Line by line, I trace the flow,",
        "Seeking bugs that hide below.",
        "In coffee's warmth and screen's blue light,",
        "I'll code until the morning bright."
      ],
      date: "January 2024"
    },
    {
      id: 4,
      title: "Between the Lines",
      content: [
        "Between the lines of code I write,",
        "Live stories waiting for their light.",
        "Each comment holds a whispered thought,",
        "Each function, battles I have fought.",
        "",
        "The user sees the polished face,",
        "But never knows the hidden grace",
        "Of countless hours spent in care,",
        "To make it seem like magic's there."
      ],
      date: "December 2023"
    },
    {
      id: 5,
      title: "Version Control",
      content: [
        "Like chapters in a living book,",
        "Each commit tells where I took",
        "A different path, a new approach,",
        "As deadlines made their slow approach.",
        "",
        "Git remembers every change,",
        "The history we rearrange.",
        "In branches we explore and grow,",
        "Then merge the paths we've come to know."
      ],
      date: "November 2023"
    },
    {
      id: 6,
      title: "The Art of Simplicity",
      content: [
        "In complexity, we often hide",
        "The simple truths that live inside.",
        "A single line can say it all,",
        "While verbose code begins to fall.",
        "",
        "The master knows that less is more,",
        "That elegance opens every door.",
        "In poetry and code alike,",
        "Precision is what we should strike."
      ],
      date: "October 2023"
    }
  ];

  // Handle wheel scrolling for poem navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentIndex < poems.length - 1) {
        // Scroll down - next poem
        setCurrentIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous poem
        setCurrentIndex(prev => prev - 1);
      }
      
      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling(false), 800);
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
        setTimeout(() => setIsScrolling(false), 800);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setIsScrolling(true);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 800);
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
    setTimeout(() => setIsScrolling(false), 800);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0 && !isScrolling) {
      goToPoem(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < poems.length - 1 && !isScrolling) {
      goToPoem(currentIndex + 1);
    }
  };

  return (
    <PageTransition>
      <div 
        ref={containerRef}
        className="h-screen overflow-hidden bg-gradient-to-br from-secondary-50/30 to-surface-light dark:from-background-dark dark:to-surface-dark relative"
      >
        {/* Back to Home Button */}
        <div className="fixed top-8 left-8 z-50">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg layered-shadow"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === 0
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 hover:shadow-lg layered-shadow'
            }`}
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === poems.length - 1}
            className={`p-3 rounded-full transition-all duration-300 ${
              currentIndex === poems.length - 1
                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                : 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 hover:shadow-lg layered-shadow'
            }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col gap-3">
            {poems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPoem(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-secondary-600 dark:bg-secondary-400 scale-150 shadow-lg shadow-secondary-500/50'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-secondary-300 dark:hover:bg-secondary-700 hover:scale-125'
                }`}
                title={poems[index].title}
              />
            ))}
          </div>
        </div>

        {/* Poems Container */}
        <div className="relative h-full">
          {poems.map((poem, index) => (
            <div
              key={poem.id}
              className={`absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16 transition-all duration-800 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 transform translate-y-0'
                  : index < currentIndex
                  ? 'opacity-0 transform -translate-y-full'
                  : 'opacity-0 transform translate-y-full'
              }`}
            >
              <div className="max-w-4xl mx-auto w-full text-center">
                <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 layered-shadow">
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
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
                              : 'text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light'
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
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
          <div className="flex gap-2 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-full px-4 py-2">
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
        <div className="fixed bottom-8 right-8 z-40">
          <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentIndex + 1} / {poems.length}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Poems;