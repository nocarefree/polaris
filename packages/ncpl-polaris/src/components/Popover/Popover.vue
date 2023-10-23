<template>
  <component :is="activatorWrapper || 'div'" ref="activatorContainer">
    <slot name="activator"></slot>
    <Portal v-if="activatorNode" id-prefix="popover">
      <PopoverOverlay ref="overlayRef" :id="id" :activator="activatorNode" :prefer-input-activator="preferInputActivator"
        @close="handleClose" :active="active" @update:active="e => $emit('update:active', e)" :fixed="fixed"
        :z-index-override="zIndexOverride" :autofocus-target="autofocusTarget" v-bind="overlayProps">
        <slot></slot>
      </PopoverOverlay>
    </Portal>
  </component>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PopoverProps } from './Popover'
import Portal from "@ncpl-polaris/components/Portal/Portal.vue";
import PopoverOverlay from "./PopoverOverlay/PopoverOverlay.vue";
import { PopoverCloseSource } from "./PopoverOverlay/PopoverOverlay"
import { useId } from "../context";
import { portal } from "../shared";
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from "@ncpl-polaris/utils/focus"


defineOptions({
  name: 'NpPopover'
})
const props = defineProps<PopoverProps>()
const emit = defineEmits(['close', 'update:active']);

const id = useId();
const overlayRef = ref();
const activatorContainer = ref<HTMLElement>();

const activatorNode = computed(() => {
  return activatorContainer.value?.firstElementChild as HTMLElement;
})

const overlayProps = computed(() => {
  const {
    activatorWrapper,
    preventFocusOnClose,
    active,
    fixed,
    preferInputActivator = true,
    zIndexOverride,
    ...rest
  } = props;
  return rest;
})

const handleClose = (source: PopoverCloseSource) => {
  emit('close', source);
  if (activatorContainer.value == null || props.preventFocusOnClose) {
    return;
  }

  if (source === PopoverCloseSource.FocusOut && activatorNode) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activatorNode.value) ||
      findFirstFocusableNodeIncludingDisabled(activatorContainer.value) ||
      activatorContainer.value;
    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  } else if (
    source === PopoverCloseSource.EscapeKeypress &&
    activatorNode
  ) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activatorNode.value) ||
      findFirstFocusableNodeIncludingDisabled(activatorContainer.value) ||
      activatorContainer.value;

    if (focusableActivator) {
      focusableActivator.focus();
    } else {
      focusNextFocusableNode(focusableActivator, isInPortal);
    }
  }
};

function isInPortal(element: Element) {
  let parentElement = element.parentElement;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) return false;
    parentElement = parentElement.parentElement;
  }

  return true;
}
</script>
