"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedHoverTextProps {
  text: string;
  element?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number; // delay in ms per letter
  startDelay?: number; // initial delay before animation starts
}

export function AnimatedHoverText({
  text,
  element = "span",
  className,
  delay = 15,
  startDelay = 0,
}: AnimatedHoverTextProps) {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (visibleLetters < text.length) {
          setVisibleLetters((prev) => prev + 1);
        }
      },
      visibleLetters === 0 ? startDelay : delay
    );

    return () => clearTimeout(timer);
  }, [visibleLetters, text.length, delay, startDelay]);

  const Component = element;

  const hoverAnimation = {
    scale: 1.8,
    color: "#ffffff",
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.1,
    },
  };

  // Process text by words to maintain word grouping
  const words = text.split(" ");
  let letterIndex = 0;

  const content = words.map((word, wordIndex) => {
    const wordLetters = word.split("").map((letter, letterIndexInWord) => {
      const currentLetterIndex = letterIndex++;
      const isVisible = currentLetterIndex < visibleLetters;

      return (
        <motion.span
          key={`${wordIndex}-${letterIndexInWord}`}
          className={cn(
            "inline-block transition-opacity duration-200",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            transitionDelay: `${currentLetterIndex * 10}ms`,
            display: "inline-block",
          }}
          whileHover={isVisible ? hoverAnimation : undefined}
        >
          {letter}
        </motion.span>
      );
    });

    // Add space after word (except last word)
    if (wordIndex < words.length - 1) {
      const spaceIndex = letterIndex++;
      const isSpaceVisible = spaceIndex < visibleLetters;

      return (
        <span key={`word-${wordIndex}`} style={{ display: "inline" }}>
          <span style={{ whiteSpace: "nowrap", display: "inline-block" }}>
            {wordLetters}
          </span>
          <span
            className={cn(
              "transition-opacity duration-200",
              isSpaceVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
              transitionDelay: `${spaceIndex * 10}ms`,
            }}
          >
            &nbsp;
          </span>
        </span>
      );
    }

    return (
      <span
        key={`word-${wordIndex}`}
        style={{ whiteSpace: "nowrap", display: "inline-block" }}
      >
        {wordLetters}
      </span>
    );
  });

  return (
    <Component
      className={cn(className)}
      style={{
        overflowWrap: "normal",
        wordBreak: "keep-all",
        hyphens: "none",
      }}
    >
      {content}
    </Component>
  );
}
