"use client";

import { useEffect, useRef } from "react";

import { statusMessageClass } from "./formStyles";

export function FormSuccess({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      className={statusMessageClass}
      role="status"
      tabIndex={-1}
    >
      <h3 className="font-display text-[1.45rem] font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-[1.05rem] leading-[1.65] text-muted">{message}</p>
    </div>
  );
}
