<template>
  <WrapComponent>
    <slot></slot>
  </WrapComponent>
</template>
<script setup lang="ts">
import { computed, h, defineComponent } from "vue";
import Scrollable from "../../Scrollable"
import Section from "../Section/Section.vue"
import type { PaneProps } from "./Pane"
import { classNames } from "../../../utils";
import styles from '../Popover.module.scss';

//defineOptions({ name: 'Pane' });
const props = defineProps<PaneProps>();
const emit = defineEmits(['scrolledToBottom']);

const className = computed(() => {
  return classNames(
    styles.Pane,
    props.fixed && styles['Pane-fixed'],
    props.subdued && styles['Pane-subdued'],
    props.captureOverscroll && styles['Pane-captureOverscroll'],
  );
})

const style = computed(() => {
  return props.height
    ? { height: props.height, maxHeight: props.height, minHeight: props.height }
    : undefined;
})

const WrapComponent = defineComponent({
  setup(_props, { slots }) {
    return () => {
      let content: any;
      if (props.sectioned) {
        content = [h(Section, {}, slots)];
      } else {
        content = slots;
      }
      return props.fixed ? h('div', { class: className.value }, content) : h(Scrollable, { class: className.value, style: style.value, shadow: true, onScrolledToBottom }, content)
    }
  }
})


const onScrolledToBottom = () => {
  emit('scrolledToBottom')
}

</script>