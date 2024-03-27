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
    <div :class="$style.Message">
      <NpText variant="bodyMd" as="span" tone="subdued" alignment="center">{{ text }}</NpText>
    </div>
  </MetricLayout>
</template>
<script setup lang="ts">
import { computed } from "vue";
import Title from "./components/Title";
import MetricLayout from "../MetricLayout";
import { NpText } from "@ncpl/ncpl-polaris";
import { I18n } from "@ncpl/ncpl-polaris";


const Oe = '_Message_1vu2x_1',
  Pe = {
    Message: Oe
  },
  Ie = {
    noResults: 'There was no data found for this date range',
    noResultsCompact: 'No data available'
  },
  Fe = {
    MetricCardEmpty: Ie
  },
  ze = {
    noResults: '找不到此日期范围的数据',
    noResultsCompact: '没有可用数据'
  },
  He = {
    MetricCardEmpty: ze
  },
  Ve = {
    [
      Symbol.for('i18n-id')
    ]: 'MetricCardEmpty_1cea64g',
    en: Fe,
    'zh-CN': He
  };
const i18n = new I18n(He);

const props = withDefaults(defineProps<{
  emptyStateText: string;
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
  },
  visualization?: any;
}>(), {
  type: 'full',
  wrapper: 'card',
});

const text = computed(() => {
  return props.emptyStateText ? props.emptyStateText : props.type === 'compact' ? i18n.translate('MetricCardEmpty.noResultsCompact') : i18n.translate('MetricCardEmpty.noResults');;
});

</script>

<style module>
.Message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%
}
</style>