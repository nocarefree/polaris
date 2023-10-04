import type { IconSource } from "../types";
import type { IconProps } from "../Icon"

export type BannerStatus = "success" | "info" | "warning" | "critical";


export type BannerProps = {
  icon?: IconSource;
  title?: string,
  status?: BannerStatus,
  stopAnnouncements?:boolean;
  hideIcon?:boolean;
}

export interface BannerAttributes {
  iconColor: IconProps["color"];
  defaultIcon: IconProps["source"];
  ariaRoleType: "status" | "alert";
}
