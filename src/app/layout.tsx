import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { LiveClock } from "@/components/ui/live-clock";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col relative">
          <Header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] z-[100]" />
          <main className="flex-1 px-4 sm:px-8 pt-32 pb-24 w-full">{children}</main>
          
          {/* Clock positioned at bottom right, with backdrop protection */}
          <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-30" />
          <div className="fixed bottom-8 right-8 z-40">
            <LiveClock />
          </div>
        </div>
      </body>
    </html>
  );
}
