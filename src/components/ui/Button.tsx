import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  red: "bg-red text-white border-red hover:bg-red-deep hover:border-red-deep hover:-translate-y-px",
  blue: "bg-[#2A39C0] text-white border-[#2A39C0] hover:bg-[#232fa8] hover:border-[#232fa8] hover:-translate-y-px",
  ghost:
    "bg-transparent text-green-deep border-green hover:bg-green-tint",
  light: "bg-white text-ink border-white hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
} as const;

export function Button({
  href,
  children,
  variant = "red",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = `inline-flex items-center gap-2 rounded-full border-2 px-6 py-3.5 text-base font-semibold transition duration-150 ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
