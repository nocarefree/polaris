<template>
  <div :class="classNames(styles.Container, renderGradient &&
    styles.GradientBackground, trendIndicator?.trend && styles[trendIndicator.trend])">
    <p :class="styles.Metric">{{ ` ${data} ` }}</p>
    <TrendIndicator v-if="trendIndicator" v-bind="trendIndicator"></TrendIndicator>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { classNames } from '@ncpl/ncpl-polaris/src';
import TrendIndicator from "../../../TrendIndicator";
import styles from "../../MetricCard.module.scss";

withDefaults(defineProps<{
  data: string;
  trendIndicator?: any;
  renderGradient?: boolean;
}>(), {
  renderGradient: true,
})
</script>
