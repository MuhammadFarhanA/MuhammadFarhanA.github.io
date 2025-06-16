export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
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