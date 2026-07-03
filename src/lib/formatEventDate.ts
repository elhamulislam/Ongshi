export function formatEventDate(startDate: string, endDate?: string | null): string {
  const start = new Date(`${startDate}T12:00:00`);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  if (!endDate || endDate === startDate) {
    return start.toLocaleDateString("en-US", dateOptions);
  }

  const end = new Date(`${endDate}T12:00:00`);
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", { month: "long", day: "numeric" })}–${end.getDate()}, ${end.getFullYear()}`;
  }

  if (sameYear) {
    return `${start.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${end.toLocaleDateString("en-US", dateOptions)}`;
  }

  return `${start.toLocaleDateString("en-US", dateOptions)} – ${end.toLocaleDateString("en-US", dateOptions)}`;
}
