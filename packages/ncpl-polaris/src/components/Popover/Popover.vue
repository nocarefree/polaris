<template>
  <component :is="activatorWrapper || 'div'" ref="activatorContainer">
    <slot name="activator"></slot>
    <Portal v-if="activatorNode" id-prefix="popover">
      <PopoverOverlay ref="overlayRef" :id="id" :activator="activatorNode"
        :prefer-input-activator="preferInputActivator" @close="handleClose" :active="active"
        @update:active="e => $emit('update:active', e)" :fixed="fixed" :z-index-override="zIndexOverride"
        :autofocus-target="autofocusTarget" v-bind="overlayProps">
        <slot></slot>
      </PopoverOverlay>
    </Portal>
  </component>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PopoverProps } from './Popover'
import Portal from "../Portal/Portal.vue";
import PopoverOverlay from "./PopoverOverlay/PopoverOverlay.vue";
import { PopoverCloseSource } from "./PopoverOverlay/PopoverOverlay"
import { useId } from "../context";
import { portal } from "../shared";
import { setActivatorAttributes } from "./set-activator-attributes";
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from "../../utils/focus"


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
});

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

  if (source === PopoverCloseSource.FocusOut && activatorNode.value) {
    const focusableActivator =
      findFirstFocusableNodeIncludingDisabled(activatorNode.value) ||
      findFirstFocusableNodeIncludingDisabled(activatorContainer.value) ||
      activatorContainer.value;
    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  } else if (
    source === PopoverCloseSource.EscapeKeypress &&
    activatorNode.value
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

const setAccessibilityAttributes = () => {
  if (activatorContainer.value == null) {
    return;
  }

  const { active, ariaHaspopup } = props;

  const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer.value,);
  const focusableActivator: HTMLElement & { disabled?: boolean; } = firstFocusable || activatorContainer.value;

  const activatorDisabled = 'disabled' in focusableActivator && Boolean(focusableActivator.disabled);

  setActivatorAttributes(focusableActivator, { id: id.value, active, ariaHaspopup, activatorDisabled });
};


watch(() => [props.active, activatorNode.value], () => {
  setAccessibilityAttributes();
});

defineExpose({
  overlayEl: computed(() => {
    return overlayRef.value?.$el || undefined
  })
});
</script>
