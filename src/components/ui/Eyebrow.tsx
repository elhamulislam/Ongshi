export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[0.78rem] font-bold uppercase tracking-[0.14em] text-green-deep ${className}`}
    >
      {children}
    </span>
  );
}
