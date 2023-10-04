type Spacing =
  | "extraTight"
  | "tight"
  | "baseTight"
  | "loose"
  | "extraLoose"
  | "none";

type Alignment = "leading" | "trailing" | "center" | "fill" | "baseline";

type Distribution =
  | "equalSpacing"
  | "leading"
  | "trailing"
  | "center"
  | "fill"
  | "fillEvenly";

export interface LegacyStackProps {
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
  /** Adjust horizontal alignment of elements */
  distribution?: Distribution;
}