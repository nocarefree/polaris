<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { onUpdated, unref } from 'vue';
import type { FocusProps } from './Focus';
import { focusFirstFocusableNode } from "@ncpl-polaris/utils/focus";

defineOptions({
  name: 'NpFocus',
})
const props = defineProps<FocusProps>()


onUpdated(() => {
  const { disabled, root } = props;
  if (disabled || !root) {
    return;
  }

  const node = unref(root);

  if (!node || node.querySelector('[autofocus]')) {
    return;
  }

  requestAnimationFrame(() =>
    requestAnimationFrame(() => focusFirstFocusableNode(node, false)
    )
  )
})
</script>
