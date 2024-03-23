import type { Action, IconSource } from "../../types";

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
  /** Indicates the tone of the toast */
  tone?: 'magic';
  /** Icon prefix for the toast content */
  icon?: IconSource;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
  /** Adds an action next to the message */
  action?: Action;
  /** Callback fired when the toast is clicked or keypressed */
  onClick?(): void;
  isHovered?: boolean;
}

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;
