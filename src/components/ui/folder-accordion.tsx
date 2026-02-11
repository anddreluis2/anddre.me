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

  // Calculate indentation based on level - sem indentação no mobile
  const indentClass = "ml-0"; // Sem aninhamento no mobile e desktop
  
  // Content padding - sem indentação no mobile, com indentação no desktop
  const contentPaddingClass = level === 1 
    ? "pl-0 pr-2 sm:pl-0 sm:pr-2" 
    : level === 2 
    ? "pl-0 pr-2 sm:pl-10 sm:pr-2" 
    : "pl-0 pr-2 sm:pl-16 sm:pr-2";
  
  // Styling based on level
  const defaultStyles = {
    fontSize: "text-base font-semibold",
    iconSize: "h-4 w-4",
    padding: "py-2 px-1 sm:py-3 sm:px-2",
    spacing: "mb-2 mt-2 sm:mb-3 sm:mt-4",
  };

  const levelStylesMap: Record<number, typeof defaultStyles> = {
    1: {
      fontSize: "text-xl font-bold",
      iconSize: "h-5 w-5",
      padding: "py-3 px-1 sm:py-4 sm:px-2",
      spacing: "mb-3 mt-4 sm:mb-6 sm:mt-8",
    },
    2: defaultStyles,
    3: {
      fontSize: "text-sm font-medium",
      iconSize: "h-4 w-4",
      padding: "py-1.5 px-1 sm:py-2 sm:px-2",
      spacing: "mb-1 mt-1 sm:mb-2 sm:mt-2",
    },
  };
  
  const levelStyles = levelStylesMap[level] || defaultStyles;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={isOpen ? value : ""}
      onValueChange={(val) => setIsOpen(val === value)}
      className={cn("w-full overflow-hidden", indentClass, levelStyles.spacing, className)}
    >
      <AccordionPrimitive.Item value={value} className="border-none">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            className={cn(
              "flex flex-1 items-center gap-3 text-left transition-all duration-300 ease-out group outline-none rounded-md cursor-pointer",
              "hover:bg-muted/50 focus-visible:bg-muted/50",
              "hover:translate-x-0.5 active:scale-[0.99]",
              "touch-manipulation",
              levelStyles.fontSize,
              levelStyles.padding
            )}
          >
            <ChevronRight
              className={cn(
                levelStyles.iconSize,
                "shrink-0 text-muted-foreground transition-all duration-300 ease-out",
                "group-hover:text-foreground",
                isOpen && "rotate-90 text-foreground"
              )}
            />
            {isOpen ? (
              <FolderOpen 
                className={cn(
                  levelStyles.iconSize,
                  "shrink-0 text-yellow-500 dark:text-yellow-400",
                  "transition-all duration-300 ease-out",
                  "group-hover:scale-110"
                )} 
              />
            ) : (
              <Folder 
                className={cn(
                  levelStyles.iconSize,
                  "shrink-0 text-muted-foreground transition-all duration-300 ease-out",
                  "group-hover:text-yellow-500 dark:group-hover:text-yellow-400",
                  "group-hover:scale-105"
                )} 
              />
            )}
            <span className={cn(
              "flex-1 transition-all duration-300 ease-out wrap-break-word pr-1 sm:pr-2",
              "group-hover:translate-x-0.5"
            )}>
              {title}
            </span>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content 
          className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
        >
          <div className={cn(
            "pt-1 pb-1 sm:pt-2 sm:pb-2 opacity-0 animate-fade-in w-full overflow-x-hidden",
            isOpen && "opacity-100",
            contentPaddingClass
          )}>
            {children}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}
