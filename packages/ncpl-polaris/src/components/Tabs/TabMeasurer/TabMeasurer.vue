<template>
  <div :class="classNames(styles.Tabs, styles.TabsMeasurer)" ref="containerNode">
    <Tab v-for="(tab, index) in tabs" measuring :key="`$${tab.id}Hidden`" :id="`${tab.id}Measurer`"
      :sibling-tab-has-focus="siblingTabHasFocus" :focused="index === tabToFocus" :selected="index === selected"
      :url="tab.url" :content="tab.content" />
    <slot name="activator"></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabMeasurerProps } from './TabMeasurer'
import styles from '../Tabs.module.scss'
import { classNames } from "../../../utils"
import { useEventListener } from '@vueuse/core'
import Tab from "../Tab"

defineOptions({
  name: 'NpTabsTabMeasurer',
})

const emit = defineEmits(['handleMeasurement']);
const props = defineProps<TabMeasurerProps>()

const containerNode = ref();


let animationFrame: number | null;



const resize = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  animationFrame = requestAnimationFrame(() => {
    if (!containerNode.value) {
      return;
    }

    const containerWidth = containerNode.value.offsetWidth - 20 - 28;
    const hiddenTabNodes = containerNode.value.children;
    const hiddenTabNodesArray: HTMLElement[] = Array.from(hiddenTabNodes);
    const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
      const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
      return buttonWidth + 4;
    });
    const disclosureWidth = hiddenTabWidths.pop() || 0;

    emit('handleMeasurement', {
      containerWidth,
      disclosureWidth,
      hiddenTabWidths,
    });
  });
}

watch(() => props.tabs, () => {
  resize();
}, { flush: 'post', immediate: true })

useEventListener('resize', resize);
</script>
