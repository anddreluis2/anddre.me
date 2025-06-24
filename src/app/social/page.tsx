import { HoverText } from "@/components/ui/hover-text";

export default function Social() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HoverText text="Social Media" element="h1" className="font-bold" />
        <HoverText
          text="Connect with me on various platforms"
          element="p"
          className="text-muted-foreground"
        />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Social links coming soon...
        </p>
      </footer>
    </div>
  );
}
