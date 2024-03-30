<template>
  <MetricLayout :wrapper="wrapper" :type="type">
    <template #title>
      <Title :title="title" :popover="popover"></Title>
    </template>
    <template v-if="$slots.primaryAction" #primaryAction>
      <slot name="primaryAction"></slot>
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <PrimaryMetric v-if="primaryMetric" :value="primaryMetric.value" :tooltip="primaryMetric.tooltip"
      :disabled="disabled" :type="type" :trend-indicator="_trendIndicator"></PrimaryMetric>
    <div v-if="visualization" :class="styles.VisualizationWrapper">
      <Visualization :visualization="visualization"></Visualization>
    </div>
  </MetricLayout>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Title from "./components/Title";
import MetricLayout from "../MetricLayout";
import PrimaryMetric from "./components/PrimaryMetric";
import Visualization from "./components/Visualization";
import styles from "./MetricCard.module.scss";

const props = withDefaults(defineProps<{
  title: string;
  popover?: {
    formula?: string;
    definition?: string;
  },
  type: string;
  wrapper?: 'card';
  disabled?: boolean;
  primaryMetric?: {
    value: string;
    tooltip?: any;
    trendIndicator?: any;
  },
  visualization?: any;
}>(), {
  type: 'full',
  wrapper: 'card',
  disabled: !1,
});

const _trendIndicator = computed(() => {
  const { trendIndicator } = props.primaryMetric || {};
  return {
    trend: trendIndicator?.isNeutral ? 'neutral' : void 0,
  }
})
</script>
