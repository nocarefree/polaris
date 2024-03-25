<template>
    <NpPage>
        <div class="analyticsContainer">
            <NpBlockStack gap="400">
                <div :class="smDown ? $style.metricsControllerPadding : void 0">
                    <div style="margin-top: var(--pc-stack-spacing);">
                        <AnalyticsDateControls :initial-state="initialState"></AnalyticsDateControls>
                    </div>
                </div>
                <NpCard padding="200" rounded-above="sm">
                    <div>
                        <div :class="$style.metricsButtonContainer">
                            <div :class="$style.metricButtonStack">
                                <NpInlineStack>
                                    <MetricsButton v-for="button in buttons" :title="button.title" :items="[]">
                                    </MetricsButton>
                                </NpInlineStack>
                            </div>
                        </div>
                    </div>
                    <div :class="$style.MetricCardContainer">

                    </div>
                </NpCard>
            </NpBlockStack>
        </div>
    </NpPage>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NpBlockStack, NpPage, NpCard, NpInlineStack, useBreakpoints } from "@ncpl/ncpl-polaris";
import MetricsButton from "./MetricsButton";
import AnalyticsDateControls from "./AnalyticsDateControls/AnalyticsDateControls.vue";
import { rangeDate } from "./AnalyticsDateControls/utils/analytics-date-range";

const initialState = ref({
    primaryRange: rangeDate({
        since: 'today',
        until: 'today',
        alias: 'today',
        timeZone: 'Asia/Shanghai',
    })
})

const { smDown } = useBreakpoints();
const buttons = ref<any[]>([]);

</script>
<style module>
.analyticsContainer {
    box-sizing: content-box;
    max-width: 49.75rem;
    padding: 0;
    margin: 0 auto;
    margin-top: var(--p-space-500)
}

.metricsControllerPadding {
    margin-left: var(--p-space-400);
    margin-right: var(--p-space-400)
}

.metricButtonStack {
    width: 100%;
    overflow-x: auto
}

.metricButtonStack>div:first-child {
    width: 100%
}

.metricsButtonContainer {
    display: flex;
    flex-direction: row
}

.expandButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 2.25rem;
    padding-left: .625rem
}

.expandButton button {
    width: 100%
}

.expandButton button:hover {
    background-color: var(--p-color-bg);
    color: var(--p-color-icon)
}

.expandButton button:hover svg {
    fill: var(--p-color-icon)
}

.expandButton svg {
    fill: var(--p-color-icon-secondary)
}

.expandButton svg:hover {
    fill: var(--p-color-icon)
}

.expandButton._shadow {
    box-shadow: -.625rem 0 .9375rem -.3125rem #0000000d
}

.MetricCardContainer {
    --home-metric-card-container-height: 13.125rem;
    height: var(--home-metric-card-container-height);
    padding: var(--p-space-0) var(--p-space-100) var(--p-space-100) var(--p-space-100)
}

.MetricCardContainer.Loading {
    padding: var(--p-space-0);
    margin-top: var(--p-space-150);
    height: calc(var(--home-metric-card-container-height) - var(--p-space-150))
}

.MetricCardContainer [class^=Polaris-DataTable] {
    border-radius: 0
}

.MetricCardContainer [class^=Polaris-DataTable] td:not(:first-child) {
    padding-left: var(--p-space-200);
    padding-right: var(--p-space-200);
    width: var(--p-space-0)
}

.MetricCardContainer [class^=Polaris-DataTable] td:last-child {
    padding-right: var(--p-space-300)
}
</style>