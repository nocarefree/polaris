<template>
  <component :is="node">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed, h, useSlots } from 'vue'
import type { BoxProps } from './Box'
import styles from './Box.module.scss'
import { classNames, getResponsiveProps } from '@ncpl-polaris/utils';

defineOptions({
  name: 'NpBox',
})
const props = withDefaults(defineProps<BoxProps>(), { as: 'div' });

const slots = useSlots();

const node = computed(() => {
  return () => h(props.as, {
    class: classNames(
      styles.Box,
      props.visuallyHidden && styles.visuallyHidden,
      props.printHidden && styles.printHidden,
      props.as === 'ul' && styles.listReset),
    style: _style.value
  }, slots)
})

const _style = computed(() => {
  const {
    background,
    borderColor,
    borderStyle,
    borderWidth,
    borderBlockStartWidth,
    borderBlockEndWidth,
    borderInlineStartWidth,
    borderInlineEndWidth,
    borderRadius,
    borderEndStartRadius,
    borderEndEndRadius,
    borderStartStartRadius,
    borderStartEndRadius,
    color,
    minHeight,
    minWidth,
    maxWidth,
    overflowX,
    overflowY,
    outlineColor,
    outlineStyle,
    outlineWidth,
    padding,
    paddingBlock,
    paddingBlockStart,
    paddingBlockEnd,
    paddingInline,
    paddingInlineStart,
    paddingInlineEnd,
    shadow,
    width,
    position,
    insetBlockStart,
    insetBlockEnd,
    insetInlineStart,
    insetInlineEnd,
    opacity,
    zIndex
  } = props;

  const borderStyleValue = borderStyle
    ? borderStyle
    : borderColor ||
      borderWidth ||
      borderBlockStartWidth ||
      borderBlockEndWidth ||
      borderInlineStartWidth ||
      borderInlineEndWidth
      ? 'solid'
      : undefined;

  // eslint-disable-next-line no-nested-ternary
  const outlineStyleValue = outlineStyle
    ? outlineStyle
    : outlineColor || outlineWidth
      ? 'solid'
      : undefined;

  return {
    '--pc-box-color': color ? `var(--p-color-${color})` : undefined,
      '--pc-box-background': background
        ? `var(--p-color-${background})`
        : undefined,
      // eslint-disable-next-line no-nested-ternary
      '--pc-box-border-color': borderColor
        ? borderColor === 'transparent'
          ? 'transparent'
          : `var(--p-color-${borderColor})`
        : undefined,
      '--pc-box-border-style': borderStyleValue,
      '--pc-box-border-radius': borderRadius
        ? `var(--p-border-radius-${borderRadius})`
        : undefined,
      '--pc-box-border-end-start-radius': borderEndStartRadius
        ? `var(--p-border-radius-${borderEndStartRadius})`
        : undefined,
      '--pc-box-border-end-end-radius': borderEndEndRadius
        ? `var(--p-border-radius-${borderEndEndRadius})`
        : undefined,
      '--pc-box-border-start-start-radius': borderStartStartRadius
        ? `var(--p-border-radius-${borderStartStartRadius})`
        : undefined,
      '--pc-box-border-start-end-radius': borderStartEndRadius
        ? `var(--p-border-radius-${borderStartEndRadius})`
        : undefined,
      '--pc-box-border-width': borderWidth
        ? `var(--p-border-width-${borderWidth})`
        : undefined,
      '--pc-box-border-block-start-width': borderBlockStartWidth
        ? `var(--p-border-width-${borderBlockStartWidth})`
        : undefined,
      '--pc-box-border-block-end-width': borderBlockEndWidth
        ? `var(--p-border-width-${borderBlockEndWidth})`
        : undefined,
      '--pc-box-border-inline-start-width': borderInlineStartWidth
        ? `var(--p-border-width-${borderInlineStartWidth})`
        : undefined,
      '--pc-box-border-inline-end-width': borderInlineEndWidth
        ? `var(--p-border-width-${borderInlineEndWidth})`
        : undefined,
      '--pc-box-min-height': minHeight,
      '--pc-box-min-width': minWidth,
      '--pc-box-max-width': maxWidth,
      '--pc-box-outline-color': outlineColor
        ? `var(--p-color-${outlineColor})`
        : undefined,
      '--pc-box-outline-style': outlineStyleValue,
      '--pc-box-outline-width': outlineWidth
        ? `var(--p-border-width-${outlineWidth})`
        : undefined,
      '--pc-box-overflow-x': overflowX,
      '--pc-box-overflow-y': overflowY,
      ...getResponsiveProps(
        'box',
        'padding-block-start',
        'space',
        paddingBlockStart || paddingBlock || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-block-end',
        'space',
        paddingBlockEnd || paddingBlock || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-start',
        'space',
        paddingInlineStart || paddingInline || padding,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-end',
        'space',
        paddingInlineEnd || paddingInline || padding,
      ),
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width,
      position,
      '--pc-box-inset-block-start': insetBlockStart
        ? `var(--p-space-${insetBlockStart})`
        : undefined,
      '--pc-box-inset-block-end': insetBlockEnd
        ? `var(--p-space-${insetBlockEnd})`
        : undefined,
      '--pc-box-inset-inline-start': insetInlineStart
        ? `var(--p-space-${insetInlineStart})`
        : undefined,
      '--pc-box-inset-inline-end': insetInlineEnd
        ? `var(--p-space-${insetInlineEnd})`
        : undefined,
      zIndex,
      opacity,
  }
})
</script>
