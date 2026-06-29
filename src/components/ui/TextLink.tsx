import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function TextLink({
  href,
  children,
  className = "",
  light = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 font-semibold ${
        light ? "text-white" : "text-green-deep"
      } ${className}`}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
