import { ref, computed, watch } from "vue"
import { useEventListener, unrefElement } from "@vueuse/core"
import type { MaybeElementRef, UseFocusOptions } from "@vueuse/core"
import { findFirstFocusableNode } from "./focus"

export function useFocus(target: MaybeElementRef, options: UseFocusOptions = {}) {
    const { initialValue = false, focusVisible = false } = options

    const innerFocused = ref(false)
    const targetElement = computed(() => {
        const node = unrefElement(target);
        return node ? findFirstFocusableNode(node as HTMLElement)
            : null;
    })

    useEventListener(targetElement, 'focus', (event) => {
        if (!focusVisible || (event.target as HTMLElement).matches?.(':focus-visible'))
            innerFocused.value = true
    })
    useEventListener(targetElement, 'blur', () => innerFocused.value = false)

    const focused = computed({
        get: () => innerFocused.value,
        set(value: boolean) {
            if (!value && innerFocused.value)
                targetElement.value?.blur()
            else if (value && !innerFocused.value)
                targetElement.value?.focus()
        },
    })

    watch(
        targetElement,
        () => {
            focused.value = initialValue
        },
        { immediate: true, flush: 'post' },
    )

    return { focused }
}