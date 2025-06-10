import React from 'react';
import { Briefcase } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const WorkExperience: React.FC = () => {
  const experiences: Experience[] = [
    {
      title: "Software Engineer II",
      company: "Illumina Technology Solutions",
      period: "January 2025 - Present",
      description: [
        "Developing and maintaining enterprise-level software solutions",
        "Collaborating with cross-functional teams to deliver high-quality products",
        "Implementing best practices in software development and code review processes"
      ]
    },
    {
      title: "Consultant Frontend",
      company: "PartnerLinq",
      period: "2022 - 2025",
      description: [
        "Led frontend development for client projects using modern web technologies",
        "Designed and implemented responsive user interfaces and user experiences",
        "Collaborated with backend teams to integrate APIs and optimize performance",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      title: "Junior Consultant",
      company: "Systems Limited",
      period: "2021 - 2022",
      description: [
        "Assisted in the development of web applications and software solutions",
        "Participated in requirement gathering and analysis sessions with clients",
        "Contributed to testing and quality assurance processes",
        "Gained experience in various programming languages and frameworks"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50/80 to-yellow-50/60 dark:from-surface-dark dark:to-background-dark backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-12">
            Work Experience
          </h2>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="group relative pl-8 border-l-2 border-primary-200 dark:border-primary-800 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-white/80 dark:bg-surface-dark border-2 border-primary-200 dark:border-primary-800 group-hover:border-primary-500 dark:group-hover:border-primary-400 rounded-full transition-colors backdrop-blur-sm">
                  <Briefcase size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400" />
                </div>
                
                <div className="bg-white/70 dark:bg-surface-dark backdrop-blur-sm p-6 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                        {exp.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-4 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 dark:bg-primary-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;