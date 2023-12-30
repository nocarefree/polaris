<template>
  <Choice :label="label" :label-hidden="labelHidden" :disabled="disabled" :id="uniqId"
    :label-class-name="styles.ChoiceLabel" :fill="fill" :help-text="helpText" :bleed="bleed"
    :bleed-block-start="bleedBlockStart" :bleed-block-end="bleedBlockEnd" :bleed-inline-start="bleedInlineStart"
    :bleed-inline-end="bleedInlineEnd">
    <span :class="styles.RadioButton">
      <input :id="uniqId" :name="nameProp" :value="value" type="radio" :checked="checked" :disabled="disabled"
        :class="classNames(styles.Input)" @change="e => $emit('change', (e.target as HTMLInputElement)?.checked)"
        @focus="e => $emit('focus', e)" @blur="e => $emit('blur', e)" :aria-describedby="_ariaDescribedBy"
        ref="inputNode" />
      <span :class="styles.Backdrop" />
    </span>
  </Choice>
</template>
<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { RadioButtonProps } from './RadioButton'
import styles from './RadioButton.module.scss'
import Choice from '../Choice';
import { helpTextID } from '../Choice/utils';
import { useId } from '../context';
import { classNames } from "@ncpl-polaris/utils";

defineOptions({
  name: 'NpRadioButton',
})
defineEmits(['focus', 'blur', 'change'])
const props = defineProps<RadioButtonProps>()
const uniqId = useId(toRef(props, 'id'));
const nameProp = computed(() => {
  return props.name || uniqId.value
})
const _ariaDescribedBy = computed(() => {
  const describedBy: string[] = [];
  if (props.helpText) {
    describedBy.push(helpTextID(uniqId.value));
  }
  if (props.ariaDescribedBy) {
    describedBy.push(props.ariaDescribedBy);
  }
  return describedBy.length
    ? describedBy.join(' ')
    : undefined;
})
</script>
