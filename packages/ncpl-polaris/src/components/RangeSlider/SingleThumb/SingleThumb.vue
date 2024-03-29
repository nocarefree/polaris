<template>
  <Labelled :id="id" :label="label" :error="error" :action="labelAction" :label-hidden="labelHidden"
    :help-text="helpText">
    <div :class="classNames(
      styles.SingleThumb,
      sharedStyles.RangeSlider,
      error && styles.error,
      disabled && styles.disabled,
    )" :style="cssVars">
      <div v-if="$slots.prefix" :class="styles.Prefix">
        <slot name="prefix"></slot>
      </div>
      <div :class="styles.InputWrapper">
        <input type="range" :class="styles.Input" :id="id" :name="id" :min="min" :max="max" :step="step"
          :value="clampedValue" :disabled="disabled"
          @input="event => $emit('update:modelValue', parseInt((event.target as HTMLInputElement).value))"
          @change="event => $emit('change', parseInt((event.target as HTMLInputElement).value), id)"
          @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" :aria-valuemin="min" :aria-valuemax="max"
          :aria-valuenow="clampedValue" :aria-invalid="Boolean(error)" :aria-describedby="ariaDescribedBy" />
        <output v-if="!disabled && output" :htmlFor="id" :class="styles.Output">
          <div :class="styles.OutputBubble">
            <Text as="span" variant="headingSm" alignment="center">
              {{ clampedValue }}
            </Text>
          </div>
        </output>
      </div>
      <div v-if="$slots.suffix" :class="styles.Suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </Labelled>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { RangeSliderSingleThumbProps } from './SingleThumb'
import styles from './SingleThumb.module.scss'
import sharedStyles from "../RangeSlider.module.scss"
import Labelled from "../../Labelled"
import Text from "../../Text"
import { classNames } from "../../../utils"
import { clamp } from 'lodash'
import { helpTextID } from '../../Labelled';

defineOptions({
  name: 'NpRangeSliderSingleThumb',
})

defineEmits(['change', 'update:modelValue', 'blur', 'focus'])
const props = defineProps<RangeSliderSingleThumbProps>()

const clampedValue = computed(() => clamp(props.modelValue, props.min, props.max));
const sliderProgress = computed(() => ((clampedValue.value - props.min) * 100) / (props.max - props.min));
const outputFactor = computed(() => invertNumber((sliderProgress.value - 50) / 100));

const cssVars = computed(() => ({
  '--pc-range-slider-min': props.min,
  '--pc-range-slider-max': props.max,
  '--pc-range-slider-current': clampedValue.value,
  '--pc-range-slider-progress': `${sliderProgress.value}%`,
  '--pc-range-slider-output-factor': `${outputFactor.value}`,
}));

const ariaDescribedBy = computed(() => {
  let describedBy: string[] = [];

  if (props.error) {
    describedBy.push(`${props.id}Error`);
  }

  if (props.helpText) {
    describedBy.push(helpTextID(props.id));
  }

  return describedBy.length
    ? describedBy.join(' ')
    : undefined;
})



function invertNumber(number: number) {
  if (Math.sign(number) === 1) {
    return -Math.abs(number);
  } else if (Math.sign(number) === -1) {
    return Math.abs(number);
  } else {
    return 0;
  }
}

</script>
