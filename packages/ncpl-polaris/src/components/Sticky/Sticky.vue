<template>
  <div>
    <div ref="placeHolderNode" />
    <div ref="stickyNode" :style="state.style">
      <slot :is-sticky="state.isSticky"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, nextTick } from 'vue'
import type { StickyProps } from './Sticky'
import { getRectForNode } from "@ncpl-polaris/utils"
import { useStickyManager } from "../context"

defineOptions({
  name: 'NpSticky',
})
const props = defineProps<StickyProps>()
const emit = defineEmits(['stickyChange']);

const state = reactive({ style: {}, isSticky: false });
const stickyNode = ref<HTMLElement>();
const placeHolderNode = ref<HTMLElement>();
const stickyManager = useStickyManager();

const adjustPlaceHolderNode = (add: boolean) => {
  if (placeHolderNode.value && stickyNode.value) {
    placeHolderNode.value.style.paddingBottom = add
      ? `${getRectForNode(stickyNode.value).height}px`
      : '0px';
  }
};

const handlePositioning = (stick: boolean, top = 0, left = 0, width = 0) => {

  if ((stick && !state.isSticky) || (!stick && state.isSticky)) {
    adjustPlaceHolderNode(stick);
    state.isSticky = !state.isSticky
    nextTick(() => {
      const { boundingElement } = props;

      emit('stickyChange', state.isSticky);

      if (boundingElement) {
        boundingElement.toggleAttribute('data-sticky-active')
      }
    })
  }

  state.style = stick ? { position: 'fixed', top: `${top}px`, left: `${left}px`, width: `${width}px` } : {};

}


onMounted(() => {
  const {
    boundingElement,
    offset = false,
    disableWhenStacked = false,
  } = props;

  if (!stickyNode.value || !placeHolderNode.value) return;

  stickyManager.registerStickyItem({
    stickyNode: stickyNode.value,
    placeHolderNode: placeHolderNode.value,
    handlePositioning: handlePositioning,
    offset,
    boundingElement,
    disableWhenStacked,
  });
})

onBeforeUnmount(() => {
  if (!stickyNode.value) return;
  stickyManager.unregisterStickyItem(stickyNode.value);
});

</script>
