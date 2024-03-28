<template>
  <div :class="styles.AlphaPicker" :ref="setSliderHeight">
    <div :class="styles.ColorLayer" :style="{ background }"></div>
    <Slidable :dragger-y="draggerY" :dragger-x="0" @change="handleChange" @draggerHeight="setDraggerHeight" />
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import styles from '../ColorPicker.module.scss'
import { calculateDraggerY, alphaForDraggerY } from "./utils"
import { hsbToRgb } from '../../../utils/color-transformers';
import Slidable from "../Slidable"
import type { HSBColor } from '../../../utils/color-types';

defineOptions({
  name: 'NpColorPickerHuePicker',
})
const props = defineProps<{
  color: HSBColor;
  alpha: number;
}>()
const emit = defineEmits(['change']);

const state = reactive({
  sliderHeight: 0,
  draggerHeight: 0
});


const draggerY = computed(() => {
  return calculateDraggerY(props.alpha, state.sliderHeight, state.draggerHeight)
});

const background = computed(() => {
  return alphaGradientForColor(props.color);
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
  const alpha = alphaForDraggerY(y, state.sliderHeight);
  emit('change', alpha);
}

function alphaGradientForColor(color: HSBColor) {
  const { red, green, blue } = hsbToRgb(color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
}


</script>
