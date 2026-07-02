import { youthAccentClasses } from "@/components/youth/youthAccent";

const toneClasses = {
  green: "text-green-deep",
  blue: youthAccentClasses.text,
  custom: "",
} as const;

export function Eyebrow({
  children,
  className = "",
  tone = "green",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`text-[0.78rem] font-bold uppercase tracking-[0.14em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
