<template>
  <div :class="styles.FlexWrapper">
    <div :class="styles.PrimaryMetricWrapper">
      <NpTooltip v-if="tooltip" v-bind="tooltip">
        <p :class="classNames(styles.PrimaryMetric, disabled && styles.Disabled, type === 'compact' && styles.Compact)">
          {{ value }}</p>
      </NpTooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NpTooltip, classNames, type TooltipProps } from "@ncpl/ncpl-polaris";
import styles from "../../MetricCard.module.scss";

withDefaults(defineProps<{
  value: string;
  type?: string;
  tooltip?: TooltipProps;
  disabled?: boolean;
}>(), {
  type: 'full'
})
</script>
