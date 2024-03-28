<template>
  <div :class="styles.ScrollContainer" ref="scrollableContainerRef" @scroll="handleScroll">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import styles from './ScrollContainer.module.scss'
import { debounce } from "../../../utils/debounce";
import { scrollContext } from "../../context"

defineOptions({
  name: 'NpIndexTableScrollContainer',
})

const emit = defineEmits(['scroll']);

const scrollableContainerRef = ref();
const containerScroll = ref({
  scrollableContainer: null,
  canScrollLeft: false,
  canScrollRight: false,
});

const handleScroll = debounce(() => {
  if (!scrollableContainerRef.value) {
    return;
  }

  const availableScrollAmount =
    scrollableContainerRef.value.scrollWidth -
    scrollableContainerRef.value.offsetWidth;

  const canScrollLeft = scrollableContainerRef.value.scrollLeft > 0;
  const canScrollRight =
    scrollableContainerRef.value.scrollLeft < availableScrollAmount;
  emit('scroll', canScrollLeft, canScrollRight);
  containerScroll.value = {
    scrollableContainer: scrollableContainerRef.value,
    canScrollLeft,
    canScrollRight,
  };
}, 40, { trailing: true, leading: true, maxWait: 40 },)

scrollContext.provide(containerScroll);

onMounted(() => {
  if (!scrollableContainerRef.value) return;
  scrollableContainerRef.value.dispatchEvent(new Event('scroll'));
});
</script>
