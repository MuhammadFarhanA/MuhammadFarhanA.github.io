export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  year: string;
  category: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
    duration: string;
    role: string;
    designEvolution?: {
      beforeImage?: string;
      afterImage?: string;
      description?: string;
    }[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Teledental",
    description: "A dental health management platform that connects patients with dental professionals for virtual consultations, appointment scheduling, and treatment tracking. Also has dental guidance blogs. Built frontend view using React and mobile-first approach.",
    image: "images/Teledental.png",
    tags: ["HTML", "CSS" , "React", "TypeScript", "Bootstrap", "Ant Design", "Node.js"],
    link: "https:teledental.com",
    year: "2024",
    category: "Web Application",
  },
  {
    id: 2,
    title: "PartnerlinQ",
    description: "An EDI platform for various international partners to use for onboarding and exchanging data with their respective partners. Implemented the design first using Angular Material and MAterial UI then switched to PrimeNG.",
    image: "images/Partnerlinq.png",
    tags: ["HTML", "CSS" ,"Angular", "TypeScript", "SCSS" , "Material UI", "Bootstrap", "Angular Material" , "PrimeNG"],
    year: "2022",
    category: "Web Application",
    caseStudy: {
      overview: "Worked as a UI/UX developer for about 3 years on new features and enhancements as well as maintaining the existing codebase of PartnerlinQ, an EDI platform used by various international partners for onboarding and exchanging data. The platform had multiple internal portals all with their own functionality and user experience requirements.",
      challenge: "Since it was an evolving product with multiple internal portals, there was always the issue of increasing design inconsistencies and user confusion. The goal was to create a unified design system that could be used across all portals, ensuring a consistent user experience. There was significant design burden with global styling reaching thousands of lines across multiple platforms rather than a unified design system. Using Material UI and Angular Material also added on significant complexity with multiple design overrides needed as per changing design requirements.",
      solution: "Replaced Material UI and Angular Material with PrimeNG to create a more consistent and maintainable design system. Developed a custom design system that could be used across all portals, ensuring a unified user experience. Created custom utility classes using mixins mimicing Tailwind functionality since completely removing Bootstrap was not part of current scope. Reworked all components' reusability and modularity to reduce design burden and improve maintainability. Moving to PrimeNG also allowed us to shift the design towards a more modern style, aligning with current design trends.",
      results: [
        "80% reduction in design inconsistencies across portals",
        "50% faster development time for new features due to easier class structure",
        "90% reduction in CSS file size due to custom utility classes",
        "Enhanced maintainability with a unified design system"
      ],
      
      duration: "3 years",
      role: "Lead Mobile Developer",
      designEvolution: [{
        description: "Due to NDA and confidentiality agreements, I am unable to share specific before and after images of the design evolution. However, the transition from Material UI and Angular Material to PrimeNG significantly improved the design consistency and maintainability of the platform.",
      }]
    }
  },
  {
    id: 3,
    title: "Soletechs",
    description: "A marketing website for an HCM (Human Capital Management) service provider in the Middle East. Built from scratch using mobile-first approach. Current updates to the live version are ongoing. Also implemented design strategy for RTL and LTR due to arabic text direction requirements.",
    image: "images/Soletechs.png",
    tags: ["HTML", "CSS" ,"Angular", "TypeScript", "SCSS" ,  "Bootstrap"],
    link: "https://soletechs.com/",
    year: "2023",
    category: "Marketing Website",
    caseStudy: {
      overview: "Redesigned and rebuilt an existing e-commerce platform to improve user experience, increase conversion rates, and modernize the technology stack. The project involved comprehensive user research, A/B testing, and performance optimization.",
      challenge: "The original platform had a 68% cart abandonment rate and poor mobile experience, resulting in significant revenue loss. The outdated design and slow loading times were driving customers away to competitors.",
      solution: "Implemented a mobile-first design approach, streamlined checkout process, and added advanced search and filtering capabilities. Optimized images and implemented lazy loading to improve performance across all devices.",
      results: [
        "35% reduction in cart abandonment rate",
        "50% increase in mobile conversions",
        "25% improvement in page load speeds",
        "20% increase in average order value",
        "15% boost in overall revenue within 3 months"
      ],
      
      duration: "3 months",
      role: "Frontend Developer & UX Designer"
    }
  }
];

export const allProjects = [
  ...projects,
  {
    id: 4,
    title: "Social Media Analytics Platform",
    description: "Advanced analytics platform for social media managers to track performance, engagement, and growth metrics across multiple platforms.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
    link: "https://analytics.example.com",
    github: "https://github.com/example/social-analytics",
    year: "2022",
    category: "Analytics Platform"
  },
  {
    id: 5,
    title: "Real Estate Management System",
    description: "Comprehensive property management system for real estate agencies with CRM, listing management, and client portal features.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    link: "https://realestate.example.com",
    github: "https://github.com/example/realestate-system",
    year: "2022",
    category: "Management System"
  },
  {
    id: 6,
    title: "Task Management Application",
    description: "Collaborative task management application with team features, project tracking, and productivity analytics.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Angular", "Firebase", "TypeScript", "Material UI"],
    link: "https://taskmanager.example.com",
    github: "https://github.com/example/task-manager",
    year: "2021",
    category: "Productivity Tool"
  }
];