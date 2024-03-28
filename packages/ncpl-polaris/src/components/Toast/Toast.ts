import { defineComponent, onMounted, onBeforeUnmount, type PropType } from "vue"

import type { Action } from "../types";
import { useId, useFrame } from "../context"


export default defineComponent({
    name: 'NpToast',
    props: {
        content: { type: String, required: true },
        duration: { type: Number, default: 5000 },
        error: { type: Boolean },
        onDismiss: { type: Function as PropType<() => void>, required: true },
        action: { type: Function as PropType<Action> },
    },
    setup(props) {
        const id = useId();
        const { showToast, hideToast } = useFrame();

        onMounted(() => {
            showToast({ id: id.value, ...props });
        });

        onBeforeUnmount(() => {
            hideToast({ id: id.value });
        });
    },
    render() {
        return null;
    },
});