<template>
  <div :class="classNames(styles.pencilContainer, opened && styles.listOpen)">
    <NpPopover v-model:active="opened">
      <template #activator>
        <NpButton size="slim" variant="tertiary" :icon="EditIcon" @click="opened = !opened"
          :accessibility-label="i18n.translate('MetricsSection.editMetric')" />
      </template>

      <div :class="styles.metricEditButtonPopOverContainer">
        <NpActionList :items="items" :allow-filtering="true"></NpActionList>
      </div>
    </NpPopover>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { NpPopover, NpButton, NpActionList, NpIcon, classNames } from "@ncpl/ncpl-polaris";
import styles from "../../HomePage.module.scss";
import { useCommon, metrics } from "../../../context";
import { EditIcon, ChartLineIcon, ChartHorizontalIcon, DataTableIcon, ChartCohortIcon, ChartDonutIcon, ChartStackedIcon, ChartVerticalIcon } from "@ncpl/ncpl-icons";
import { InfoPopover, InfoPopoverHandle } from '../';

const props = defineProps<{ activeHandle?: string }>();
const emit = defineEmits(['change']);

const opened = ref(false)
const { i18n } = useCommon();
const popoverHandle = ref<string | null>(null)


const getIcon = (e: string) => {
  switch (e) {
    case 'line':
    case 'sparkline':
    case 'stackedArea':
      return ChartLineIcon;
    case 'compactHorizontalBar':
    case 'simpleHorizontalBar':
    case 'dynamicBar':
    case 'bar':
      return ChartHorizontalIcon;
    case 'dataTable':
      return DataTableIcon;
    case 'cohorts':
      return ChartCohortIcon;
    case 'donut':
      return ChartDonutIcon;
    case 'simpleNormalized':
      return ChartStackedIcon;
    default:
      return ChartVerticalIcon;
  }
}

const items = computed(() => {
  return metrics.filter((i: any) => i.report.ignoreDatePicker == false).map((p: any) => {
    var C: any, g: any, b: any;
    return {
      content: p.title,
      active: p.handle === props.activeHandle,
      truncate: !0,
      prefix: h(
        'div',
        {
          class: styles.prefixContainer,
        },
        [
          h(
            NpIcon,
            {
              source: getIcon((
                (g = (C = p.overrideMeta) == null ? void 0 : C.visualization) == null ? void 0 : g.chartType
              ) ?? ((b = p.visualization) == null ? void 0 : b.chartType))
            }
          ),
          h(
            InfoPopover,
            {
              active: p.handle === popoverHandle.value,
              content: p.popover
            }
          )
        ]
      ),
      suffix: h(
        InfoPopoverHandle,
        {
          id: p.handle,
          'onUpdate:active': (e: string) => popoverHandle.value = e,
          active: p.handle === popoverHandle.value
        }
      ),
      onAction: () => {
        p.handle !== props.activeHandle && emit('change', p.handle)
      }
    }
  })
})
</script>
