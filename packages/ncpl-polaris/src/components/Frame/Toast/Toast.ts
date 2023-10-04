import { ExtractPropTypes } from "vue";
import { definePropType } from "@ncpl-polaris/utils";
import type { Action } from "@ncpl-polaris/components/types";

export const toastProps = {
  content: {
    type: String,
    required: true,
  },
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration: {
    type: Number,
    default: 5000,
  },
  /** Display an error toast. */
  error: Boolean,
  action: definePropType<Action>(Function),
};

export type ToastProps = ExtractPropTypes<typeof toastProps>;

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;
