import React from 'react';
import SkillBar from './SkillBar';

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

const Skills: React.FC = () => {
  const designSkills: Skill[] = [
    { name: 'User Interface Design', percentage: 95, color: 'from-primary-600 to-primary-400' },
    { name: 'User Experience Design', percentage: 90, color: 'from-secondary-600 to-secondary-400' },
    { name: 'Wireframing & Prototyping', percentage: 92, color: 'from-accent-600 to-accent-400' },
    { name: 'User Research', percentage: 85, color: 'from-tertiary-600 to-tertiary-400' }
  ];

  const technicalSkills: Skill[] = [
    { name: 'Figma', percentage: 98, color: 'from-primary-600 to-primary-400' },
    { name: 'Adobe XD', percentage: 88, color: 'from-secondary-600 to-secondary-400' },
    { name: 'HTML/CSS', percentage: 85, color: 'from-accent-600 to-accent-400' },
    { name: 'JavaScript/React', percentage: 75, color: 'from-tertiary-600 to-tertiary-400' }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-primary-50/30 to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="container mx-auto px-8 md:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            My Skills & Expertise
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            With a strong foundation in design principles and technical knowledge,
            I create exceptional user experiences across various platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-surface-dark rounded-xl p-8 layered-shadow border border-neutral-200/50 dark:border-neutral-700/50">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Design Skills
            </h3>
            <div className="space-y-6">
              {designSkills.map(skill => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color={skill.color}
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl p-8 layered-shadow border border-neutral-200/50 dark:border-neutral-700/50">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map(skill => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {['Research', 'Wireframing', 'Prototyping', 'Testing', 'Visual Design', 'Interaction', 'Responsive', 'Accessibility'].map((process, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-surface-dark rounded-lg p-4 text-center layered-shadow border border-neutral-200/50 dark:border-neutral-700/50"
            >
              <p className="text-neutral-800 dark:text-neutral-200 font-medium">{process}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;