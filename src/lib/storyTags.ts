export const STORY_TAG_OPTIONS = [
  { value: "youth", label: "Youth" },
  { value: "health", label: "Health care" },
  { value: "relief", label: "Relief & rehab" },
  { value: "education", label: "Education" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "texas", label: "Texas" },
] as const;

export type StoryTag = (typeof STORY_TAG_OPTIONS)[number]["value"];

const tagLabels = Object.fromEntries(
  STORY_TAG_OPTIONS.map((tag) => [tag.value, tag.label]),
) as Record<StoryTag, string>;

export function isStoryTag(value: string): value is StoryTag {
  return value in tagLabels;
}

export function formatStoryTag(tags?: string[] | null): string {
  const tag = tags?.[0];
  if (!tag || !isStoryTag(tag)) {
    return "Update";
  }

  return tagLabels[tag];
}

export function getStoryTagLabel(tag: StoryTag): string {
  return tagLabels[tag];
}
