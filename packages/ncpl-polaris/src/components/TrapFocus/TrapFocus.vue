<template>
  <Focus :disabled="disableFocus" :root="trapFocusWrapper">
    <div ref="trapFocusWrapper">
      <slot></slot>
    </div>
  </Focus>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, toRef, computed } from "vue";
import type { TrapFocusProps } from "./TrapFocus"
import Focus from "@ncpl-polaris/components/Focus"
import { useFocusManager } from '../context';
import { useEventListener } from "@vueuse/core";
import { findFirstKeyboardFocusableNode, findLastKeyboardFocusableNode, focusFirstKeyboardFocusableNode, focusLastKeyboardFocusableNode } from "@ncpl-polaris/utils/focus"
import { Key } from "../types";


defineOptions({
  name: 'NpTrapFocus'
})

const props = withDefaults(defineProps<TrapFocusProps>(), { trapping: true })

const trapping = toRef(props, 'trapping');

const { canSafelyFocus } = useFocusManager(trapping)
const trapFocusWrapper = ref();

const disableFocus = computed(() => {
  return canSafelyFocus.value &&
    !(
      trapFocusWrapper.value &&
      trapFocusWrapper.value.contains(document.activeElement)
    )
    ? !props.trapping
    : true;
})


const handleTab = (event: KeyboardEvent) => {

  if (event.keyCode != Key.Tab) {
    return;
  }

  if (props.trapping === false || !trapFocusWrapper.value) {
    return;
  }

  const firstFocusableNode = findFirstKeyboardFocusableNode(
    trapFocusWrapper.value,
  );
  const lastFocusableNode = findLastKeyboardFocusableNode(
    trapFocusWrapper.value,
  );

  if (event.target === lastFocusableNode && !event.shiftKey) {
    event.preventDefault();
    focusFirstKeyboardFocusableNode(trapFocusWrapper.value);
  }

  if (event.target === firstFocusableNode && event.shiftKey) {
    event.preventDefault();
    focusLastKeyboardFocusableNode(trapFocusWrapper.value);
  }
};

useEventListener(document, 'keydown', handleTab)
</script>
