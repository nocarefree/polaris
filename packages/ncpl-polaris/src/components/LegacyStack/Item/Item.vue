<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { classNames } from "@ncpl-polaris/utils";
import type { LegacyStackItemProps } from "./Item"
import styles from "../LegacyStack.module.scss";

defineOptions({
  name: 'NpLegacyStackItem'
})

const props = defineProps<LegacyStackItemProps>();


const className = computed(() => {
  const { fill = false } = props;
  return classNames(styles.Item, fill !== false && styles["Item-fill"]);
});
</script>