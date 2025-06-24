"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./navigation-menu";

type HeaderProps = {
  className?: string;
};

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/essays", label: "Essays" },
  { href: "/social", label: "Social Media" },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = NAVIGATION_ITEMS.findIndex((item) => item.href === pathname);
    setActiveIndex(index !== -1 ? index : 0);
  }, [pathname]);

  // Aproximação do tamanho de cada tab baseado no texto
  const getTabWidth = (index: number) => {
    const lengths = [70, 80, 95, 80, 120]; // Home, About, Projects, Essays, Social Media
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
      <div className="container mx-auto flex justify-center py-4">
        <NavigationMenu>
          <NavigationMenuList className="relative bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
            {/* Sliding background */}
            <div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full transition-all duration-500 ease-in-out"
              style={{
                left: getTabPosition(activeIndex),
                width: getTabWidth(activeIndex),
              }}
            />

            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href}>
                    <NavigationMenuLink
                      className={`
                        relative overflow-hidden transition-all duration-300 ease-in-out rounded-full px-4 py-2
                        ${
                          isActive
                            ? "text-white"
                            : "text-muted-foreground hover:text-foreground"
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
                        <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] skew-x-12 transition-transform duration-700" />
                      )}

                      <span className="relative z-10 font-medium">
                        {item.label}
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
