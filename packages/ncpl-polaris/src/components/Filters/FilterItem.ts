import { defineComponent, getCurrentInstance, computed } from "vue";
import type { FilterInterface } from "./Filters"

export default defineComponent({
    setup(props: FilterInterface, { slots }) {

        const instance = getCurrentInstance() as TableColumn<DefaultRow>
        const owner = computed(() => {
          let parent = instance.parent as any
          while (parent && !parent.tableId) {
            parent = parent.parent
          }
          return parent
        })
    


        const context = inject('filters', {
            addFilter: (e: any) => { }
        })

        context?.addFilter({ props, slots })


        return () => null
    },
    render(){
        return null;
    }
})