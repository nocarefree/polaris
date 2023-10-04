<template>
  <div :class="styles.Header">
    <component v-if="headingMarkup" :is="headingMarkup"></component>
  </div>
</template>
<script setup lang="ts">
import { h, useSlots, computed } from 'vue';
import type { LegacyCardHeaderProps } from "./Header"
import Text from "@ncpl-polaris/components/Text";
import HorizontalStack from "@ncpl-polaris/components/HorizontalStack";
import LegacyStack from "@ncpl-polaris/components/LegacyStack";
import LegacyStackItem from "@ncpl-polaris/components/LegacyStack/Item/Item.vue";
import styles from '../LegacyCard.module.scss';

import { useFeatures } from "../../context";



const { polarisSummerEditions2023 } = useFeatures();


const props = defineProps<LegacyCardHeaderProps>();
defineSlots<{
  default(): any,
  title(): any
}>()
const slots = useSlots();

const titleMarkup = computed(() => {
  return props.title ?
    () => h(Text, { variant: polarisSummerEditions2023 ? 'headingSm' : 'headingMd', as: 'h2' }, { default: () => props.title }) : null
});

const headingMarkup = computed(() => {
  return slots.actionMarkup || slots.default ?
    polarisSummerEditions2023 ?
      () => h(HorizontalStack, { wrap: false, gap: "2", align: "space-between", blockAlign: "center" }, {
        default: () => [
          titleMarkup.value?.(),
          h(HorizontalStack, { wrap: false, gap: "4", blockAlign: "center" }, [slots.actionMarkup?.(), slots.default?.()])
        ]
      })
      :
      () => h(LegacyStack, { alignment: "baseline" }, [
        h(LegacyStackItem, { fill: true }, {
          default: titleMarkup.value
        }),
        slots.actionMarkup?.(),
        slots.default?.()
      ])
    : titleMarkup.value
})
</script>