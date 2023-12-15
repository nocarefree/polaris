import { defineComponent, onMounted, onUnmounted } from "vue"

import type { ToastProps } from "../Frame/Toast/Toast";
import { useId, useFrame } from "../context"


export default defineComponent({
    name: 'NpToast',
    setup(props: ToastProps) {

        const id = useId();
        const { showToast, hideToast } = useFrame();

        onMounted(() => {
            showToast({ id: id.value, ...props });
        });

        onUnmounted(() => {
            hideToast({ id: id.value });
        });

        return null;
    },
});