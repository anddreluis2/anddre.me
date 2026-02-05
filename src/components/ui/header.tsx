"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

type HeaderProps = {
  className?: string;
};

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/essays", label: "Essays" },
  { href: "/social", label: "Social Media" },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const index = NAVIGATION_ITEMS.findIndex((item) => isActiveLink(item.href));
    setActiveIndex(index !== -1 ? index : 0);
  }, [pathname]);

  // Aproximação do tamanho de cada tab baseado no texto
  const getTabWidth = (index: number) => {
    const lengths = [70, 80, 95, 85, 80, 120]; // Home, About, Projects, Gallery, Essays, Social Media
    return lengths[index] || 90;
  };

  const getTabPosition = (index: number) => {
    let position = 8; // padding inicial
    for (let i = 0; i < index; i++) {
      position += getTabWidth(i) - 4; // largura com overlap menor
    }
    return position;
  };

  return (
    <header className={className}>
      <div className="container mx-auto flex justify-center py-4 relative">
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden sm:block">
          <NavigationMenu>
            <NavigationMenuList className="relative bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
              {/* Sliding background - updated for better light mode visibility */}
              <div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-white/20 via-white/30 to-white/20 dark:from-white/10 dark:via-white/20 dark:to-white/10 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  left: getTabPosition(activeIndex),
                  width: getTabWidth(activeIndex),
                }}
              />

              {NAVIGATION_ITEMS.map((item) => {
                const isActive = isActiveLink(item.href);

                return (
                  <NavigationMenuItem key={item.href}>
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
                        {/* Shimmer effect for non-active items on hover - updated for light mode */}
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

        {/* Mobile Dropdown - Shown only on mobile */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-md bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 hover:scale-105 transition-all duration-200 active:scale-95">
              <Menu className="h-4 w-4 transition-transform duration-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-48 mt-2 z-[100] animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[side=bottom]:slide-in-from-top-2"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = isActiveLink(item.href);
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
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
