"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Wrap } from "@/components/ui/Wrap";

const navLinks = [
  { href: "/our-work", label: "Our Work" },
  { href: "/ongshi-youth", label: "Ongshi Youth" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/gallery", label: "Gallery" },
];

export function Header({ donateUrl }: { donateUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/88 backdrop-blur-[10px]">
      <Wrap>
        <div className="flex h-[78px] items-center justify-between gap-4">
          <Link href="/" aria-label="Ongshi home">
            <Image
              src="/images/logo.png"
              alt="Ongshi — partner in hope"
              width={160}
              height={46}
              className="h-[46px] w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.98rem] font-medium text-ink transition-colors hover:text-green-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button href={donateUrl} className="hidden sm:inline-flex">
              Donate
            </Button>
            <button
              type="button"
              className="inline-flex text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </Wrap>

      {open ? (
        <nav
          className="border-t border-line bg-paper px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-lg font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button href={donateUrl} className="w-full justify-center">
                Donate
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
