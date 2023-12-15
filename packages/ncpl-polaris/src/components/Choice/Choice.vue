<template>
  <ConditionalWrapper :condition="Boolean(helpText || hasError)">
    <template #wrapper="{ children }">
      <div>
        <component :is="children"></component>
        <div :class="styles.Descriptions">
          <div v-if="hasError" :class="styles.Error">
            <InlineError :message="error!" :field-id="id" />
          </div>
          <div v-if="helpText" ;class="styles.HelpText" :id="helpTextID(id)">
            <Text as="span" :tone="disabled ? undefined : 'subdued'">
              {{ helpText }}
            </Text>
          </div>
        </div>
      </div>
    </template>
    <label :class="className" :htmlFor="id" @click="e => $emit('click', e)" :style="sanitizeCustomProperties(labelStyle)">
      <span :class="styles.Control">
        <slot></slot>
      </span>
      <span :class="styles.Label">
        <span>
          <component :is="()=>label"></component>
        </span>
      </span>
    </label>
  </ConditionalWrapper>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ChoiceProps } from './Choice';
import { helpTextID } from './utils';
import ConditionalWrapper from '../ConditionalWrapper';
import styles from './Choice.module.scss';
import Text from "../Text";
import InlineError from "../InlineError";
import { classNames, getResponsiveProps, getResponsiveValue, sanitizeCustomProperties } from "@ncpl-polaris/utils";

defineOptions({
  name: 'NpChoice',
})
const props = defineProps<ChoiceProps>()
const emit = defineEmits(['click']);

const className = computed(() => classNames(
  styles.Choice,
  props.labelHidden && styles.labelHidden,
  props.disabled && styles.disabled,
  props.labelClassName,
));
const hasError = computed(() => props.error && typeof props.error !== 'boolean')

const labelStyle = computed(() => {
  const { bleedBlockEnd, bleed, bleedBlockStart, bleedInlineStart, bleedInlineEnd, fill } = props;
  return {
    // Pass through overrides for bleed values if they're set by the prop
    ...getResponsiveProps(
      'choice',
      'bleed-block-end',
      'space',
      bleedBlockEnd || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-block-start',
      'space',
      bleedBlockStart || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-inline-start',
      'space',
      bleedInlineStart || bleed,
    ),
    ...getResponsiveProps(
      'choice',
      'bleed-inline-end',
      'space',
      bleedInlineEnd || bleed,
    ),
    ...Object.fromEntries(
      Object.entries(getResponsiveValue('choice', 'fill', fill)).map(
        // Map "true" => "100%" and "false" => "auto" for use in
        // inline/block-size calc()
        ([key, value]) => [key, value ? '100%' : 'auto'],
      ),
    ),
  }
});


</script>
