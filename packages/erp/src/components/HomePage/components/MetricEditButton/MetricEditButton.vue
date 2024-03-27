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

const props = defineProps<{ activeHandle?: string }>();

const opened = ref(false)
const { i18n } = useCommon();


const F2 = ({
  chartType: e
}) => {
  let icon;
  switch (e) {
    case 'line':
    case 'sparkline':
    case 'stackedArea':
      icon = ChartLineIcon;
      break;
    case 'compactHorizontalBar':
    case 'simpleHorizontalBar':
    case 'dynamicBar':
    case 'bar':
      icon = ChartHorizontalIcon;
      break;
    case 'dataTable':
      icon = DataTableIcon;
      break;
    case 'cohorts':
      icon = ChartCohortIcon;
      break;
    case 'donut':
      icon = ChartDonutIcon;
      break;
    case 'simpleNormalized':
      icon = ChartStackedIcon;
      break;
    default:
      icon = ChartVerticalIcon;
      break;
  }
  return h(NpIcon, { source: icon })
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
          className: styles.prefixContainer,
          children: [
            h(
              F2,
              {
                chartType: (
                  (g = (C = p.overrideMeta) == null ? void 0 : C.visualization) == null ? void 0 : g.chartType
                ) ?? ((b = p.visualization) == null ? void 0 : b.chartType)
              }
            ),
            h(
              k2,
              {
                infoPopoverActive: p.handle === o,
                infoPopoverContent: p.popover
              }
            )
          ]
        }
      ),
      suffix: h(
        v2,
        {
          id: p.handle,
          onInfoActive: r,
          infoPopoverActive: p.handle === o
        }
      ),
      onAction: () => {
        p.handle !== e && t(p.handle), i()
      }
    }
  })
})
</script>
