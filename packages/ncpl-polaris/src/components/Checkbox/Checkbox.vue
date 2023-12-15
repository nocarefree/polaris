<template>
  <Choice :id="uniqId" :label="label || ''" :label-hidden="labelHidden" :disabled="disabled"
    :label-class-name="classNames(styles.ChoiceLabel, labelClassName)" :fill="fill" v-bind="extraChoiceProps">
    <span :class="classNames(styles.Checkbox, error && styles.error)">
      <input ref="inputNode" :id="uniqId" :name="name" :value="value" type="checkbox" :checked="isChecked"
        :disabled="disabled" :class="classNames(styles.Input, isIndeterminate && styles['Input-indeterminate'],)"
        @blur="handleBlur" @click="handleOnClick" @focus="e => $emit('focus', e)" :aria-invalid="error != null"
        :aria-controls="ariaControls" :aria-describedby="_ariaDescribedBy"
        :role="isWithinListbox ? 'presentation' : 'checkbox'" v-bind="indeterminateAttributes" />
      <span :class="styles.Backdrop" @click="e => e.stopPropagation()" @keyUp="(e: Event) => e.stopPropagation()" />
      <span :class="classNames(styles.Icon, !isIndeterminate && styles.animated,)">
        <svg v-if="!isIndeterminate" viewBox="0 0 16 16" shapeRendering="geometricPrecision"
          textRendering="geometricPrecision">
          <path :class="classNames(checked && styles.checked)"
            d="M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5"
            transform="translate(2 2.980376)" opacity="0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" pathLength="1" />
        </svg>
        <Icon v-else :source="iconSource" />
      </span>
    </span>
  </Choice>
</template>
<script setup lang="ts">
import { shallowRef, toRef, computed } from 'vue'
import type { CheckboxProps } from './Checkbox'
import Choice from '../Choice';
import { helpTextID } from "../Choice/utils"
import Icon from '../Icon';
import styles from './Checkbox.module.scss';
import { classNames } from "@ncpl-polaris/utils";
import { MinusMinor, TickSmallMinor } from "@ncpl/ncpl-icons";
import { errorTextID } from '../InlineError';
import { useId, withinListboxContext } from "../context"

defineOptions({
  name: 'NpCheckbox',
})

const emit = defineEmits(['blur', 'focus', 'change'])

const props = defineProps<CheckboxProps>()
const uniqId = useId(toRef(props, 'id'));
const inputNode = shallowRef();
const isWithinListbox = withinListboxContext.inject();

const _ariaDescribedBy = computed(() => {
  const { error, helpText, ariaDescribedBy } = props;
  let describedBy: string[] = [];
  if (error && typeof error !== 'boolean') {
    describedBy.push(errorTextID(uniqId.value));
  }
  if (helpText) {
    describedBy.push(helpTextID(uniqId.value));
  }
  if (ariaDescribedBy) {
    describedBy.push(ariaDescribedBy);
  }
  return describedBy.length
    ? describedBy.join(' ')
    : undefined;
})

const extraChoiceProps = computed(() => {
  const { helpText, error, bleed, bleedBlockStart, bleedBlockEnd, bleedInlineStart, bleedInlineEnd } = props;
  return {
    helpText,
    error,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd,
  };
});

const isIndeterminate = computed(() => props.checked === 'indeterminate');
const isChecked = computed(() => !isIndeterminate.value && Boolean(props.checked));
const iconSource = computed(() => isIndeterminate.value ? MinusMinor : TickSmallMinor);
const indeterminateAttributes = computed(() => isIndeterminate.value ? { indeterminate: true, ariaChecked: 'mixed' } : { ariaChecked: isChecked.value });

const handleBlur = () => {
  emit('blur');
};

const handleOnClick = () => {
  if (inputNode.value == null || props.disabled) {
    return;
  }

  emit('change', inputNode.value.checked, uniqId.value);
  inputNode.value.focus();
};

defineExpose({
  focus: () => {
    inputNode.value?.focus();
  }
})

</script>
