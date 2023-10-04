import { IconSource } from "../types"

type Color =
  | "base"
  | "subdued"
  | "critical"
  | "interactive"
  | "warning"
  | "highlight"
  | "success"
  | "primary"
  | "magic";


export type IconProps = {
  source: IconSource,
  color?: Color,
  backdrop?: boolean,
  accessibilityLabel?: string
};