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

._EmptyState_16whr_1 {
  --empty-state-bg-height: 10.875rem;
  padding-top:var(--p-space-1600);
  height:var(--home-metric-card-container-height);
  background:no-repeat bottom center / 100% var(--empty-state-bg-height)
}
._EmptyState_16whr_1._line_16whr_7 {
  background-image:url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/line-D7elCgVj2dfy.svg)
}
._EmptyState_16whr_1._bar_16whr_11,
._EmptyState_16whr_1._dynamicBar_16whr_12,
._EmptyState_16whr_1._simpleHorizontalBar_16whr_13 {
  background-image:url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/bar-Dc-vNfGWGY3T.svg)
}
._EmptyState_16whr_1._table_16whr_17 {
  background:url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/table1-WXz7fno4lBBm.svg) no-repeat bottom left / auto var(--empty-state-bg-height),url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/table2-Bee8sJXnz01d.svg) no-repeat bottom center / 100% var(--empty-state-bg-height),url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/table3-BveFVDoWlrE8.svg) no-repeat bottom right / auto var(--empty-state-bg-height)
}
._EmptyState_16whr_1._cohorts_16whr_26 {
  background-image:url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/cohorts-CHG0Ery0nnQ0.svg)
}
._EmptyState_16whr_1._donut_16whr_30 {
  background:url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/donut1-Bt7pJUGQLWzG.svg) no-repeat 2.25rem 2.5625rem / 17.875rem 8.75rem,url(https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/zh-CN/assets/donut2-CC1QaTJVRaVF.svg) no-repeat 15rem 2.0625rem / calc(100% - 17.25rem) 10rem
}
</style>