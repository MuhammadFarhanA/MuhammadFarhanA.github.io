import React, { useEffect, useRef, useState } from 'react';
import { Download, Code, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50/80 to-cyan-50/60 dark:from-surface-dark dark:to-background-dark relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-12 text-center transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            About Me
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Development Section */}
            <div className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            } hover:-translate-y-2`}
            style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Code size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  Development
                </h3>
              </div>
              
              <div className="space-y-4 text-neutral-600 dark:text-gray-300">
                <p className="transform transition-all duration-300 group-hover:translate-x-2">
                  I love building things that live on the web. My focus is on creating accessible, 
                  pixel-perfect interfaces that actually work well for real people. There's something 
                  satisfying about that sweet spot where good design meets solid engineering.
                </p>
                
                <p className="transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.1s' }}>
                  Currently working as a Software Engineer II at Illumina, where I get to work on design making and implementation. Currently learning Figma design. Before that, I spent time 
                  designing frontends for different projects at PartnerLinq and cut my teeth as a junior at Systems Limited.
                </p>
              </div>
            </div>

            {/* Writing Section */}
            <div className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            } hover:-translate-y-2`}
            style={{ transitionDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <PenTool size={24} className="text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  Writing
                </h3>
              </div>
              
              <div className="space-y-4 text-neutral-600 dark:text-gray-300">
                <p className="transform transition-all duration-300 group-hover:translate-x-2">
                  When I'm not coding, I'm usually writing. I do a lot of technical writing - 
                  documentation, API guides, blog posts about development. There's an art to 
                  making complex stuff actually understandable.
                </p>
                
                <p className="transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.1s' }}>
                  But I also write poetry and creative pieces when the mood strikes. Sometimes 
                  the same attention to detail that goes into clean code finds its way into 
                  crafting verses. Both require patience, revision, and knowing when something 
                  finally feels right.
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/poems')}
                    className="group/btn inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-all duration-300 transform hover:translate-x-2"
                  >
                    <PenTool size={16} className="group-hover/btn:animate-pulse" />
                    Read my poetry →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`text-center mt-12 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '0.6s' }}>
            <a 
              href="/Muhammad Farhan Atif - Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={18} className="group-hover:animate-bounce" /> 
                View Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;