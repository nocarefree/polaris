<template>
    <NpPage>
        <NpBlockStack>
            <div :class="$style.metricsControllerPadding">
                <div style="margin-top: var(--pc-stack-spacing);">
                    <AnalyticsDateControls></AnalyticsDateControls>
                </div>
            </div>
        </NpBlockStack>
        <NpCard>
            <div>
                <div :class="$style.metricsButtonContainer">
                </div>
            </div>
            <div :class="$style.MetricCardContainer">

            </div>
        </NpCard>
    </NpPage>
</template>
<script setup lang="ts">
import { NpBlockStack, NpPage } from "@ncpl/ncpl-polaris";
import AnalyticsDateControls from "./AnalyticsDateControls/AnalyticsDateControls.vue";
</script>
<style module>
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