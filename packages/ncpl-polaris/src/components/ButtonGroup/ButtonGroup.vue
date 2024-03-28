<template>
  <div :class="classNames(
    styles.ButtonGroup,
    gap && styles[gap],
    variant && styles[variationName('variant', variant)],
    fullWidth && styles.fullWidth,
    noWrap && styles.noWrap,
  )" :data-buttongroup-variant="variant" :data-buttongroup-connected-top="connectedTop"
    :data-buttongroup-full-width="fullWidth" :data-buttongroup-no-wrap="noWrap">
    <Item v-for="(node, index) in nodes" :key="index" :button="node"></Item>
  </div>
</template>
<script setup lang="ts">
import { useSlots, computed } from 'vue'
import Item from "./Item/Item.vue";
import type { ButtonGroupProps } from './ButtonGroup'
import { classNames, variationName, elementChildren } from "../../utils"
import styles from './ButtonGroup.module.scss'

defineOptions({
  name: 'NpButtonGroup',
})
withDefaults(defineProps<ButtonGroupProps>(), {
  connectedTop: undefined,
  fullWidth: undefined,
  noWrap: undefined,
})

const slots = useSlots();
const nodes = computed(() => elementChildren(slots.default?.()))


</script>
