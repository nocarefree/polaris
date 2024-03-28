<template>
  <component :is="inline ? 'span' : 'div'" :id="`${id}-wrapper`" @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnterFix" ref="wrapperContainer">
    <NpPopover :activator-wrapper="inline ? 'span' : 'div'" v-model:active="active"
      :preferred-alignment="preferredAlignment" :preferred-position="preferredPosition" ref="popover">
      <template #activator>
        <button type="button" :aria-describedby="id"
          :class="classNames(styles.Button, inline && styles.Inline, active && styles.Active, titleClassName)"
          @click="e => $emit('click', e)">
          <slot v-if="$slots.renderWrapper" name="renderWrapper" :title="title"></slot>
          <NpText v-else variant="headingMd" as="h2">
            <component :is="titleComponent"></component>
          </NpText>
        </button>
      </template>
      <div :class="classNames(constrainWidth && styles.DefinitionContainer, definitionClassName)" :id="id"
        role="tooltip">
        <slot></slot>
      </div>
    </NpPopover>
  </component>
</template>
<script setup lang="ts">
import { type Component, ref, computed, h } from 'vue';
import { NpPopover, NpText, useId, classNames, type PreferredAlignment, type PreferredPosition } from "@ncpl/ncpl-polaris";
import styles from "./DefinitionPopover.module.scss";
import { useEventListener } from '@vueuse/core';

const props = withDefaults(defineProps<{
  title: string;
  titleClassName?: string;
  definitionClassName?: string;
  inline?: boolean;
  renderWrapper?: Component;
  constrainWidth?: boolean;
  preferredAlignment?: PreferredAlignment;
  preferredPosition?: PreferredPosition;
}>(), {
  inline: false,
  constrainWidth: true
})

const id = useId('DefinitionPopoverContent');
const active = ref(false);
const popover = ref<any>();
const overlayEl = computed(() => {
  return popover.value?.overlayEl;
})
const wrapperContainer = ref<HTMLElement>();

const titleComponent = computed(() => {
  return h('span', { class: styles.WrappedContent }, props.title);
})


const handleMouseLeave = (event: MouseEvent) => {
  let rect;
  rect = overlayEl.value?.getBoundingClientRect?.();
  if (rect && event.target != overlayEl.value) {
    if (event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom) {
      return true;
    }
  }

  if (wrapperContainer.value && event.target != wrapperContainer.value) {
    rect = wrapperContainer.value.getBoundingClientRect();
    if (event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom) {
      return true;
    }
  }

  active.value = false;
}
const handleMouseEnterFix = () => {
  if (!active.value) {
    active.value = true;
  }
}
useEventListener(overlayEl, 'mouseleave', handleMouseLeave);
useEventListener(overlayEl, 'mouseenter', handleMouseEnterFix);

</script>
