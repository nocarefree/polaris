<template>
  <div :class="styles.HuePicker" :ref="setSliderHeight">
    <Slidable :dragger-y="draggerY" :dragger-x="0" @change="handleChange" @draggerHeight="setDraggerHeight" />
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import styles from '../ColorPicker.module.scss'
import { hueForDraggerY, calculateDraggerY } from "./utils"
import Slidable from "../Slidable"

defineOptions({
  name: 'NpColorPickerHuePicker',
})
const props = defineProps<{
  hue: number;
}>()
const emit = defineEmits(['change']);

const state = reactive({
  sliderHeight: 0,
  draggerHeight: 0
});

const draggerY = computed(() => {
  return calculateDraggerY(props.hue, state.sliderHeight, state.draggerHeight)
});

const setSliderHeight = (node: any) => {
  if (node) {
    state.sliderHeight = node.clientHeight
  }
}

const setDraggerHeight = (height: number) => {
  state.draggerHeight = height;
}

const handleChange = ({ y }: { x: number, y: number }) => {
  const hue = hueForDraggerY(y, state.sliderHeight);
  emit('change', hue);
}


</script>
