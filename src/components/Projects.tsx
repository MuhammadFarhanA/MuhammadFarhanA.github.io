import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Finance Dashboard App",
      description: "A comprehensive finance dashboard with data visualization and responsive design.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "TypeScript", "Tailwind"],
      link: "#"
    },
    {
      id: 2,
      title: "Health & Fitness Mobile App",
      description: "A mobile application for tracking fitness activities and health metrics.",
      image: "https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React Native", "Redux", "Node.js"],
      link: "#"
    },
    {
      id: 3,
      title: "E-commerce Website Redesign",
      description: "Complete redesign of an e-commerce platform focusing on user experience.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Next.js", "Prisma", "PostgreSQL"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-background-dark">
      <div className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Projects
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                A selection of projects I've worked on
              </p>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Projects
            </button>
          </div>

          <div className="space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;