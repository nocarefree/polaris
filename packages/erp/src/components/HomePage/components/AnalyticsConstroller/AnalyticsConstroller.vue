<template>
  <div :class="smDown ? styles.metricsControllerPadding : void 0">
    <div style="margin-top: calc(var(--p-space-400)*-1);">
      <AnalyticsDateControls :initial-state="initialState" :controls="initialState.controls"></AnalyticsDateControls>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AnalyticsDateControls from "../../../AnalyticsDateControls";
import { rangeDate } from "../../../AnalyticsDateControls/utils/analytics-date-range";
import styles from "../../HomePage.module.scss";
import { useBreakpoints } from '@ncpl/ncpl-polaris';

const initialState = ref({
  primaryRange: rangeDate({
    since: 'today',
    until: 'today',
    alias: 'today',
    timeZone: 'Asia/Shanghai',
  }),
  controls: ['primary'],
})

const { smDown } = useBreakpoints();
</script>
