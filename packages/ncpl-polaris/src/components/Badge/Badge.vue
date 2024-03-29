<template>
  <span :class="className">
    <template v-if="progress && !icon">
      <span :class="styles.Icon">
        <Icon :accessibility-label="accessibilityLabel" :source="progressIconMap[progress]" />
      </span>
    </template>
    <Text v-else-if="accessibilityLabel" as="span" visually-hidden>
      {{ accessibilityLabel }}
    </Text>

    <span v-if="icon" :class="styles.Icon">
      <Icon :source="icon" />
    </span>

    <Text v-if="$slots.default" as="span" variant="bodySm" :font-weight="tone === 'new' ? 'medium' : undefined">
      <slot></slot>
    </Text>
  </span>
</template>
<script setup lang="ts">
import { computed, unref, h } from 'vue'
import type { BadgeProps } from './Badge'
import Text from '../Text';
import Icon from '../Icon';
import styles from './Badge.module.scss'
import { classNames, variationName } from '../../utils';
import { useI18n, useWithinFilter } from "../context";
import { getDefaultAccessibilityLabel } from "./utils"

const DEFAULT_SIZE = 'medium';

defineOptions({
  name: 'NpBadge',
})
const props = withDefaults(defineProps<BadgeProps>(), {
  size: DEFAULT_SIZE
});
const i18n = useI18n();
const withinFilter = useWithinFilter();

const className = computed(() => {
  const { tone, size } = props;
  return classNames(
    styles.Badge,
    tone && styles[variationName('tone', tone)],
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    unref(withinFilter) && styles.withinFilter,
  )
})

const accessibilityLabel = computed(
  () => props.statusAndProgressLabelOverride
    ? props.statusAndProgressLabelOverride
    : getDefaultAccessibilityLabel(i18n.value, props.progress, props.tone)
);

const progressIconMap = {
  complete: () => h('svg', {
    viewBox: "0 0 20 20",
    innerHTML: `<path d="M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z" />`

  }),
  partiallyComplete: () => h('svg', {
    viewBox: "0 0 20 20",
    innerHTML: `<path fill-rule="evenodd" d="m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"></path>`
  }),
  incomplete: () => h('svg', {
    viewBox: "0 0 20 20",
    innerHTML: `<path
        fill-rule="evenodd"
        d="M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
      />`

  }),
}


</script>
