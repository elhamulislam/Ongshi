export function formatStoryDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
