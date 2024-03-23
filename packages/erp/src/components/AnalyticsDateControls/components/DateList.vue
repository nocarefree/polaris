<template>
    <NpScrollable :shadow="true" style="height: 330px">
        <NpOptionList :options="quickPicks.common.map((y: any) => ({ value: y.alias, label: y.title }))"></NpOptionList>
        <DateListItemSection :title="quarter.title" :alias="quarter.alias">
            <NpOptionList :options="quarter.map((y: any) => ({ value: y.alias, label: y.title }))"></NpOptionList>
        </DateListItemSection>
    </NpScrollable>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpScrollable, NpOptionList } from "@ncpl/ncpl-polaris";
import DateListItemSection from "./DateListItemSection.vue"
const props = defineProps<{
    selectedDateRange: any;
    quickPicks: any;
}>()

const quarter = computed(() => {
    return props.quickPicks.quarter;
})
</script>