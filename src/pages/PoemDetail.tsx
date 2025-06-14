import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { ArrowLeft, BookOpen, Calendar, User, Clock, Eye } from "lucide-react";
import PageTransition from "../components/PageTransition";

const PoemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idx = Number(id);
  const poem = poems[idx];
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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
    if (!poem) return; // Don't set up observer until poem is loaded

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleSections(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Small delay to ensure refs are set
    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [poem]); // Re-run when poem loads

  useEffect(() => {
    if (poem) {
      document.title = `${poem.title} - Poetry | Portfolio`;
    }
  }, [poem]);

  if (!poem) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Poem Not Found
            </h1>
            <button
              onClick={() => navigate('/poems')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300"
            >
              <ArrowLeft size={16} />
              Back to Poems
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const wordCount = poem.content.join(' ').split(' ').filter(word => word.trim()).length;
  const lineCount = poem.content.filter(line => line.trim()).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-secondary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-secondary-100/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Header */}
        <div className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-neutral-200/50 dark:border-neutral-700/50 sticky top-0 z-40 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/poems')}
                className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Poetry</span>
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/poems')}
                  className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Eye size={16} />
                    More Poems
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Poem Header */}
            <div className={`text-center mb-12 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="px-4 py-2 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 text-sm font-medium rounded-full">
                  Original Poetry
                </span>
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Calendar size={16} />
                  <span>{poem.date}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                {poem.title}
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                A reflection on creativity, code, and the intersection of technology and art.
              </p>
            </div>

            {/* Poem Details Grid */}
            <div 
              ref={(el) => (sectionRefs.current[0] = el)}
              className={`grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 transform transition-all duration-700 ${
                visibleSections.includes(0) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Reading Time</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">{readingTime} min read</p>
              </div>

              <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <User size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Author</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">Farhan Atif</p>
              </div>

              <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Lines</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">{lineCount} lines</p>
              </div>

              <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">Published</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">{poem.date}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Poem Content */}
              <div className="lg:col-span-3">
                <section 
                  ref={(el) => (sectionRefs.current[1] = el)}
                  className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
                    visibleSections.includes(1) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                      <BookOpen size={24} className="text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{poem.title}</h2>
                  </div>
                  
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      {poem.content.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className={
                            line === ""
                              ? "h-7"
                              : "text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light"
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Poem Info */}
                <div 
                  ref={(el) => (sectionRefs.current[2] = el)}
                  className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
                    visibleSections.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Poem Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Published</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">{poem.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Word Count</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">{wordCount} words</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Lines</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">{lineCount} lines</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Reading Time</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">{readingTime} minute{readingTime > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div 
                  ref={(el) => (sectionRefs.current[3] = el)}
                  className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
                    visibleSections.includes(3) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                    Navigation
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/poems')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Eye size={16} />
                        More Poems
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    
                    {idx > 0 && (
                      <button
                        onClick={() => navigate(`/poems/${idx - 1}`)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium"
                      >
                        <ArrowLeft size={16} />
                        Previous Poem
                      </button>
                    )}
                    
                    {idx < poems.length - 1 && (
                      <button
                        onClick={() => navigate(`/poems/${idx + 1}`)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium"
                      >
                        Next Poem
                        <ArrowLeft size={16} className="rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div 
              ref={(el) => (sectionRefs.current[4] = el)}
              className={`mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-700 transform transition-all duration-700 ${
                visibleSections.includes(4) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <button
                  onClick={() => navigate('/poems')}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
                >
                  <span className="relative z-10">View More Poems</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                
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
      </div>
    </PageTransition>
  );
};

export default PoemDetail;