import type { PropType, ExtractPropTypes } from "vue";

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

export const frameProps = {
  offset: String,
  logo: {
    type: Object as PropType<FrameLogo>,
  },
  showMobileNavigation: {
    type: Boolean,
    default: false,
  },
  skipToContentTarget: {
    type: Object as PropType<HTMLElement>,
  },
  globalRibbon: {
    type: Boolean,
    default: false,
  },
};

export type FrameProps = ExtractPropTypes<typeof frameProps>;

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

import type { Action } from '../types';

export interface ToastProps {
  /** The content that should appear in the toast message */
  content: string;
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration?: number;
  /** Display an error toast. */
  error?: boolean;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
  /** Adds an action next to the message */
  action?: Action;
}

export interface ToastID {
  id: string;
}

export type ToastPropsWithID = ToastProps & ToastID;
