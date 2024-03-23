<template>
    <NpScrollable :shadow="true" style="height: 330px">
        <NpOptionList :options="quickPicks.common.map((y: any) => ({ value: y.alias, label: y.title }))"></NpOptionList>
        <DateListItemSection :title="quarters.title" :alias="quarters.alias">
            <NpOptionList :options="quarters.options.map((y: any) => ({ value: y.alias, label: y.title }))">
            </NpOptionList>
        </DateListItemSection>
    </NpScrollable>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpScrollable, NpOptionList } from "@ncpl/ncpl-polaris";
import type { PrimaryQuickPicks } from "../utils/use-quick-picks";
import type { RangeDateType } from "../utils/analytics-date-range";
import DateListItemSection from "./DateListItemSection.vue"

const props = defineProps<{
    selectedDateRange?: RangeDateType;
    quickPicks: PrimaryQuickPicks;
}>()

const quarters = computed(() => {
    return props.quickPicks.quarters;
})
</script>