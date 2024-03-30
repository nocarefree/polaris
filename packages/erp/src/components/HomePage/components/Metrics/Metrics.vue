<template>
  <NpCard padding="200" rounded-above="sm">
    <div>
      <div :class="styles.metricsButtonContainer">
        <div :class="styles.metricButtonStack">
          <NpInlineStack :wrap="false" gap="050">
            <MetricsButton v-for="(card, index) in cards" :card="card" :selected="expanded && selected == index"
              @click="onMetricClick(index)">
            </MetricsButton>
          </NpInlineStack>
        </div>
        <div :class="classNames(styles.expandButton, shadow && styles.shadow)">
          <NpIcon :source="expanded ? ChevronUpIcon : ChevronDownIcon" size="slim" @click="expanded = !expanded"
            :aria-expanded="expanded" aria-controls="home-metrics-collapsible-section" accessibility-label="" role="tab"
            variant="tertiary"></NpIcon>
        </div>
      </div>
      <div v-if="expanded" :class="classNames(styles.MetricCardContainer, metricsLoading && styles.loading)">
        <div :class="classNames(styles.EmptyState, styles[selectedChartType])">
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
import { NpBlockStack, NpCard, NpInlineStack, NpIcon, NpText, classNames } from "@ncpl/ncpl-polaris"
import styles from "../../HomePage.module.scss";
import { MetricsButton } from "../MetricsButton"
import { ChevronUpIcon, ChevronDownIcon } from "@ncpl/ncpl-icons";
import { useAnalytics } from "../../stores";

const selected = ref<number>(0);
const shadow = ref(false);
const expanded = ref(true);


const {
  dateControls: {
    primaryRange,
    comparisonRange,
  },
  metricCardResponses,
  metricsLoading,
  visibleMetrics
}: any = useAnalytics();

const cards = computed(() => {
  return [visibleMetrics[0], visibleMetrics[1], visibleMetrics[3], visibleMetrics[4]].map((R: any) => ({
    card: {
      type: 'compact',
      title: R.title,
      popover: R.popover,
      wrapper: "none"
    },
    visualization: R.visualization,
    primaryMetricConfig: R.overridePrimaryMetric ?? R.primaryMetricConfig,
    overrideMeta: R.overrideMeta,
    data: G(R.handle),
    reportingPeriod: primaryRange,
    comparisonPeriod: comparisonRange,
    handle: R.handle
  }))
});

const selectedCard = computed(() => {
  return cards.value[selected.value];
})

const selectedChartType = computed(() => {
  return selectedCard.value.visualization.vizType?.toLowerCase();
})

const G = (R: string) => {
  return metricsLoading ? [
    {
      data: [],
      isLoading: !0,
      isError: !1
    }
  ] : metricCardResponses.visibleMetricsQueryData[R]
}

const onMetricClick = (index: number) => {
  selected.value = index;
  expanded.value = true;
}
</script>
