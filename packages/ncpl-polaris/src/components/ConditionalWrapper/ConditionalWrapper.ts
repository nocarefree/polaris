import { defineComponent } from "vue";



export default defineComponent({
    props: {
        condition: {
            type: Boolean,
            required: true,
        }
    },
    setup(props, { slots }) {
        return props.condition ? () => {
            slots.wrapper?.({ children: slots.default })
        } : slots.default
    }
})