import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { ArrowLeft, BookOpen } from "lucide-react";

const PoemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idx = Number(id);
  const poem = poems[idx];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Poem not found</h2>
          <button onClick={() => navigate('/poems')} className="btn btn-primary mt-2">Back to List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-secondary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-secondary-100/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header (sticky, blurred, bordered) */}
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
              <span>Back to List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 relative z-10">
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-700 rounded-2xl px-8 py-12 md:px-16 md:py-16 layered-shadow group">
          <div className="mb-8 flex flex-col items-center">
            <div className={`flex items-center gap-3 mb-4 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                <BookOpen size={24} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 text-center">
                {poem.title}
              </h2>
            </div>
            <p className={`text-secondary-600 dark:text-secondary-400 font-medium text-lg md:text-xl text-center transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.4s' }}>
              {poem.date}
            </p>
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
        </div>
      </div>
    </div>
  );
};

export default PoemDetail;
