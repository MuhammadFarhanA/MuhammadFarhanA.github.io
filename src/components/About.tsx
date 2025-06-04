import React from 'react';
import { Download, Clock, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-surface-light to-accent-50/20 dark:from-surface-dark dark:to-background-dark">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                About Me
              </h2>
              
              <p className="text-lg text-neutral-700 dark:text-gray-300 mb-6">
                I'm a passionate UI/UX designer with over 5 years of experience creating 
                user-centered digital experiences. My approach combines aesthetic design with 
                functional usability to create products that not only look great but perform exceptionally.
              </p>
              
              <p className="text-lg text-neutral-700 dark:text-gray-300 mb-6">
                My journey in design began with a degree in Interactive Media Design, followed by 
                roles at various creative agencies and tech startups. This diverse experience has 
                given me a unique perspective on solving design challenges across different industries.
              </p>
              
              <p className="text-lg text-neutral-700 dark:text-gray-300 mb-8">
                When I'm not designing, you can find me exploring new design trends, 
                attending UX workshops, or mentoring aspiring designers. I believe in 
                continuous learning and staying ahead of industry advancements.
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { 
                    icon: <Clock size={24} className="text-primary-600 dark:text-primary-400" />,
                    title: "5+ Years",
                    description: "Professional Experience" 
                  },
                  { 
                    icon: <Award size={24} className="text-secondary-600 dark:text-secondary-400" />,
                    title: "15+ Projects",
                    description: "Successfully Completed" 
                  },
                  { 
                    icon: <Users size={24} className="text-accent-600 dark:text-accent-400" />,
                    title: "10+ Clients",
                    description: "Worldwide Collaboration" 
                  },
                  { 
                    icon: <Award size={24} className="text-tertiary-600 dark:text-tertiary-400" />,
                    title: "3 Awards",
                    description: "For Design Excellence" 
                  },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-surface-dark p-6 rounded-xl layered-shadow"
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                    <p className="text-neutral-600 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white dark:bg-surface-dark p-6 rounded-xl layered-shadow">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  My Design Philosophy
                </h3>
                <p className="text-neutral-700 dark:text-gray-300 italic">
                  "Good design is about creating solutions that serve both the user's needs and business objectives.
                  It's finding that perfect balance between beauty, functionality, and purpose."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;