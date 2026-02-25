import { useEffect, useRef, useState } from "react";

/**
 * Tracks element visibility via IntersectionObserver.
 * Once visible, stays visible (one-shot) to avoid re-mounting images.
 */
export function useInView(rootMargin = "200px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, inView]);

  return { ref, inView };
}
