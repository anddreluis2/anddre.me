"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QAItemProps {
  question: string;
  children: React.ReactNode;
  className?: string;
}

export function QAItem({ question, children, className }: QAItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={cn("w-full mb-3 sm:mb-4 mx-auto sm:mx-0", className)}>
      <button
        onClick={toggleOpen}
        className={cn(
          "flex items-start gap-2 sm:gap-3 w-full text-left transition-all duration-300 ease-out group outline-none rounded-md cursor-pointer",
          "hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "py-2 px-1 sm:py-2.5 sm:px-2",
          "touch-manipulation"
        )}
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 ease-out mt-0.5",
            "group-hover:text-foreground",
            isOpen && "rotate-90 text-foreground"
          )}
        />
        <span className="flex-1 font-semibold text-sm sm:text-base wrap-break-word group-hover:translate-x-0.5 transition-transform duration-300">
          {question}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1], // ease-out
            }}
            className="overflow-hidden"
          >
            <div className="pl-6 sm:pl-10 pr-2 sm:pr-3 pt-2 pb-2 text-sm sm:text-base text-muted-foreground">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
