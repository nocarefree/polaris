<template>
  <component :is="node">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import ButtonContent from "./ButtonContent.vue"
import type { ButtonProps } from "./Button";
import styles from "./Button.module.scss";
import { useAttrs, computed, h, useSlots } from "vue";

defineOptions({
  name: 'NpButton',
  inheritAttrs: false,
});
const attrs = useAttrs();
const props = defineProps<ButtonProps>();
const slots = useSlots();

const _attrs = computed(() => {
  return { ...attrs, ...props }
})

const node = computed(() => {
  return () => props.connectedDisclosure ?
    h('div', { class: styles.ConnectedDisclosureWrapper }, [h(ButtonContent, { ..._attrs.value }, slots)]) :
    h(ButtonContent, { ..._attrs.value }, slots);
});

</script>
