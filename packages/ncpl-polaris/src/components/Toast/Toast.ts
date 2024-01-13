import { defineComponent, onMounted, onUnmounted } from "vue"

import type { ToastProps } from "../Frame/Toast/Toast";
import { useId, useFrame } from "../context"


export default defineComponent({
    name: 'NpToast',
    setup() {

        const props = defineProps<ToastProps>();
        const id = useId();
        const { showToast, hideToast } = useFrame();

        onMounted(() => {
            showToast({ id: id.value, ...props });
        });

        onUnmounted(() => {
            hideToast({ id: id.value });
        });
    },
    render() {
        return null;
    },
});