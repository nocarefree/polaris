import type { ExtractPropTypes, PropType } from "vue";
import type { ToastProps } from "../Toast/Toast";

export type ToastMessage = ToastProps & { id: string };

export const toastMessagesProps = {
  toastMessages: {
    type: Array as PropType<ToastMessage[]>,
    required: true,
  },
};

export type ToastMessagesProps = ExtractPropTypes<typeof toastMessagesProps>;
