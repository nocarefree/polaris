type Element =
  | "dt"
  | "dd"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "legend";

type Variant =
  | "headingXs"
  | "headingSm"
  | "headingMd"
  | "headingLg"
  | "headingXl"
  | "heading2xl"
  | "heading3xl"
  | "heading4xl"
  | "bodySm"
  | "bodyMd"
  | "bodyLg";

type Alignment = "start" | "center" | "end" | "justify";

type FontWeight = "regular" | "medium" | "semibold" | "bold";

type Color = "success" | "critical" | "warning" | "subdued" | "text-inverse";


export type TextProps = {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment,
  /** The element type */
  as?: Element,
  /** Prevent text from overflowing */
  breakWord?: boolean,
  /** Adjust color of text */
  color?: Color,
  /** Adjust weight of text */
  fontWeight?: FontWeight,
  /** Use a numeric font variant with monospace appearance */
  numeric?: boolean,
  /** Truncate text overflow with ellipsis */
  truncate?: boolean,
  /** Typographic style of text */
  variant?: Variant,
  /** Visually hide the text */
  visuallyHidden?: boolean,
};
