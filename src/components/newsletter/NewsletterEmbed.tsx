type ParsedNewsletterEmbed = {
  src: string;
  title: string;
};

function parseNewsletterEmbed(html: string): ParsedNewsletterEmbed | null {
  const trimmed = html.trim();
  if (!trimmed) {
    return null;
  }

  const srcMatch = trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!srcMatch?.[1]) {
    return null;
  }

  const titleMatch = trimmed.match(/\btitle\s*=\s*["']([^"']*)["']/i);

  return {
    src: srcMatch[1],
    title: titleMatch?.[1] || "Newsletter signup",
  };
}

export function NewsletterEmbed({ html }: { html: string }) {
  const parsed = parseNewsletterEmbed(html);

  if (!parsed) {
    return null;
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)]">
      <div className="relative h-[14rem] w-full overflow-hidden sm:h-[15rem]">
        <iframe
          src={parsed.src}
          title={parsed.title}
          className="absolute left-0 top-0 h-[18rem] w-full border-0 bg-transparent sm:h-[19rem]"
          allow="payment"
          scrolling="no"
        />
      </div>
    </div>
  );
}
