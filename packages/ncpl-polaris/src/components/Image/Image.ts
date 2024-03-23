import type { PropType, ExtractPropTypes } from "vue";

interface SourceSet {
  source: string;
  descriptor?: string;
}

export const imageProps = {
  source: String,
  sourceSet: Array as PropType<SourceSet[]>,
};

export type ImageProps = ExtractPropTypes<typeof imageProps>;
