import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

interface ProjectDetails {
  year: number;
  name: string;
  techStack: string[];
  url: string;
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  
  const projects: ProjectDetails[] = [
    {
      year: 2024,
      name: "Finance Dashboard App",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Chart.js"],
      url: "https://finance-dashboard.example.com"
    },
    {
      year: 2023,
      name: "Health & Fitness Mobile App",
      techStack: ["React Native", "Redux", "Node.js", "Express", "MongoDB"],
      url: "https://health-fitness.example.com"
    },
    {
      year: 2023,
      name: "E-commerce Website Redesign",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Stripe"],
      url: "https://ecommerce.example.com"
    },
    {
      year: 2022,
      name: "Social Media Analytics Platform",
      techStack: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
      url: "https://analytics.example.com"
    },
    {
      year: 2022,
      name: "Real Estate Management System",
      techStack: ["React", "Node.js", "MongoDB", "Express", "AWS"],
      url: "https://realestate.example.com"
    },
    {
      year: 2021,
      name: "Task Management Application",
      techStack: ["Angular", "Firebase", "TypeScript", "Material UI"],
      url: "https://taskmanager.example.com"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background-light dark:bg-background-dark py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Project Archive
          </h1>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-neutral-200 dark:border-neutral-700 layered-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      {project.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {project.url}
                    </a>
                  </div>
                  <span className="px-4 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-full">
                    {project.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectList;