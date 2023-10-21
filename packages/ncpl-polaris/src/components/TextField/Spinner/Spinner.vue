<template>
  <div :class="styles.Spinner" @click="e => $emit('click', e)">
    <div role="button" :class="styles.Segment" :tabIndex="-1" @click="handleStep(1)()"
      @mousedown="e => (handleMouseDown(e, handleStep(1)))" @mouseup="e => $emit('mouseup', e)"
      @blur="e => $emit('blur', e)" @focus="e => $emit('focus', e)">
      <div :class="styles.SpinnerIcon">
        <Icon :source="ChevronUpMinor" />
      </div>
    </div>
    <div role="button" :class="styles.Segment" :tabIndex="-1" @click="handleStep(-1)()"
      @mousedown="e => handleMouseDown(e, handleStep(-1))" @mouseup="e => $emit('mouseup', e)"
      @blur="e => $emit('blur', e)" @focus="e => $emit('focus', e)">
      <div :class="styles.SpinnerIcon">
        <Icon :source="ChevronDownMinor" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import styles from '../TextField.module.scss'
import Icon from '../../Icon';
import { ChevronUpMinor, ChevronDownMinor } from "@ncpl/ncpl-icons"


type HandleStepFn = (step: number) => void;

defineOptions({
  name: 'NpTextFieldSpinner',
})
const emit = defineEmits(['change', 'focus', 'blur', 'click', 'mousedown', 'mouseup'])
const node = ref();

function handleMouseDown(event: MouseEvent, fn: HandleStepFn) {
  if (event.button !== 0) return;
  emit('mousedown', fn)
};
function handleStep(step: number) {
  return () => emit('change', step)
}

defineExpose({ node })
</script>
