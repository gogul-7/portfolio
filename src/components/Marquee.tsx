import { marqueeItems } from "@/lib/data";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <ul
        className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse", animationDuration: "50s" } : undefined}
      >
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground/25 transition-colors duration-300 hover:text-primary sm:text-5xl">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-primary/50" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Technologies" className="relative space-y-6 py-16">
      <Row />
      <Row reverse />
    </section>
  );
}
