export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export const jobsData: Project[] = [
  {
    id: 2,
    name: "MercadoFarma (EMS)",
    description:
      "Leading the frontend development for MercadoFarma, the e-commerce platform for EMS pharmaceutical company that sells directly to points of sale. Manages high-volume transactions and user traffic as the Frontend Lead.",
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "RESTful"],
    link: "https://mercadofarma.com.br",
  },
  {
    id: 3,
    name: "Meteor Software (Galaxy Team)",
    description:
      "Major contribution to Meteor Software's Galaxy hosting platform, enabling developers to deploy and scale Node.js, Go, Python applications and MongoDB databases. Worked with open-source technologies and helped build the product from scratch.",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Go",
      "Meteor",
      "tRPC",
      "Playwright",
      "GraphQL",
      "DynamoDB",
      "MongoDB",
    ],
    link: "https://www.meteor.com",
  },
  {
    id: 4,
    name: "Monest",
    description:
      "Developed financial management interfaces for a startup focused on credit management and collections. Implemented UX/UI best practices to create intuitive financial interfaces for users managing credit operations.",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "NestJS",
      "MySQL",
    ],
    link: "https://monest.com.br",
  },
  {
    id: 5,
    name: "MadeiraMadeira",
    description:
      "Contributed to frontend development at MadeiraMadeira, a unicorn e-commerce company based in Curitiba. Worked on improving user experience and interface components for the online shopping platform.",
    technologies: ["React", "JavaScript", "PHP", "Next.js"],
    link: "https://www.madeiramadeira.com.br",
  },
];

export const projectsData: Project[] = [
  {
    id: 7,
    name: "Biblioteca de Instrumentos",
    description:
      "Developed a comprehensive digital library platform for musical instruments, providing detailed information, specifications, and resources for musicians and music enthusiasts. Features an intuitive interface for browsing and discovering various musical instruments.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://bibliotecadeinstrumentos.com.br/",
  },
  {
    id: 1,
    name: "Humantrack",
    description:
      "Co-founded a HealthTech platform focused on evidence-based psychological care. Developed a system handling sensitive health data that grew to 2,000 professional users within 6 months. Implements robust security measures for healthcare data protection.",
    technologies: [
      "React",
      "TypeScript",
      "Go",
      "Docker",
      "CI/CD",
      "REST",
      "PostgreSQL",
    ],
    link: "https://humantrack.io",
  },
  {
    id: 0,
    name: "Personal Portfolio",
    description:
      "My personal website built with modern web technologies to showcase my projects and professional experience. Features responsive design, theme switching, and custom animations.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    link: "https://github.com/anddreluis2/anddre.me",
  },
];
