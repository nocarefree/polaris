<template>
  <div :class="classNames(styles.metricsButton, styles.metricsButtonWidth, selected && styles.metricButtonSelected)"
    role="button" tabindex="0" @click="$emit('click')">
    <NpBox :background="selected ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
      border-radius="200">
      <CompactPrimaryMetricSkeleton v-if="loading" :has-title="Boolean(card.card.title)" :type="card.card.type"
        :wrapper="card.card.wrapper" />
      <MetricCard v-else v-bind="card.card" :primary-metric="primaryMetric">
        <template #primaryAction>
          <MetricEditButton :active-handle="card.card.handle"></MetricEditButton>
        </template>
      </MetricCard>
    </NpBox>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

import { NpBox, classNames } from "@ncpl/ncpl-polaris";
import { MetricCard } from "../../../MetricCard";
import { MetricEditButton } from "../";
import styles from "../../HomePage.module.scss";
import { CompactPrimaryMetricSkeleton } from "../../../CompactPrimaryMetricSkeleton"

const props = defineProps<{
  selected?: boolean;
  metricsLoading?: boolean;
  card: {
    data: any[];
    card: any;
    primaryMetricConfig: any;
  };
}>()

defineEmits(['click']);
const loading = ref(false)

const primaryMetric = computed(() => {
  props.card.primaryMetricConfig
  return {
    value: '',
  }
})


</script>
<style module></style>