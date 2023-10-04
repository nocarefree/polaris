<template>
  <Focus :disabled="disableFocus" :root="TrapFocusWrapper">
    <div ref="TrapFocusWrapper">
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



const props = withDefaults(defineProps<TrapFocusProps>(), { trapping: true })

const trapping = toRef(props, 'trapping');

const { canSafelyFocus } = useFocusManager(trapping)
const TrapFocusWrapper = ref();

const disableFocus = computed(() => {
  return canSafelyFocus.value &&
    !(
      TrapFocusWrapper.value &&
      TrapFocusWrapper.value.contains(document.activeElement)
    )
    ? !props.trapping
    : true;
})


const handleTab = (event: KeyboardEvent) => {

  if (event.keyCode != Key.Tab) {
    return;
  }

  if (props.trapping === false || !TrapFocusWrapper.value) {
    return;
  }

  const firstFocusableNode = findFirstKeyboardFocusableNode(
    TrapFocusWrapper.value,
  );
  const lastFocusableNode = findLastKeyboardFocusableNode(
    TrapFocusWrapper.value,
  );

  if (event.target === lastFocusableNode && !event.shiftKey) {
    event.preventDefault();
    focusFirstKeyboardFocusableNode(TrapFocusWrapper.value);
  }

  if (event.target === firstFocusableNode && event.shiftKey) {
    event.preventDefault();
    focusLastKeyboardFocusableNode(TrapFocusWrapper.value);
  }
};

const cleanup = useEventListener(document, 'keydown', handleTab)


onBeforeUnmount(() => cleanup())
</script>
