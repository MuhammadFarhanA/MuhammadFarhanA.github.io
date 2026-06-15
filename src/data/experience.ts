export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    title: "Frontend & Mobile UI Developer",
    company: "Lumovy Technology Solutions (formerly Illumina Technology Solutions)",
    period: "January 2025 - Present",
    description: [
      "Created Figma prototypes for redesigned ecommerce and POS flows, then implemented the approved designs using React, HTML, and SCSS to improve usability and maintain consistency between design and production UI.",
      "Designed and implemented UI enhancements for client demos, adapting Microsoft Dynamics 365 Commerce experiences through CMS configurations and frontend code customizations while following Microsoft extension guidelines.",
      "Developed 25+ reusable React Native UI components for a Microsoft Dynamics 365 Commerce mobile application implementation, focusing on consistent user flows, reusable patterns, and mobile-friendly UI behavior.",
      "Built reusable UI components, layout patterns, and utility functions to support scalable frontend development and reduce repeated implementation work.",
      "Used ChatGPT and Claude as part of the development workflow to explore approaches, speed up iteration, and validate implementation decisions while maintaining code quality."
    ]
  },
  {
    title: "Consultant Frontend Engineer",
    company: "PartnerLinQ (Visionet Systems / Systems Limited Subsidiary)",
    period: "March 2022 - January 2025",
    description: [
      "Served as one of two frontend/UI specialists responsible for designing, implementing, and maintaining UI experiences across multiple enterprise applications.",
      "Led the UI migration effort from Angular Material to PrimeNG, rebuilding existing components, standardizing behavior, and aligning interfaces with updated design requirements.",
      "Designed and implemented a reusable SCSS mixin-based styling system that enabled dynamic utility-style classes, improving consistency and reducing repetitive styling across applications.",
      "Developed new reusable components and improved existing ones to support evolving business requirements while keeping the user experience cohesive.",
      "Redesigned and refined dashboard interfaces and user flows to improve usability, information hierarchy, and overall interaction quality.",
      "Identified and resolved UI inconsistencies across applications by standardizing frontend patterns and improving component maintainability."
    ]
  },
  {
    title: "Junior Consultant Frontend",
    company: "Systems Limited",
    period: "July 2021 - March 2022",
    description: [
      "Implemented frontend UI for enterprise applications using Angular, HTML, SCSS, and JavaScript, focusing on clean layout structure and accurate design implementation.",
      "Built responsive interfaces and reusable UI components aligned with Figma designs and project requirements.",
      "Handled common UI issues such as layout misalignment, inconsistent spacing, and component reuse across modules.",
      "Worked with designers and developers to refine interfaces, improve usability, and maintain consistency across screens."
    ]
  }
];