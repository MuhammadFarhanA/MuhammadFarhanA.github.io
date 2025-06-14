import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { BookOpen, ArrowLeft, Calendar, Eye } from "lucide-react";
import PageTransition from "../components/PageTransition";

const PoemList: React.FC = () => {
  const navigate = useNavigate();
  const [visiblePoems, setVisiblePoems] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const poemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Scroll to top and reset animations when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setVisiblePoems([]); // Reset visible poems for animation
  }, []);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    // Add a small delay to allow scroll and reset before observing
    const observerTimeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = poemRefs.current.findIndex(ref => ref === entry.target);
              if (index !== -1 && !visiblePoems.includes(index)) {
                setVisiblePoems(prev => [...prev, index]);
              }
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '-20px 0px -20px 0px'
        }
      );

      poemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      // Cleanup
      return () => {
        poemRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, 200); // Short delay to allow scroll reset
    return () => clearTimeout(observerTimeout);
  }, [visiblePoems]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-secondary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-secondary-100/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header */}
        <div className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-neutral-200/50 dark:border-neutral-700/50 sticky top-0 z-40 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Portfolio</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="text-center">
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
                <p className={`text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '0.4s' }}>
                  A collection of original poems exploring creativity, code, and life through verse.
                </p>
              </div>
            </div>

            {/* Poems Grid */}
            <div className="space-y-8">
              {poems.map((poem, index) => (
                <div
                  key={poem.id}
                  ref={(el) => (poemRefs.current[index] = el)}
                  className={`group bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 hover:-translate-y-2 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex transform ${
                    visiblePoems.includes(index)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Poem Visual/Quote Section */}
                  <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-secondary-50 via-secondary-100/50 to-secondary-200/30 dark:from-secondary-900/20 dark:via-secondary-800/10 dark:to-secondary-700/5">
                    <div className="aspect-[4/3] lg:aspect-[3/2] flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-full mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                          <BookOpen size={32} className="text-secondary-600 dark:text-secondary-400" />
                        </div>
                        <blockquote className="text-lg md:text-xl font-medium text-secondary-800 dark:text-secondary-200 italic leading-relaxed">
                          "{poem.content.find(line => line.trim())?.slice(0, 120) || ""}..."
                        </blockquote>
                      </div>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg transform transition-all duration-300 group-hover:scale-105">
                          Poetry
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg transform transition-all duration-300 group-hover:scale-105">
                          <Calendar size={14} />
                          {poem.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Poem Content */}
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      {/* Title */}
                      <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-all duration-300 transform group-hover:translate-x-2">
                        {poem.title}
                      </h2>
                      
                      {/* Preview */}
                      <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.1s' }}>
                        <p className="mb-3">
                          {poem.content.find(line => line.trim())?.slice(0, 100) || ""}...
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-500">
                          {poem.content.filter(line => line.trim()).length} lines • {poem.date}
                        </p>
                      </div>

                      {/* Poem Action */}
                      <div className="flex flex-wrap gap-3 pt-4 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.3s' }}>
                        <button
                          onClick={() => navigate(`/poems/${index}`)}
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <Eye size={16} />
                            Read Poem
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                      </div>

                      {/* Poem Meta */}
                      <div className="flex items-center gap-4 pt-2 text-sm text-neutral-500 dark:text-neutral-400 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.4s' }}>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {poem.date}
                        </span>
                        <span>•</span>
                        <span>Original Poetry</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to About */}
            <div className={`text-center mt-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.8s' }}>
              <button
                onClick={() => navigate('/#about')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
              >
                <span className="relative z-10">Back to About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PoemList;