import { definePropType } from "./props";
import type { IconSource } from "@ncpl-polaris/components/types";

export const iconSourceType = definePropType<IconSource>([
  String,
  Object,
  Function,
]);
