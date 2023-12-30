import { defineComponent,inject } from "vue";
import type { FilterInterface } from "./Filters"

export default defineComponent({
    setup(props: FilterInterface, { slots }) {


        const context = inject('filters')
        
        context?.addFilter(props,)


        return () => null
    }
})