"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

type HeaderProps = {
  className?: string;
};

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
  { href: "/thoughts", label: "thoughts" },
  { href: "/social", label: "social media" },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const lastScrollY = useRef(0);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const index = NAVIGATION_ITEMS.findIndex((item) => isActiveLink(item.href));
    const activeIdx = index !== -1 ? index : 0;
    setActiveIndex(activeIdx);

    const activeElement = itemRefs.current[activeIdx];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 10);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${className} isolate transition-transform duration-300 ease-in-out will-change-transform pt-8 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Background with blur */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-8 relative z-10">
        {/* Left side - Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

        {/* Center - Desktop Navigation - Hidden on mobile */}
        <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavigationMenu>
            <NavigationMenuList className="relative bg-background/95 backdrop-blur-md rounded-md px-2 py-1 shadow-lg">
              {/* Sliding background */}
              <div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-white/20 via-white/30 to-white/20 dark:from-white/10 dark:via-white/20 dark:to-white/10 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = isActiveLink(item.href);

                return (
                  <NavigationMenuItem
                    key={item.href}
                    ref={(el) => {
                      if (el) itemRefs.current[index] = el;
                    }}
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`
                          relative overflow-hidden transition-all duration-300 ease-in-out rounded-full px-4 py-2
                          ${
                            isActive
                              ? "text-foreground font-medium"
                              : "text-foreground/60 hover:text-foreground"
                          }
                          ${
                            !isActive
                              ? "[&:hover_.shimmer]:translate-x-[100%]"
                              : ""
                          }
                        `}
                      >
                        {/* Shimmer effect for non-active items on hover */}
                        {!isActive && (
                          <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent translate-x-[-100%] skew-x-12 transition-transform duration-700" />
                        )}

                        <span className="relative z-10 font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Mobile Dropdown - Shown only on mobile */}
        <div className="sm:hidden ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-md bg-background border border-border/50 hover:bg-accent hover:scale-105 transition-all duration-200 active:scale-95 shadow-sm">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-56 bg-background/95 backdrop-blur-lg border-border/50"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = isActiveLink(item.href);
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`w-full cursor-pointer ${
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
