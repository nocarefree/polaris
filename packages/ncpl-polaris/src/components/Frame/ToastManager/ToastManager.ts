import type { ExtractPropTypes, PropType } from "vue";
import type { ToastProps } from "../Toast/Toast";

export interface ToastID {
  id: string;
}

export type ToastMessage = ToastProps & ToastID;

export const toastMessagesProps = {
  toastMessages: {
    type: Array as PropType<ToastMessage[]>,
    required: true,
  },
};

export type ToastMessagesProps = ExtractPropTypes<typeof toastMessagesProps>;
