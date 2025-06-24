"use client";

import { AnimatedHoverText } from "@/components/ui/animated-hover-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

const projectsData: Project[] = [
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
  {
    id: 6,
    name: "Personal Portfolio",
    description:
      "My personal website built with modern web technologies to showcase my projects and professional experience. Features responsive design, theme switching, and custom animations.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    link: "https://github.com/anddreluis2/anddre.me",
  },
];

export default function Projects() {
  const [openItems, setOpenItems] = useState<string>("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatedHoverText
            text="Projects & Experiences"
            element="h1"
            className="font-bold mb-4"
            startDelay={200}
          />
          <AnimatedHoverText
            text="A showcase of my professional journey and the projects I've contributed to"
            element="p"
            className="text-muted-foreground text-lg max-w-2xl"
            startDelay={800}
          />
        </motion.div>

        <motion.div
          className="w-full mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <AccordionItem
                  value={`item-${project.id}`}
                  className="rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <AccordionTrigger className="text-left hover:no-underline px-6 py-5 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex flex-col items-start w-full">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-muted/70 rounded-full text-xs text-muted-foreground border border-border/30"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {project.description}
                      </p>

                      <div>
                        <h4 className="font-medium mb-3 text-foreground">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: techIndex * 0.05,
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {project.link && (
                        <motion.div
                          className="pt-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors underline underline-offset-4 font-medium"
                            whileHover={{ x: 5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            Visit Project
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              whileHover={{ rotate: 45 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </motion.svg>
                          </motion.a>
                        </motion.div>
                      )}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </main>
    </div>
  );
}
