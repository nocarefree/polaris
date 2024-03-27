<template>
  <div :class="smDown ? $style.metricsControllerPadding : void 0">
    <div style="margin-top: var(--pc-stack-spacing);">
      <AnalyticsDateControls :initial-state="initialState"></AnalyticsDateControls>
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
