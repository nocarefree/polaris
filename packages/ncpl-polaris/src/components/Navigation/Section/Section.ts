import type { IconSource } from "../../types"
import type { TooltipProps } from "../../Tooltip";
import type { ItemProps } from "../types";



export type NavigationSectionProps = {
  items: ItemProps[];
  icon?: IconSource;
  title?: string;
  fill?: boolean;
  rollup?: {
    after: number;
    view: string;
    hide: string;
    activePath: string;
  };
  action?: {
    icon: IconSource;
    accessibilityLabel: string;
    onClick(): void;
    tooltip?: TooltipProps;
  };
  separator?: boolean;
}

