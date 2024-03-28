<template>
  <div :class="styles.HorizontalStack" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { HorizontalStackProps } from "./HorizontalStack";
import { getResponsiveProps } from "../../utils";
import styles from "./HorizontalStack.module.scss";
import type { AttrsType } from "../types"

defineOptions({
  name: "NpHorizontalStack",
});
const props = defineProps<HorizontalStackProps>()

const style = computed(() => {
  return {
    '--pc-horizontal-stack-align': props.align,
    '--pc-horizontal-stack-block-align': props.blockAlign,
    '--pc-horizontal-stack-wrap': props.wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('horizontal-stack', 'gap', 'space', props.gap),
  } as AttrsType;
})
</script>
