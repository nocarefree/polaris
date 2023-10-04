<template>
  <div :class="classNames(
    styles.Section,
    flush && styles['Section-flush'],
    subdued && styles['Section-subdued'],
    fullWidth && styles['Section-fullWidth'],
    hideOnPrint && styles['Section-hideOnPrint'],
  )">
    <component v-if="titleAreaMarkup" :is="titleAreaMarkup"></component>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { h, useSlots, computed } from 'vue';
import type { LegacyCardSectionProps } from "./Section"
import Text from "@ncpl-polaris/components/Text";
import LegacyStack from "@ncpl-polaris/components/LegacyStack";
import ButtonGroup from "@ncpl-polaris/components/ButtonGroup";
import Button from "@ncpl-polaris/components/Button";
import LegacyStackItem from "@ncpl-polaris/components/LegacyStack/Item";
import styles from '../LegacyCard.module.scss';
import { classNames } from '@ncpl-polaris/utils';
import { useFeatures } from "../../context";



const { polarisSummerEditions2023 } = useFeatures();


const props = defineProps<LegacyCardSectionProps>();
const slots = useSlots();

const titleAreaMarkup = computed(() => {
  const { actions } = props
  const actionMarkup = actions ?
    h(
      ButtonGroup, {},
      {
        defalult: () => actions.map(({ content, onAction, ...action }, key) => {
          return h(Button, { key, onClick: onAction, ...action, plain: true }, content)
        })
      }
    ) : null;

  const titleMarkup = props.title || slots.title ?
    props.title ?
      h(Text, { variant: polarisSummerEditions2023 ? 'headingSm' : 'headingMd', as: 'h3' }, { default: () => props.title }) :
      slots.title?.()
    : null;

  return titleMarkup || actionMarkup ?
    () => h('div', { class: styles.SectionHeader },
      [
        actionMarkup ? h(LegacyStack, { alignment: "baseline" }, [h(LegacyStackItem, { fill: true }, { default: () => titleMarkup }), actionMarkup]) :
          titleMarkup
      ]
    ) : null;
})
</script>