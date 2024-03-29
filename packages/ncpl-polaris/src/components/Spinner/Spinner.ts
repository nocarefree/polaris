type Size = "small" | "large";

// export const spinnerProps = {
//   size: String as PropType<Size>,
//   accessibilityLabel: String,
//   hasFocusableParent: Boolean,
// };

// export type SpinnerProps = ExtractPropTypes<typeof spinnerProps>;

export interface SpinnerProps {
  size?:Size;
  accessibilityLabel?: String;
  hasFocusableParent?: Boolean;
}
