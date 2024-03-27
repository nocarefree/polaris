<template>
  <NpCard padding="200" rounded-above="sm">
    <div>
      <div :class="styles.metricsButtonContainer">
        <div :class="styles.metricButtonStack">
          <NpInlineStack :wrap="false" gap="050">
            <MetricsButton v-for="card in cards" :card="card" :items="[]"></MetricsButton>
          </NpInlineStack>
        </div>
      </div>
    </div>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { NpCard, NpInlineStack } from "@ncpl/ncpl-polaris"
import styles from "../../HomePage.module.scss";
import { metrics } from "../../../context";

const selected = ref(0);


const {
  dateControls: {
    primaryRange,
    comparisonRange: I,
    selectedRangePreset: y
  },
  channelsData: {
    channelsLoading: v,
    activeChannel: L
  },
  metricCardResponses: T,
  metricsLoading: F,
  visibleMetrics: w
} = ((): any => ({}))();

const cards = computed(() => {
  return [metrics[0], metrics[1], metrics[2], metrics[3]].map((R: any) => ({
    card: {
      type: 'compact',
      title: R.title,
      popover: R.popover,
      wrapper: "none"
    },
    primaryMetricOptions: R.overridePrimaryMetric ?? R.metricValue,
    overrideMeta: R.overrideMeta,
    data: G(R.handle),
    reportingPeriod: primaryRange,
    comparisonPeriod: I,
    handle: R.handle
  }))
});

const G = (R: any) => {
  F ? [
    {
      data: [],
      isLoading: !0,
      isError: !1
    }
  ] : T[R]
}
</script>
