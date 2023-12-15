import { defineComponent, onBeforeUnmount, onMounted, onUpdated } from "vue";



interface EventListenerProps {
    event: string;
    capture?: boolean;
    handler(event: Event): void;
    passive?: boolean;
}


export default defineComponent({
    setup(props: EventListenerProps) {
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

        return () => null;
    }
})