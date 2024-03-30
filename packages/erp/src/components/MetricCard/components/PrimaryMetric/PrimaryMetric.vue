<template>
  <div :class="styles.FlexWrapper">
    <div v-if="value" :class="styles.PrimaryMetricWrapper">
      <NpTooltip v-if="tooltip" v-bind="tooltip">
        <p :class="classNames(styles.PrimaryMetric, disabled && styles.Disabled, type === 'compact' && styles.Compact)">
          {{ value }}</p>
      </NpTooltip>
      <p v-else
        :class="classNames(styles.PrimaryMetric, disabled && styles.Disabled, type === 'compact' && styles.Compact)">
        {{ value }}</p>
    </div>
    <TrendIndicator v-bind="trendIndicator" />
  </div>
</template>
<script setup lang="ts">
import { NpTooltip, classNames, type TooltipProps } from "@ncpl/ncpl-polaris";
import styles from "../../MetricCard.module.scss";
import TrendIndicator from "../../../TrendIndicator";

withDefaults(defineProps<{
  value?: string;
  type?: string;
  tooltip?: TooltipProps;
  disabled?: boolean;
  trendIndicator?: any;
}>(), {
  type: 'full'
})
</script>
