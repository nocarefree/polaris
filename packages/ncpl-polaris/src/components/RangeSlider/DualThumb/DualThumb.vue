<template>
  <Labelled :id="id" :label="label" :error="error" :action="labelAction" :label-hidden="labelHidden"
    :help-text="helpText">
    <div :class="classNames(styles.DualThumb, sharedStyles.RangeSlider)">
      <div v-if="$slots.prefix" :class="styles.Prefix">
        <slot name="prefix"></slot>
      </div>
      <div :class="trackWrapperClassName" @mousedown="handleMouseDownTrack" ref="trackWrapper">
        <div :class="styles.Track" :style="cssVars" ref="track" />
        <div :class="styles['Track--dashed']" />
        <div :id="idLower" :class="thumbLowerClassName" :style="{ left: `${leftPositionThumbLower}px`, }" role="slider"
          :aria-disabled="disabled" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue[0]"
          :aria-invalid="Boolean(error)" :aria-describedby="ariaDescribedBy" :aria-labelledby="labelID(id)"
          @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" tabindex="0" @keydown="handleKeypressLower"
          @mousedown="handleMouseDownThumbLower" @touchstart="handleTouchStartThumbLower" ref="thumbLower" />
        <output v-if="!disabled && output" :htmlFor="idLower" :class="classNames(styles.Output, styles.OutputLower)"
          :style="{ left: `${leftPositionThumbLower}px` }">
          <div :class="styles.OutputBubble">
            <Text as="span" variant="headingSm" alignment="center">
              {{ modelValue[0] }}
            </Text>
          </div>
        </output>
        <div :id="idUpper" :class="thumbUpperClassName" :style="{ left: `${leftPositionThumbUpper}px`, }" role="slider"
          :aria-disabled="disabled" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="modelValue[1]"
          :aria-invalid="Boolean(error)" :aria-describedby="ariaDescribedBy" :aria-labelledby="labelID(id)"
          @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" tabindex="0" @keydown="handleKeypressUpper"
          @MouseDown="handleMouseDownThumbUpper" @touchstart="handleTouchStartThumbUpper" ref="thumbUpper" />
        <output v-if="!disabled && output" :htmlFor="idUpper" :class="classNames(styles.Output, styles.OutputUpper)"
          :style="{ left: `${leftPositionThumbUpper}px`, }">
          <div :class="styles.OutputBubble">
            <Text as="span" variant="headingSm" alignment="center">
              {{ modelValue[1] }}
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
import { ref, reactive, computed } from 'vue'
import type { RangeSliderDualThumbProps } from './DualThumb'
import type { DualValue } from "../RangeSlider"
import Labelled from "../../Labelled"
import { labelID } from "../../Label"
import Text from "../../Text"
import styles from './DualThumb.module.scss'
import sharedStyles from '../RangeSlider.module.scss'
import { useEventListener } from '@vueuse/core';
import { debounce } from "@ncpl-polaris/utils/debounce"
import { classNames } from "@ncpl-polaris/utils"
import { Key } from '../../types';

enum Control {
  Lower,
  Upper,
}

interface KeyHandlers {
  [key: string]: () => void;
}


defineOptions({
  name: 'NpRangeSliderDualThumb',
})

const emit = defineEmits(['focus', 'blur', 'change'])
const props = defineProps<RangeSliderDualThumbProps>()

const track = ref();
const thumbUpper = ref();
const thumbLower = ref();
const idLower = computed(() => props.id);
const idUpper = computed(() => `${props.id}Upper`);

const trackWrapperClassName = computed(() => classNames(
  styles.TrackWrapper,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

const thumbLowerClassName = computed(() => classNames(
  styles.Thumbs,
  styles.ThumbLower,
  props.disabled && styles.disabled,
));
const thumbUpperClassName = computed(() => classNames(
  styles.Thumbs,
  styles.ThumbUpper,
  props.disabled && styles.disabled,
));

const ariaDescribedBy = computed(() => {
  let describedBy: string[] = [];

  if (props.error) {
    describedBy.push(`${props.id}Error`);
  }

  return describedBy.length
    ? describedBy.join(' ')
    : undefined;
})


const state = reactive({
  value: sanitizeValue(
    props.modelValue,
    props.min,
    props.max,
    props.step,
  ),
  trackWidth: 0,
  trackLeft: 0,
})

const range = computed(() => props.max - props.min);
const minValuePosition = computed(() => (props.min / range.value) * state.trackWidth);
const leftPositionThumbLower = computed(() => (props.modelValue[0] / range.value) * state.trackWidth - minValuePosition.value);
const leftPositionThumbUpper = computed(() => (props.modelValue[1] / range.value) * state.trackWidth - minValuePosition.value);

const cssVars = computed(() => ({
  '--pc-range-slider-progress-lower': `${leftPositionThumbLower}px`,
  '--pc-range-slider-progress-upper': `${leftPositionThumbUpper}px`,
}));



const incrementValueLower = () => {
  setValue(
    [state.value[0] + props.step, state.value[1]],
    Control.Upper,
  );
};

const decrementValueLower = () => {
  setValue(
    [state.value[0] - props.step, state.value[1]],
    Control.Upper,
  );
};

const incrementValueUpper = () => {
  setValue(
    [state.value[0], state.value[1] + props.step],
    Control.Lower,
  );
};

const decrementValueUpper = () => {
  setValue(
    [state.value[0], state.value[1] - props.step],
    Control.Lower,
  );
};


const handleKeypressLower = (
  event: KeyboardEvent,
) => {
  if (props.disabled) return;

  const handlerMap: KeyHandlers = {
    [Key.UpArrow]: incrementValueLower,
    [Key.RightArrow]: incrementValueLower,
    [Key.DownArrow]: decrementValueLower,
    [Key.LeftArrow]: decrementValueLower,
  };

  const handler = handlerMap[event.keyCode];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
}

const handleKeypressUpper = (
  event: KeyboardEvent,
) => {
  if (props.disabled) return;

  const handlerMap: KeyHandlers = {
    [Key.UpArrow]: incrementValueUpper,
    [Key.RightArrow]: incrementValueUpper,
    [Key.DownArrow]: decrementValueUpper,
    [Key.LeftArrow]: decrementValueUpper,
  };

  const handler = handlerMap[event.keyCode];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
}

const handleMouseDownThumbLower = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) return;
  registerMouseMoveHandler(handleMouseMoveThumbLower);
  event.stopPropagation();
};

const handleMouseMoveThumbLower = (event: MouseEvent) => {
  const valueUpper = state.value[1];
  setValue([actualXPosition(event.clientX), valueUpper], Control.Upper,);
}

const handleMouseMoveThumbUpper = (event: MouseEvent) => {
  const valueLower = state.value[0];
  setValue(
    [valueLower, actualXPosition(event.clientX)],
    Control.Lower,
  );
};

const handleMouseDownThumbUpper = (
  event: MouseEvent,
) => {
  if (event.button !== 0 || props.disabled) return;
  registerMouseMoveHandler(handleMouseMoveThumbUpper);
  event.stopPropagation();
}

const handleTouchStartThumbUpper = (
  event: TouchEvent,
) => {
  if (props.disabled) return;
  registerTouchMoveHandler(handleTouchMoveThumbUpper);
  event.stopPropagation();
}

const handleMouseDownTrack = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) return;
  event.preventDefault();
  const clickXPosition = actualXPosition(event.clientX);
  const { value } = state;
  const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
  const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

  if (distanceFromLowerThumb <= distanceFromUpperThumb) {
    setValue([clickXPosition, value[1]], Control.Upper);
    registerMouseMoveHandler(handleMouseMoveThumbLower);

    if (thumbLower.value != null) {
      thumbLower.value.focus();
    }
  } else {
    setValue([value[0], clickXPosition], Control.Lower);
    registerMouseMoveHandler(handleMouseMoveThumbUpper);

    if (thumbUpper.value != null) {
      thumbUpper.value.focus();
    }
  }
}

const handleTouchMoveThumbUpper = (event: TouchEvent) => {
  event.preventDefault();
  const valueLower = state.value[0];
  setValue(
    [valueLower, actualXPosition(event.touches[0].clientX)],
    Control.Lower,
  );
};

const handleTouchStartThumbLower = (
  event: TouchEvent,
) => {
  if (props.disabled) return;
  registerTouchMoveHandler(handleTouchMoveThumbLower);
  event.stopPropagation();
}

const handleTouchMoveThumbLower = (event: TouchEvent) => {
  event.preventDefault();
  const valueUpper = state.value[1];
  setValue(
    [actualXPosition(event.touches[0].clientX), valueUpper],
    Control.Upper,
  );
}

const actualXPosition = (dirtyXPosition: number): number => {
  if (track.value) {
    const { min, max } = props;
    const { trackLeft, trackWidth } = state;

    const relativeX = dirtyXPosition - trackLeft;
    const percentageOfTrack = relativeX / trackWidth;

    return percentageOfTrack * (max - min);
  } else {
    return 0;
  }
};

const setValue = (dirtyValue: DualValue, control: Control) => {
  const { min, max, step } = props;
  const { value } = state;

  const sanitizedValue = sanitizeValue(dirtyValue, min, max, step, control);
  if (isTupleEqual(sanitizedValue, value) === false) {
    state.value = sanitizedValue;
    emit('change', state.value, props.id);
  }
}

const setTrackPosition = debounce(
  () => {
    if (track.value) {
      const thumbSize = 16;

      const { width, left } = track.value.getBoundingClientRect();
      const adjustedTrackWidth = width - thumbSize;
      const adjustedTrackLeft = left + thumbSize / 2;

      const range = props.max - props.min;
      const minValuePosition = (props.min / range) * adjustedTrackWidth;


      state.trackWidth = adjustedTrackWidth;
      state.trackLeft = adjustedTrackLeft - minValuePosition;

    }
  },
  40,
  { leading: true, trailing: true, maxWait: 40 },
)

useEventListener(window, 'resize', setTrackPosition)


function registerMouseMoveHandler(handler: (event: MouseEvent) => void) {
  document.addEventListener('mousemove', handler);
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', handler);
    },
    { once: true },
  );
}

function registerTouchMoveHandler(handler: (event: TouchEvent) => void) {
  const removeHandler = () => {
    document.removeEventListener('touchmove', handler);
    document.removeEventListener('touchend', removeHandler);
    document.removeEventListener('touchcancel', removeHandler);
  };

  document.addEventListener('touchmove', handler, { passive: false });
  document.addEventListener('touchend', removeHandler, { once: true });
  document.addEventListener('touchcancel', removeHandler, { once: true });
}

function sanitizeValue(
  value: DualValue,
  min: number,
  max: number,
  step: number,
  control = Control.Upper,
): DualValue {
  let upperValue = inBoundsUpper(roundedToStep(value[1]));
  let lowerValue = inBoundsLower(roundedToStep(value[0]));
  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;

  if (control === Control.Upper && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === Control.Lower && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }

  return [lowerValue, upperValue];

  function inBoundsUpper(value: number): number {
    const lowerMin = min + step;

    if (value < lowerMin) {
      return lowerMin;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  function inBoundsLower(value: number): number {
    const upperMax = max - step;

    if (value < min) {
      return min;
    } else if (value > upperMax) {
      return upperMax;
    } else {
      return value;
    }
  }

  function roundedToStep(value: number) {
    return Math.round(value / step) * step;
  }
}

function isTupleEqual(a?: DualValue, b?: DualValue) {
  if (a == null || b == null) {
    return false;
  }

  return a[0] === b[0] && a[1] === b[1];
}

</script>
