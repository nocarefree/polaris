<template>
  <NpCard padding="200" rounded-above="sm">
    <div>
      <div :class="styles.metricsButtonContainer">
        <div :class="styles.metricButtonStack">
          <NpInlineStack :wrap="false" gap="050">
            <MetricsButton v-for="(card, index) in cards" :card="card" :selected="expanded && selected == index"
              :items="[]" @click="onMetricClick(index)">
            </MetricsButton>
          </NpInlineStack>
        </div>
        <div :class="classNames(styles.expandButton, shadow && styles.shadow)">
          <NpIcon :icon="expanded ? ChevronUpIcon : ChevronDownIcon" size="slim" @click="expanded = !expanded"
            :aria-expanded="expanded" aria-controls="home-metrics-collapsible-section" accessibility-label="" role="tab"
            variant="tertiary"></NpIcon>
        </div>
      </div>
      <div :class="classNames(styles.MetricCardContainer, metricsLoading && styles.loading)">
        <div :class="classNames(styles.EmptyState, styles[selectedCard.visualization.chartType])">
          <NpBlockStack inline-align="center">
            <NpText as="h2" variant="headingMd">此日期范围内没有转化</NpText>
            <NpText as="p" variant="bodyMd" tone="subdued">请尝试选择不同的日期范围或渠道</NpText>
          </NpBlockStack>
        </div>
      </div>
    </div>
  </NpCard>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { NpBlockStack, NpCard, NpInlineStack, classNames } from "@ncpl/ncpl-polaris"
import styles from "../../HomePage.module.scss";
import { metrics } from "../../../context";
import { MetricsButton } from "../"
import { ChevronUpIcon, ChevronDownIcon } from "@ncpl/ncpl-icons";

const selected = ref<number>(0);
const shadow = ref(false);
const expanded = ref(false);



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
  metricsLoading,
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
    visualization: R.visualization,
    primaryMetricOptions: R.overridePrimaryMetric ?? R.metricValue,
    overrideMeta: R.overrideMeta,
    data: G(R.handle),
    reportingPeriod: primaryRange,
    comparisonPeriod: I,
    handle: R.handle
  }))
});

const selectedCard = computed(() => {
  return cards.value[selected.value];
})

const G = (R: any) => {
  return metricsLoading ? [
    {
      data: [],
      isLoading: !0,
      isError: !1
    }
  ] : T[R]
}

const onMetricClick = (index: number) => {
  selected.value = index;
  expanded.value = true;
}
</script>
