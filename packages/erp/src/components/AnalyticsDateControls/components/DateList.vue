<template>
    <NpScrollable :shadow="true" style="height: 330px">
        <NpOptionList :selected="selectedDateRange ? [selectedDateRange.alias] : ['noComparison']"
            @update:selected="onChange"
            :options="quickPicks.common.map((y: any) => ({ value: y.alias, label: y.title }))"></NpOptionList>
        <DateListItemSection :title="quarters.title" :alias="quarters.alias">
            <NpOptionList :selected="selectedDateRange ? [selectedDateRange.alias] : ['noComparison']"
                @update:selected="onChange"
                :options="quarters.options.map((y: any) => ({ value: y.alias, label: y.title }))">
            </NpOptionList>
        </DateListItemSection>
    </NpScrollable>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpScrollable, NpOptionList } from "@ncpl/ncpl-polaris";
import type { PrimaryQuickPicks } from "../utils/use-quick-picks";
import { isRangeDateType, type RangeDateType } from "../utils/analytics-date-range";
import DateListItemSection from "./DateListItemSection.vue"

const props = defineProps<{
    selectedDateRange?: RangeDateType;
    quickPicks: PrimaryQuickPicks;
}>()

const emit = defineEmits(['change']);

const quarters = computed(() => {
    return props.quickPicks.quarters;
})

const onChange = ([value]: string[]) => {
    if (value == 'noComparison') {
        emit('change', null);
        return;
    }

    const _selected = props.quickPicks.all.find(({ alias }) => alias === value);
    _selected == null || !isRangeDateType(_selected) || emit('change', _selected);
}

</script>