<template>
  <div ref="node" :class="styles.Slidable" @mousedown="startDrag" @touchstart="startDrag">
    <div :style="{ transform: `translate3d(${draggerX}px, ${draggerY}px, 0)` }" :class="styles.Dragger"
      ref="draggerNode" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import styles from '../ColorPicker.module.scss';

defineOptions({
  name: 'NpColorPickerSlidable',
})
defineProps<{
  draggerX?: number;
  draggerY?: number;
}>();
const emit = defineEmits(['change', 'draggerHeight']);

const node = ref();
const draggerNode = ref();
const state = reactive({
  dragging: false
})

function isMouseDownEvent(
  event: MouseEvent | TouchEvent,
): event is MouseEvent {
  return event.type === 'mousedown';
}

function isMouseMoveEvent(event: Event): event is MouseEvent {
  return event.type === 'mousemove';
}

let isDragging = false;
const startDrag = (event: MouseEvent | TouchEvent) => {
  if (isMouseDownEvent(event)) {
    handleDraggerMove(event.clientX, event.clientY);
  }

  if (!isDragging) {
    window.addEventListener('mousemove', handleMove, { passive: false })
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchend', handleDragEnd)
    window.addEventListener('touchcancel', handleDragEnd)
  }

  isDragging = true;
  state.dragging = true;


}

const handleDraggerMove = (x: number, y: number) => {
  if (!node.value) {
    return;
  }

  const rect = node.value.getBoundingClientRect();
  const offsetX = x - rect.left;
  const offsetY = y - rect.top;
  emit('change', { x: offsetX, y: offsetY });
}

const handleMove = (event: MouseEvent | TouchEvent) => {
  event.stopImmediatePropagation();
  event.stopPropagation();

  if (event.cancelable) {
    event.preventDefault();
  }

  if (isMouseMoveEvent(event)) {
    handleDraggerMove(event.clientX, event.clientY);
    return;
  }

  handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
}

const handleDragEnd = () => {
  isDragging = false;
  state.dragging = false;

  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('touchmove', handleMove)
  window.removeEventListener('mouseup', handleDragEnd)
  window.removeEventListener('touchend', handleDragEnd)
  window.removeEventListener('touchcancel', handleDragEnd)
}

onMounted(() => {
  if (draggerNode.value) {
    emit('draggerHeight', draggerNode.value.clientWidth)
  }
})


</script>
