<template>
  <li :key="id" :class="styles.Option" :tabIndex="-1" @pointerenter="handlePointerEnter">
    <label v-if="allowMultiple" :for="id" :class="classNames(
    styles.Label,
    disabled && styles.disabled,
    active && styles.active,
    select && styles.select,
    verticalAlign && styles[variationName('verticalAlign', verticalAlign)],
    allowMultiple && styles.CheckboxLabel,
    allowMultiple && styles.MultiSelectOption,
  )">
      <div :class="styles.Checkbox">
        <PolarisCheckbox :id="id" label="" :aria-described-by="`${id}-label`" :value="value" :checked="select"
          :disabled="disabled" @change="handleClick" />
      </div>
      <div v-if="media" :class="styles.Media">{{ media }}</div>
      <span :id="`${id}-label`">{{ label }}</span>
    </label>
    <button v-else :id="id" type="button" :class="classNames(
    styles.SingleSelectOption,
    focused && styles.focused,
    disabled && styles.disabled,
    select && styles.select,
    active && styles.active,
    verticalAlign && styles[variationName('verticalAlign', verticalAlign)],
  )" @click="handleClick" :disabled="disabled" @focus="handleFocus" @blur="focused = false"
      :aria-pressed="active || select">

      <InlineStack :wrap="false" :block-align="verticalAlignToBlockAlign(verticalAlign)">
        <div v-if="media" :class="styles.Media">{{ media }}</div>
        {{ label }}
      </InlineStack>
      <span v-if="select || active" :class="styles.Icon">
        <Icon :source="CheckIcon" />
      </span>

    </button>
  </li>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { OptionListOptionProps } from './Option';
import styles from './Option.module.scss';
import InlineStack from "../../InlineStack";
import type { InlineStackProps } from "../../InlineStack";
import PolarisCheckbox from "../../Checkbox";
import Icon from "../../Icon";
import { CheckIcon } from "@ncpl/ncpl-icons";
import { classNames, variationName } from "@ncpl-polaris/utils"
import type { Alignment } from "../types"

defineOptions({
  name: 'NpOptionListOption',
})
const emit = defineEmits(['pointerEnter', 'click', 'focus'])
const props = defineProps<OptionListOptionProps>()
const focused = ref();

const handleFocus = () => {
  focused.value = true;
  emit('focus', props.section, props.index);
};

const handlePointerEnter = () => {
  if (props.disabled) {
    return;
  }

  emit('pointerEnter', props.section, props.index);
};

const handleClick = () => {
  if (props.disabled) {
    return;
  }

  emit('click', props.section, props.index);
};

function verticalAlignToBlockAlign(
  verticalAlign?: Alignment,
): InlineStackProps['blockAlign'] {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}
</script>
