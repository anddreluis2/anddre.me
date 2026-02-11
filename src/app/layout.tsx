import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { LiveClock } from "@/components/ui/live-clock";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "André Luis Andrade",
  description: "Frontend Engineering / Design Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50" />
        <main className="pt-24 sm:pt-28">{children}</main>
        <footer className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4 z-50">
          <LiveClock />
          <ThemeToggle />
        </footer>
      </body>
    </html>
  );
}
