/**
 * Renders a headline with optional *emphasized* words (shown in italic green-deep).
 */
export function HeroHeadline({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <h1 className="mt-4 font-display text-[clamp(2.5rem,5.2vw,4rem)] font-semibold leading-[1.08] tracking-tight text-ink">
      {parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em
              key={index}
              className="font-semibold not-italic text-green-deep [font-style:italic]"
            >
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </h1>
  );
}
