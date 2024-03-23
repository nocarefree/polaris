import type { ExtractPropTypes, PropType } from "vue";

type Size = "small" | "large";

export const spinnerProps = {
  size: String as PropType<Size>,
  accessibilityLabel: String,
  hasFocusableParent: Boolean,
};

export type SpinnerProps = ExtractPropTypes<typeof spinnerProps>;
