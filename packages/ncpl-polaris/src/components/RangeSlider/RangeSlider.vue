<template>
  <DualThumb v-if="isDualThumb(modelValue)" :model-value="modelValue"
    @update:modelValue="(e: RangeSliderValue) => $emit('update:modelValue', e)" v-bind="sharedProps">
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </DualThumb>
  <SingleThumb v-else :model-value="modelValue"
    @update:modelValue="(e: RangeSliderValue) => $emit('update:modelValue', e)" v-bind="sharedProps">
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </SingleThumb>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { RangeSliderProps, RangeSliderValue, DualValue } from './RangeSlider'
import DualThumb from "./DualThumb"
import SingleThumb from "./SingleThumb"
import { useId } from "../context";

defineOptions({
  name: 'NpRangeSlider',
})
const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
})

const uniqId = useId()

const sharedProps = computed(() => {
  const { modelValue, id, ...reset } = props;
  return {
    id: id || uniqId.value,
    ...reset
  }
})

function isDualThumb(modelValue: RangeSliderValue): modelValue is DualValue {
  return Array.isArray(modelValue);
}

</script>
