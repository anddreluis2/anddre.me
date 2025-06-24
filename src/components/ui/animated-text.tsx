"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  element?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number; // delay in ms per letter
  startDelay?: number; // initial delay before animation starts
}

export function AnimatedText({
  text,
  element = "span",
  className,
  delay = 15,
  startDelay = 0,
}: AnimatedTextProps) {
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

  return (
    <Component className={cn(className)}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-opacity duration-200",
            index < visibleLetters ? "opacity-100" : "opacity-0"
          )}
          style={{
            transitionDelay: `${index * 10}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Component>
  );
}
