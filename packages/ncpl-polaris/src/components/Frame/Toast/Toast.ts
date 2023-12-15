import type { Action } from "@ncpl-polaris/components/types";


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

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;
