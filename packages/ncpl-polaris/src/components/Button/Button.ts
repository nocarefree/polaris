import { IconSource } from "../types"

const DEFAULT_SIZE = "medium";

export type ButtonProps = {
  url?: string,
  icon?: IconSource,
  loading?: boolean,
  disabled?: boolean,
  external?: boolean,
  primary?: boolean,
  destructive?: boolean,
  removeUnderline?: boolean,
  outline?: boolean,
  plain?: boolean,
  pressed?: boolean,
  connectedDisclosure?: boolean,
  fullWidth?: boolean,
  monochrome?: boolean,
  primarySuccess?: boolean,
  disclosure?: boolean | "up" | "down" | "select",
  size?: "micro" | "slim" | "medium" | "large",
  textAlign?: "left" | "right" | "center" | "start" | "end",
};
