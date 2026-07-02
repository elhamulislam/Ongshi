import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-[1.05rem] leading-[1.68] text-ink first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-tight text-ink first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 font-display text-[1.35rem] font-semibold leading-tight text-ink first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-green pl-5 text-[1.05rem] italic leading-[1.68] text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.05rem] text-ink">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[1.05rem] text-ink">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.68]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.68]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-semibold text-green-deep underline-offset-2 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    imageWithAlt: ({ value }) => {
      const imageUrl = value?.asset ? urlFor(value)?.width(880).url() : null;
      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[14px]">
            <Image
              src={imageUrl}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 720px"
            />
          </div>
        </figure>
      );
    },
  },
};

export function PortableTextContent({
  value,
  className = "",
}: {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
}) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
