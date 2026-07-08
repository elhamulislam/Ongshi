export const DEFAULT_IMAGE_ALT = "Ongshi field photo";

export function resolveImageAlt(
  alt?: string | null,
  caption?: string | null,
): string {
  const trimmedAlt = alt?.trim();
  if (trimmedAlt) {
    return trimmedAlt;
  }

  const trimmedCaption = caption?.trim();
  if (trimmedCaption) {
    return trimmedCaption;
  }

  return DEFAULT_IMAGE_ALT;
}
