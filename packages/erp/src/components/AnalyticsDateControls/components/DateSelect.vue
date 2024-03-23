<template>
    <NpSelect :options="options" :model-value="selectedDateRange?.alias || U" @update:modelValue="onChange"></NpSelect>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { NpSelect } from "@ncpl/ncpl-polaris";
import { useCommon } from "../../context";
import type { PrimaryQuickPicks } from "../utils/use-quick-picks";
import { isRangeDateType, type RangeDateType } from "../utils/analytics-date-range";


const props = defineProps<{
    selectedDateRange?: RangeDateType;
    quickPicks: PrimaryQuickPicks;
}>();

const emit = defineEmits(['change']);

const U = 'noComparison';
const { i18n } = useCommon();

const options = computed(() => {
    const { selectedDateRange, quickPicks } = props;
    const r = quickPicks.all.map(({ alias, title }) => ({
        label: title ?? alias,
        value: alias
    }));
    return (!selectedDateRange ? void 0 : selectedDateRange.alias) === 'custom' &&
        r.unshift({
            label: i18n.value.translate('AnalyticsDateControls.quickPicksDropdown.customDateRange'),
            value: 'custom'
        }), r
})

const onChange = (value: string) => {
    if (value == U) {
        emit('change', null);
        return;
    }

    const _selected = props.quickPicks.all.find(({ alias }) => alias === value);
    _selected == null || !isRangeDateType(_selected) || emit('change', _selected);
}

</script>