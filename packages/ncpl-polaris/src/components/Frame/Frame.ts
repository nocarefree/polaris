import type { PropType, ExtractPropTypes } from "vue";
import { IconSource, Action } from "../types";

export interface FrameLogo {
  /** Provides a path for a logo used on a dark background */
  topBarSource?: string;
  /** Provides a path for a logo used on a light background */
  contextualSaveBarSource?: string;
  /** Destination the merchant will navigate to when clicking the logo */
  url?: string;
  /** Accessible label the logo image */
  accessibilityLabel?: string;
  /** Number of pixels wide the logo image is */
  width?: number;
}

// export const frameProps = {
//   offset: String,
//   logo: {
//     type: Object as PropType<FrameLogo>,
//   },
//   showMobileNavigation: {
//     type: Boolean,
//     default: false,
//   },
//   skipToContentTarget: {
//     type: Object as PropType<HTMLElement>,
//   },
//   globalRibbon: {
//     type: Boolean,
//     default: false,
//   },
// };

// export type FrameProps = ExtractPropTypes<typeof frameProps>;

export interface FrameProps {
  /** Sets the logo for the TopBar, Navigation, and ContextualSaveBar components */
  logo?: FrameLogo;
  /** A horizontal offset that pushes the frame to the right, leaving empty space on the left */
  offset?: string;
  /** A boolean property indicating whether the mobile navigation is currently visible
   * @default false
   */
  showMobileNavigation?: boolean;
  /** Accepts a ref to the html anchor element you wish to focus when clicking the skip to content link */
  skipToContentTarget?: HTMLAnchorElement;
  /** A callback function to handle clicking the mobile navigation dismiss button */
  onNavigationDismiss?(): void;
  /** A boolean property indicating whether there should be space for a sidebar
   * @default false
   */
  sidebar?: boolean;
}

interface ContextualSaveBarAction {
  /** A destination to link to */
  url?: string;
  /** Content the action displays */
  content?: string;
  /** Should a spinner be displayed */
  loading?: boolean;
  /** Should the action be disabled */
  disabled?: boolean;
  /** Callback when an action takes place */
  onAction?(): void;
}

interface ContextualSaveBarDiscardActionProps {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal?: boolean;
}

type ContextualSaveBarCombinedActionProps =
  ContextualSaveBarDiscardActionProps & ContextualSaveBarAction;



// Toast

interface BaseToastProps {
  /** The content that should appear in the toast message */
  content: string;
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration?: number;
  /** Display an error toast. */
  error?: boolean;
  /** Indicates the tone of the toast */
  tone?: 'magic';
  /** Icon prefix for the toast content */
  icon?: IconSource;
  isHovered?: boolean;
}

interface ClickableToast {
  /** Callback fired when the toast is clicked or keypressed */
  onClick?(): void;
}

interface DismissableToast {
  /** Adds an action next to the message */
  action?: Action;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
}

export type ToastProps = BaseToastProps & ClickableToast & DismissableToast;

export interface ToastID {
  id: string;
}

export type ToastPropsWithID = ToastProps & ToastID;
