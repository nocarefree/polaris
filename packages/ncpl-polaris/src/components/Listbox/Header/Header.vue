<template>
  <div aria-hidden :id="sectionId || undefined">
    <Box v-if="isString" padding-block-start="200" padding-inline-start="400" padding-block-end="200"
      padding-inline-end="400">
      <Text as="span" variant="headingSm" tone="subdued">
        <slot></slot>
      </Text>
    </Box>
    <slot v-else></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, useSlots, Text as NodeText } from 'vue'
import Text from "../../Text";
import Box from "../../Box";
import { useSection } from "../Section";

defineOptions({
  name: 'NpListboxHeader',
})

const slots = useSlots();
const sectionId = useSection();

const isString = computed(() => {
  const _content = slots.default?.();
  return _content && _content[0] && _content[0].type == NodeText;
})
</script>
