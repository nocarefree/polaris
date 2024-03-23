import { defineComponent, onBeforeUnmount, onMounted, onUpdated } from "vue";
import type { PropType } from 'vue';


export default defineComponent({
    props: {
        event: {
            type: String,
            required: true
        },
        handler: {
            type: Function as PropType<(event: Event) => void>,
            required: true,
        },
        capture: Boolean,
        passive: Boolean,
    },
    setup(props) {
        onMounted(() => {
            const { event, handler, capture, passive } = props;
            window.addEventListener(event, handler, { capture, passive });
        })

        onUpdated(() => {
            const { event, handler, capture, passive } = props;
            window.removeEventListener(event, handler, capture);
            window.addEventListener(event, handler, { capture, passive });
        })

        onBeforeUnmount(() => {
            const { event, handler, capture } = props;
            window.removeEventListener(event, handler, capture);
        })
    },
    render() {
        return null;
    },
})