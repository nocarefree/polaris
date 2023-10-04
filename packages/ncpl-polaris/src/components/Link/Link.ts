import type { ExtractPropTypes } from "vue";

export const linkProps = {
  monochrome: Boolean,
  removeUnderline: Boolean,
  url: String,
};

export type LinkProps = ExtractPropTypes<typeof linkProps>;
