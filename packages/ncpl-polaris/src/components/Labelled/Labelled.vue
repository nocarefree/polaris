<template>
  <div :class="classNames(
    labelHidden && styles.hidden,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
  )">
    <div v-if="label || $slots.label" :class="styles.LabelWrapper">
      <Label :id="id" :required-indicator="requiredIndicator" :hidden="false">
        <template v-if="typeof label == 'string'">{{ label }}</template>
        <component v-else="label" :is="label"></component>
        <slot v-else name="label"></slot>
      </Label>
      <component :is="actionComponent"></component>
    </div>
    <slot></slot>
    <div v-if="error && (typeof error !== 'boolean')" :class="styles.Error">
      <InlineError :message="error" :field-id="id" />
    </div>
    <div v-if="helpText || $slots.helpText" :class="styles.HelpText" :id="helpTextID(id)" :aria-disabled="disabled">
      <Text as="span" tone="subdued" breakWord>
        <component v-if="helpText" :is="() => [helpText]"></component>
        <slot v-else name="helpText"></slot>
      </Text>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { type LabelledProps, helpTextID } from './Labelled'
import styles from './Labelled.module.scss'
import { buttonFrom } from '../Button/utils';
import InlineError from '../InlineError';
import Label from '../Label';
import Text from '../Text';
import { classNames } from '../../utils';

defineOptions({
  name: 'NpLabelled',
})
const props = defineProps<LabelledProps>()

const actionComponent = computed(() => {
  return () => props.action ? h('div', { class: styles.Action }, [buttonFrom(props.action, { variant: 'plain' })]) : null
})

</script>
