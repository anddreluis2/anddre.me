"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/essays", label: "Essays" },
  { href: "/social", label: "Social Media" },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={className}>
      <div className="container mx-auto flex justify-center py-4">
        <NavigationMenu>
          <NavigationMenuList className="bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`
                        relative overflow-hidden transition-all duration-300 ease-out rounded-full px-4 py-2
                        ${
                          isActive
                            ? "bg-black text-white"
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
