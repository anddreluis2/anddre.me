"use client";

import { motion } from "motion/react";
import { createElement, useEffect, useState } from "react";
import type { ReactNode, ReactElement } from "react";

/**
 * Valid HTML elements that can be used for the HoverText component
 */
type HoverTextElement = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";

/**
 * Props for the HoverLetter component
 */
type HoverLetterProps = {
  /** The letter or character to display */
  letter: string;
  /** Whether the current theme is dark mode */
  isDark: boolean;
};

/**
 * Props for the HoverText component
 */
type HoverTextProps = {
  /** The text content to split into hoverable letters */
  text: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** HTML element to render as */
  element?: HoverTextElement;
};

/**
 * Individual letter component with hover animation effects
 * Optimized for performance with transform and opacity animations
 */
const HoverLetter = ({ letter, isDark }: HoverLetterProps): ReactElement => {
  // Performance-optimized animation configuration
  const hoverAnimation = {
    scale: 1.8,
    color: isDark ? "#ffffff" : "#4b3621",
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.1,
    },
  };

  return (
    <motion.span
      className="inline-block relative"
      whileHover={hoverAnimation}
      style={{ display: "inline-block" }}
    >
      {letter === " " ? <span>&nbsp;</span> : letter}
    </motion.span>
  );
};

/**
 * Text component that splits text into individual hoverable letters
 * Supports theme detection and maintains word grouping for better readability
 *
 * @example
 * <HoverText
 *   text="Hello World"
 *   element="h1"
 *   className="text-4xl font-bold"
 * />
 */
export function HoverText({
  text,
  className = "",
  element = "p",
}: HoverTextProps): ReactElement {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTheme = (): void => {
      const isDarkMode = !document.documentElement.classList.contains("light");
      setIsDark(isDarkMode);
    };

    // Initial theme check
    updateTheme();

    // Create mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Process text by words to maintain word grouping
  const content: ReactNode[] = [];
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    // Create letters for each word
    const wordLetters = word
      .split("")
      .map((letter, letterIndex) => (
        <HoverLetter
          key={`${wordIndex}-${letterIndex}`}
          letter={letter}
          isDark={isDark}
        />
      ));

    // Group letters into word spans to prevent word breaking
    content.push(
      <span
        key={`word-${wordIndex}`}
        style={{
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
      >
        {wordLetters}
      </span>
    );

    // Add space between words (except after last word)
    if (wordIndex < words.length - 1) {
      content.push(
        <span key={`space-${wordIndex}`} style={{ display: "inline" }}>
          &nbsp;
        </span>
      );
    }
  });

  return createElement(
    element,
    {
      className: className,
      style: {
        overflowWrap: "normal",
        wordBreak: "keep-all",
        hyphens: "none",
      },
    },
    content
  );
}
