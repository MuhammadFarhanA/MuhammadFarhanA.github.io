import React from 'react';
import { Download, Code, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50/80 to-cyan-50/60 dark:from-surface-dark dark:to-background-dark">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-12 text-center">
            About Me
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Development Section */}
            <div className="bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <Code size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  Development
                </h3>
              </div>
              
              <div className="space-y-4 text-neutral-600 dark:text-gray-300">
                <p>
                  I love building things that live on the web. My focus is on creating accessible, 
                  pixel-perfect interfaces that actually work well for real people. There's something 
                  satisfying about that sweet spot where good design meets solid engineering.
                </p>
                
                <p>
                  Currently working as a Software Engineer II at Illumina, where I get to solve 
                  interesting problems with some really smart people. Before that, I spent time 
                  leading frontend projects at PartnerLinq and cut my teeth as a junior at Systems Limited.
                </p>
              </div>
            </div>

            {/* Writing Section */}
            <div className="bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                  <PenTool size={24} className="text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  Writing
                </h3>
              </div>
              
              <div className="space-y-4 text-neutral-600 dark:text-gray-300">
                <p>
                  When I'm not coding, I'm usually writing. I do a lot of technical writing - 
                  documentation, API guides, blog posts about development. There's an art to 
                  making complex stuff actually understandable.
                </p>
                
                <p>
                  But I also write poetry and creative pieces when the mood strikes. Sometimes 
                  the same attention to detail that goes into clean code finds its way into 
                  crafting verses. Both require patience, revision, and knowing when something 
                  finally feels right.
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/poems')}
                    className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-colors"
                  >
                    <PenTool size={16} />
                    Read my poetry →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/Muhammad Farhan Atif - Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong"
            >
              <Download size={18} /> View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;