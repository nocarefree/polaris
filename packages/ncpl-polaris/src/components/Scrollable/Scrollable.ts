import type { PropType, ExtractPropTypes } from "vue";

export const scrollableProps = {
  vertical: { type: Boolean, default: true },
  horizontal: { type: Boolean, default: true },
  focusable: Boolean,
  hint: Boolean,
  shadow: Boolean,
};

export type ScrollableProps = ExtractPropTypes<typeof scrollableProps>;
