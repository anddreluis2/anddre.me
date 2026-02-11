"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Folder, FolderOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FolderAccordionProps {
  title: string;
  children: React.ReactNode;
  level?: number;
  defaultOpen?: boolean;
  className?: string;
}

export function FolderAccordion({
  title,
  children,
  level = 1,
  defaultOpen = false,
  className,
}: FolderAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const value = React.useId();

  // Calculate indentation based on level
  const indentClass = level === 1 ? "ml-0" : level === 2 ? "ml-4" : "ml-8";
  
  // Styling based on level
  const defaultStyles = {
    fontSize: "text-base font-semibold",
    iconSize: "h-4 w-4",
    padding: "py-3 px-2",
    spacing: "mb-3 mt-4",
  };

  const levelStylesMap: Record<number, typeof defaultStyles> = {
    1: {
      fontSize: "text-xl font-bold",
      iconSize: "h-5 w-5",
      padding: "py-4 px-2",
      spacing: "mb-6 mt-8",
    },
    2: defaultStyles,
    3: {
      fontSize: "text-sm font-medium",
      iconSize: "h-4 w-4",
      padding: "py-2 px-2",
      spacing: "mb-2 mt-2",
    },
  };
  
  const levelStyles = levelStylesMap[level] || defaultStyles;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={isOpen ? value : ""}
      onValueChange={(val) => setIsOpen(val === value)}
      className={cn("w-full", indentClass, levelStyles.spacing, className)}
    >
      <AccordionPrimitive.Item value={value} className="border-none">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            className={cn(
              "flex flex-1 items-center gap-3 text-left transition-all duration-200 group outline-none rounded-md",
              "hover:bg-muted/50 focus-visible:bg-muted/50",
              levelStyles.fontSize,
              levelStyles.padding
            )}
          >
            <ChevronRight
              className={cn(
                levelStyles.iconSize,
                "shrink-0 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
            {isOpen ? (
              <FolderOpen 
                className={cn(
                  levelStyles.iconSize,
                  "shrink-0 text-yellow-500 dark:text-yellow-400"
                )} 
              />
            ) : (
              <Folder 
                className={cn(
                  levelStyles.iconSize,
                  "shrink-0 text-muted-foreground group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-200"
                )} 
              />
            )}
            <span className="flex-1">
              {title}
            </span>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className={cn(
            "pt-2 pb-2",
            level === 1 && "pl-10",
            level === 2 && "pl-10",
            level === 3 && "pl-8"
          )}>
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
