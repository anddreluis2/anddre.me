export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Experience {
  id: number;
  name: string;
  position: string;
  url: string;
}

export const jobsData: Experience[] = [
  {
    id: 1,
    name: "MercadoFarma (EMS)",
    position: "Frontend Engineer Lead",
    url: "https://mercadofarma.com.br",
  },
  {
    id: 2,
    name: "Meteor Software (Galaxy Team)",
    position: "Frontend Engineer",
    url: "https://www.meteor.com",
  },
  {
    id: 3,
    name: "Monest",
    position: "Frontend Engineer",
    url: "https://monest.com.br",
  },
  {
    id: 4,
    name: "MadeiraMadeira",
    position: "Frontend Engineer",
    url: "https://www.madeiramadeira.com.br",
  },
];

export const projectsData: Experience[] = [
  {
    id: 1,
    name: "Biblioteca de Instrumentos",
    position: "Frontend Engineer",
    url: "https://bibliotecadeinstrumentos.com.br/",
  },
  {
    id: 2,
    name: "Humantrack",
    position: "Founder Engineer",
    url: "https://humantrack.io",
  },
  {
    id: 3,
    name: "Personal Portfolio",
    position: "Creator & Developer",
    url: "https://github.com/anddreluis2/anddre.me",
  },
];
