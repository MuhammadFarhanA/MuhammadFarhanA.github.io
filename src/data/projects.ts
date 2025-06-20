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
    technologies: string[];
    duration: string;
    role: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Teledental",
    description: "A dental health management platform that connects patients with dental professionals for virtual consultations, appointment scheduling, and treatment tracking. Also has dental guidance blogs.",
    image: "images/Teledental.png",
    tags: ["React", "TypeScript", "Bootstrap", "Ant Design", "Node.js"],
    link: "https:teledental.com",
    year: "2024",
    category: "Web Application",
  },
  {
    id: 2,
    title: "PartnerlinQ",
    description: "Cross-platform mobile application for fitness tracking, workout planning, and health monitoring with social features.",
    image: "https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React Native", "Redux", "Node.js", "MongoDB", "Express"],
    github: "#",
    year: "2023",
    category: "Mobile Application",
    caseStudy: {
      overview: "Developed a cross-platform mobile app to help users maintain healthy lifestyles through fitness tracking, personalized workout plans, and social motivation features. The app combines health monitoring with gamification elements to increase user engagement.",
      challenge: "Existing fitness apps lacked social features and personalized workout recommendations, leading to low user retention rates. Users often abandoned their fitness goals due to lack of motivation and generic workout plans that didn't adapt to their progress.",
      solution: "Built a comprehensive app with AI-powered workout recommendations, social challenges, progress tracking, and gamification elements. Implemented a community feature where users can share achievements, join challenges, and motivate each other.",
      results: [
        "50,000+ downloads in first 6 months",
        "85% user retention rate after 30 days",
        "Average session time of 12 minutes",
        "Featured in App Store's 'Health & Fitness' category",
        "4.7-star rating with over 2,000 reviews"
      ],
      technologies: ["React Native", "Redux", "Node.js", "MongoDB", "Firebase", "Machine Learning APIs", "HealthKit", "Google Fit"],
      duration: "6 months",
      role: "Lead Mobile Developer",
      designEvolution: [{
        beforeImage: "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        afterImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "these are some changes"
      }]
    }
  },
  {
    id: 3,
    title: "E-commerce Website Redesign",
    description: "Complete redesign and rebuild of an e-commerce platform focusing on user experience and conversion optimization.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    link: "#",
    github: "#",
    year: "2023",
    category: "E-commerce Platform",
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
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "Vercel", "Algolia Search"],
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