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
import { Project, jobsData, projectsData } from "./data";
import { CustomSeparator } from "@/components/ui/custom-separator";

const ProjectSection = ({
  title,
  description,
  data,
  openItems,
  setOpenItems,
  startDelay = 0,
}: {
  title: string;
  description: string;
  data: Project[];
  openItems: string;
  setOpenItems: (value: string) => void;
  startDelay?: number;
}) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: startDelay, ease: "easeOut" }}
    >
      <div className="mb-10 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent rounded-full" />
        <AnimatedHoverText
          text={title}
          element="h2"
          className="font-semibold mb-3 pl-4"
          startDelay={startDelay * 1000 + 200}
        />
        <AnimatedHoverText
          text={description}
          element="p"
          className="text-muted-foreground pl-4"
          startDelay={startDelay * 1000 + 600}
        />
        <motion.div
          className="mt-6 pl-4"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "4rem" }}
          transition={{ duration: 0.8, delay: startDelay + 0.5 }}
        >
          <div className="h-px bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        value={openItems}
        onValueChange={setOpenItems}
      >
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: startDelay + 0.4 + index * 0.1,
              ease: "easeOut",
            }}
          >
            <AccordionItem
              value={`${title.toLowerCase()}-item-${item.id}`}
              className="group rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/10 border border-transparent hover:border-primary/20"
            >
              <AccordionTrigger className="text-left hover:no-underline px-6 py-5 transition-all duration-200 hover:bg-muted/30 relative cursor-pointer">
                {/* Clickable indicator */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary/20 rounded-full transition-all duration-300 group-hover:bg-primary/60 group-hover:h-12" />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Click to expand</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full pl-4 pr-24">
                  <h3 className="font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 4).map((tech) => (
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
                    {item.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs border border-primary/20">
                        +{item.technologies.length - 4} more
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
                    {item.description}
                  </p>

                  <div>
                    <h4 className="font-medium mb-3 text-foreground">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
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

                  {item.link && (
                    <motion.div
                      className="pt-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.a
                        href={item.link}
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
  );
};

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
            text="Work & Projects"
            element="h1"
            className="font-bold"
            startDelay={200}
          />
        </motion.div>

        <div className="w-full space-y-20 mt-8">
          <ProjectSection
            title="Professional Experience"
            description="Companies and teams I've worked with"
            data={jobsData}
            openItems={openItems}
            setOpenItems={setOpenItems}
            startDelay={0.3}
          />

          {/* Custom separator between sections */}
          <CustomSeparator
            className="my-12"
            animated={true}
            withDot={true}
            delay={1.2}
          />

          <ProjectSection
            title="Personal Projects"
            description="Projects I've built and co-founded"
            data={projectsData}
            openItems={openItems}
            setOpenItems={setOpenItems}
            startDelay={1.5}
          />
        </div>
      </main>
    </div>
  );
}
