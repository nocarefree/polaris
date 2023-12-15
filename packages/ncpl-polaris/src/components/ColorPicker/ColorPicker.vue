<template>
  <div :class="classNames(
    styles.ColorPicker,
    fullWidth && styles.fullWidth,
  )" :id="id" @mousedown="handlePickerDrag">
    <div ref="colorNode" :class="styles.MainColor">
      <div :className="styles.ColorLayer" :style="{ backgroundColor: colorString }" />
      <Slidable @change="handleDraggerMove" :dragger-x="draggerX" :dragger-y="draggerY" />
    </div>
    <HuePicker :hue="modelValue.hue" @change="handleHueChange" />
    <AlphaPicker v-if="allowAlpha" :alpha="alpha" :color="(modelValue as HSBColor)" @change="handleAlphaChange" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import type { ColorPickerProps } from './ColorPicker'
import styles from './ColorPicker.module.scss';
import { classNames } from "@ncpl-polaris/utils";
import { debounce } from "@ncpl-polaris/utils/debounce";
import { hsbToRgb } from '@ncpl-polaris/utils/color-transformers';
import { useEventListener } from '@vueuse/core';
import Slidable from "./Slidable";
import HuePicker from "./HuePicker";
import AlphaPicker from "./AlphaPicker";
import { clamp } from "lodash";
import type { HSBColor } from '@ncpl-polaris/utils/color-types';

interface State {
  pickerSize: {
    width: number;
    height: number;
  };
}

defineOptions({
  name: 'NpColorPicker',
})
const props = defineProps<ColorPickerProps>()
const emit = defineEmits(['update:model-value']);

const RESIZE_DEBOUNCE_TIME_MS = 200;
const colorNode = ref()
const state = reactive<State>({
  pickerSize: {
    width: 0,
    height: 0,
  }
})

const alpha = computed(() => props.modelValue.alpha != null && props.allowAlpha ? props.modelValue.alpha : 1);

const colorString = computed(() => {
  const { red, green, blue } = hsbToRgb({ hue: props.modelValue.hue, saturation: 1, brightness: 1 })
  return `rgba(${red}, ${green}, ${blue}, ${alpha.value})`;
});
const draggerX = computed(() => clamp(props.modelValue.saturation * state.pickerSize.width, 0, state.pickerSize.width));
const draggerY = computed(() => clamp(state.pickerSize.height - props.modelValue.brightness * state.pickerSize.height, 0, state.pickerSize.height));


const handlePickerDrag = (event: MouseEvent) => {
  event.preventDefault();
}
const handleDraggerMove = ({ x, y }: { x: number, y: number }) => {
  const { pickerSize } = state;
  const { modelValue: { hue, alpha = 1 } } = props;

  const saturation = clamp(x / pickerSize.width, 0, 1);
  const brightness = clamp(1 - y / pickerSize.height, 0, 1);

  emit('update:model-value', { hue, saturation, brightness, alpha });
}
const handleHueChange = (hue: number) => {
  const {
    modelValue: { brightness, saturation, alpha = 1 },
  } = props;
  emit('update:model-value', { hue, brightness, saturation, alpha });
}
const handleAlphaChange = (alpha: number) => {
  const {
    modelValue: { hue, brightness, saturation },
  } = props;
  emit('update:model-value', { hue, brightness, saturation, alpha });
}
const handleResize = debounce(() => {
  if (colorNode) {
    state.pickerSize = {
      width: colorNode.value.clientWidth,
      height: colorNode.value.clientHeight,
    }
  }
}, RESIZE_DEBOUNCE_TIME_MS, { leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS },)

useEventListener(window, 'resize', handleResize)

onMounted(() => {
  if (colorNode) {
    state.pickerSize = {
      width: colorNode.value.clientWidth,
      height: colorNode.value.clientHeight,
    }
  }

})
</script>
