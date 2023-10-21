<template>
  <PositionedOverlay v-if="active" :active="active" :activator="activator" :prevent-interaction="preventInteraction"
    :preferred-position="preferredPosition" :z-index-override="zIndexOverride">
    <template #default="overlayDetails">
      <div :style="containerStyle(overlayDetails.chevronOffset)" :class="containerClassName(overlayDetails)"
        v-bind="layer.props">
        <svg :classe="styles.Tail" width="19" height="11" fill="none">
          <template v-if="overlayDetails.positioning === 'above'">
            <path
              d="M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z"
              fill="#E3E3E3" />
            <path d="M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z" fill="var(--p-color-bg)" />
          </template>
          <template v-else>
            <path d="m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z"
              fill="#D4D4D4" />
            <path d="M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z" fill="var(--p-color-bg)" />
          </template>
        </svg>

        <div :id="id" role="tooltip" :class="contentClassName" :style="contentStyle(overlayDetails)" :aria-label="accessibilityLabel ? i18n.translate('Polaris.TooltipOverlay.accessibilityLabel', { label: accessibilityLabel, }) :
          undefined">
          <slot></slot>
        </div>
      </div>
    </template>
  </PositionedOverlay>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { TooltipOverlayProps } from './TooltipOverlay'
import { useI18n } from '../../context';
import { layer } from '../../shared';
import type { OverlayDetails } from "@ncpl-polaris/components/PositionedOverlay"
import PositionedOverlay from "@ncpl-polaris/components/PositionedOverlay"
import { classNames } from "@ncpl-polaris/utils";
import styles from './TooltipOverlay.module.scss'


defineOptions({
  name: 'NpTooltip',
})
const props = defineProps<TooltipOverlayProps>()

const i18n = useI18n();

const containerStyle = (chevronOffset: number) => {
  const { borderRadius, padding } = props
  return {
    '--pc-tooltip-chevron-x-pos': `${chevronOffset}px`,
    '--pc-tooltip-border-radius': borderRadius
      ? `var(--p-border-radius-${borderRadius})`
      : undefined,
    '--pc-tooltip-padding':
      padding && padding === 'default'
        ? 'var(--p-space-100) var(--p-space-200)'
        : `var(--p-space-${padding})`,
  }
};


const containerClassName = ({ measuring, positioning }: OverlayDetails) => {
  return classNames(
    styles.TooltipOverlay,
    measuring && styles.measuring,
    !measuring && styles.measured,
    props.instant && styles.instant,
    positioning === 'above' && styles.positionedAbove,
  )
}

const contentStyle = ({ measuring, desiredHeight, chevronOffset }: OverlayDetails) => {
  let style = measuring ? undefined : { minHeight: desiredHeight };
  return {
    ...containerStyle(chevronOffset),
    ...style,
  }
}

const contentClassName = computed(() => {
  return classNames(styles.Content, props.width && styles[props.width]);
})
</script>
