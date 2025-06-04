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
      title: "Senior UI/UX Designer",
      company: "Tech Innovation Labs",
      period: "2021 - Present",
      description: [
        "Led the redesign of core products resulting in 40% increase in user engagement",
        "Managed a team of 4 designers and collaborated with product managers",
        "Implemented design system used across 12 different products"
      ]
    },
    {
      title: "UI/UX Designer",
      company: "Digital Solutions Inc",
      period: "2019 - 2021",
      description: [
        "Designed user interfaces for web and mobile applications",
        "Conducted user research and usability testing",
        "Created wireframes, prototypes, and high-fidelity designs"
      ]
    },
    {
      title: "Junior Designer",
      company: "Creative Agency",
      period: "2018 - 2019",
      description: [
        "Assisted in the design of marketing materials and websites",
        "Collaborated with developers to ensure design implementation",
        "Participated in client meetings and presentations"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-surface-dark">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-12">
            Work Experience
          </h2>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="group relative pl-8 border-l-2 border-primary-200 dark:border-primary-800 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-white dark:bg-surface-dark border-2 border-primary-200 dark:border-primary-800 group-hover:border-primary-500 dark:group-hover:border-primary-400 rounded-full transition-colors">
                  <Briefcase size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400" />
                </div>
                
                <div className="bg-white dark:bg-surface-dark p-6 rounded-lg layered-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
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