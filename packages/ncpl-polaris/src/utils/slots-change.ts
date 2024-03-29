import { useSlots, onBeforeUpdate, type Ref } from "vue";


export function slotsChange(slots: { [key: string]: Ref<Boolean | undefined> }) {

    const _slots = useSlots();

    for (let name in slots) {
        slots[name].value = Boolean(_slots[name]);
    }

    onBeforeUpdate(() => {
        for (let name in slots) {
            if (slots[name].value != Boolean(_slots[name])) {
                slots[name].value = Boolean(_slots[name]);
            }
        }
    })
}
