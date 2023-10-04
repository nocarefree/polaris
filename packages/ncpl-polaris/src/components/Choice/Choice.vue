<template>
  <div v-if="slots.helpText || error">
    <component :is="labelMarkup"></component>
    <div :class="styles.Descriptions">
      <div v-if="error && (typeof error !== 'boolean')" :className="styles.Error">
        <InlineError :message="error" :field-id="id" />
      </div>
      <div v-if="slots.helpText" :className="styles.HelpText" :id="helpTextID(id)">
        <Text as="span" :color="disabled && polarisSummerEditions2023 ? undefined : 'subdued'">
          <slot name="helpText"></slot>
        </Text>
      </div>
    </div>
  </div>
  <component v-else :is="labelMarkup"></component>
</template>
<script setup lang="ts">
import { computed, h, useSlots } from 'vue'
import type { ChoiceProps } from './Choice'
import { helpTextID } from './Choice'
import styles from './Choice.module.scss'
import Text from "../Text"
import InlineError from "../InlineError"
import { useFeatures } from "../context"
import { classNames, getResponsiveProps, getResponsiveValue, sanitizeCustomProperties } from "@ncpl-polaris/utils";

defineOptions({
  name: 'NpChoice',
})
const props = defineProps<ChoiceProps>()
const emit = defineEmits(['click']);
const slots = useSlots();
const { polarisSummerEditions2023 } = useFeatures();

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

const labelMarkup = computed(() => {
  const { labelHidden, disabled, labelClassName, id } = props;
  return () => h('label', {
    class: classNames(
      styles.Choice,
      labelHidden && styles.labelHidden,
      disabled && styles.disabled,
      labelClassName,
    ),
    htmlFor: id,
    onClick: (e: any) => emit('click', e),
    style: sanitizeCustomProperties(labelStyle.value),
  }, [
    h('span', { class: styles.Control }, slots.default?.()),
    h('span', { class: styles.Label }, [h('span', {}, slots.label?.())]),
  ])
})

</script>
