<template>
  <div :class="classNames(styles.metricsButton, styles.metricsButtonWidth, selected && styles.metricButtonSelected)"
    role="button" tabindex="0" @click="$emit('click')">
    <NpBox :background="selected ? 'bg' : 'bg-surface'" padding="300" padding-block-start="150" padding-block-end="150"
      border-radius="200">
      <CompactPrimaryMetricSkeleton v-if="loading" :has-title="Boolean(card.card.title)" :type="card.card.type"
        :wrapper="card.card.wrapper" />
      <MetricCard v-else-if="card.data" v-bind="card" empty-state-text="—">
        <template #primaryAction>
          <MetricEditButton></MetricEditButton>
        </template>
      </MetricCard>
    </NpBox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { NpBox, classNames } from "@ncpl/ncpl-polaris";
import { MetricCard } from "../../../MetricCard";
import { MetricEditButton } from "../";
import styles from "../../HomePage.module.scss";

defineProps<{
  selected?: boolean;
  metricsLoading?: boolean;
  card: {
    data: any[];
    card: any
  };
}>()

defineEmits(['click']);
const loading = ref(false)


</script>
<style module></style>