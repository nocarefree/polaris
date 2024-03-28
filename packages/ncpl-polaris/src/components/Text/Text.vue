<template>
  <component :is="tag" :class="className">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { TextProps } from "./Text";
import { classNames } from "../../utils";
import styles from "./Text.module.scss";

defineOptions({
  name: 'NpText',
})
const props = defineProps<TextProps>()

const tag = computed(() => {
  return props.as || (props.visuallyHidden ? "span" : "p");
});

const className = computed(() => {
  const {
    alignment,
    breakWord,
    tone,
    fontWeight,
    numeric = false,
    truncate = false,
    variant,
    visuallyHidden = false
  } = props;
  return classNames(
    styles.root,
    variant && styles[variant],
    fontWeight && styles[fontWeight],
    (alignment || truncate) && styles.block,
    alignment && styles[alignment],
    breakWord && styles.break,
    tone && styles[tone],
    numeric && styles.numeric,
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden
  );
});
</script>
