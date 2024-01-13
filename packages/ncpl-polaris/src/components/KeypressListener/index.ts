import { defineComponent, onBeforeUnmount, onMounted, onUpdated } from "vue";
import type { PropType } from "vue";
import type { Key } from '../types';

type KeyEvent = 'keydown' | 'keyup';

export interface NonMutuallyExclusiveProps {
    keyCode: Key;
    handler(event: KeyboardEvent): void;
    keyEvent?: KeyEvent;
}

export type KeypressListenerProps = NonMutuallyExclusiveProps &
    (
        | { useCapture?: boolean; options?: undefined }
        | { useCapture?: undefined; options?: AddEventListenerOptions }
    );



export default defineComponent({
    props: {
        keyCode: {
            type: Number as PropType<Key>,
            required: true
        },
        keyEvent: {
            type: String as PropType<KeyEvent>,
            default: 'keyup',
        },
        handler: {
            type: Function as PropType<(event: Event) => void>,
            required: true,
        },
        useCapture: Boolean,
        options: Object as PropType<AddEventListenerOptions>,
    },
    setup(props) {

        const handleKeyEvent = (event: KeyboardEvent) => {
            const { handler, keyCode } = props;
            if (event.keyCode === keyCode) {
                handler(event);
            }
        };

        onMounted(() => {
            const { keyEvent, useCapture, options } = props;
            document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
        })

        onUpdated(() => {
            const { keyEvent, useCapture, options } = props;
            document.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
            document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
        })

        onBeforeUnmount(() => {
            const { keyEvent, useCapture, options } = props;
            document.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
        })
    },
    render() {
        return null;
    },
})