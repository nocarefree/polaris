import type { IconProps } from "../Icon"
import type { Action, DisableableAction, LoadableAction } from '../types';


export type BannerTone = 'success' | 'info' | 'warning' | 'critical';


export type BannerProps = {
  /** Title content for the banner. */
  title?: string;
  /** Status icon to display in the banner. Use only major icons */
  icon?: IconProps['source'];
  /** Renders the banner without a status icon. */
  hideIcon?: boolean;
  /** Sets the status of the banner. */
  tone?: BannerTone;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Callback when banner is dismissed */
  dismissable?: boolean;
  /** Disables screen reader announcements when changing the content of the banner */
  stopAnnouncements?: boolean;
}

