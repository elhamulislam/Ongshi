import type { PortableTextBlock } from "@portabletext/types";

let keyCounter = 0;

function nextKey() {
  keyCounter += 1;
  return `fallback-${keyCounter}`;
}

export function textBlock(text: string, style: PortableTextBlock["style"] = "normal"): PortableTextBlock {
  const blockKey = nextKey();
  return {
    _type: "block",
    _key: blockKey,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${blockKey}-span`, text, marks: [] }],
  };
}

export function headingBlock(text: string): PortableTextBlock {
  return textBlock(text, "h2");
}
