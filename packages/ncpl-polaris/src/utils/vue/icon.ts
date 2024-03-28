import { definePropType } from "./props";
import type { IconSource } from "../../components/types";

export const iconSourceType = definePropType<IconSource>([
  String,
  Object,
  Function,
]);
