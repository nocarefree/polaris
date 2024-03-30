<template>
    <NpInlineStack>
        <template v-for="value in controls">
            <NpPopover v-if="['primary', 'comparison', 'timeDimension'].includes(value)" v-model:active="active"
                preferred-position="below" preferred-alignment="left" :sectioned="false" :fluid-content="true"
                :z-index-override="Number(theme.zIndex['z-index-5'])">
                <template #activator>
                    <div :class="$style.Wrapper">
                        <NpButton size="slim" @click="active = !active" :icon="CalendarIcon" :disabled="false"
                            :show-notification-dot="false">{{ buttonContent }}</NpButton>
                    </div>
                </template>
                <Picker :date-range="initialState.primaryRange" @change="onChange" @cancel="active = false"
                    :quick-picks="quickPicks.primaryQuickPicks" :layout="lgUp ? 'large' : mdDown ? 'small' : 'medium'">
                </Picker>
            </NpPopover>
        </template>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpPopover, NpInlineStack, NpButton, useBreakpoints, useTheme } from '@ncpl/ncpl-polaris';
import { CalendarIcon } from "@ncpl/ncpl-icons";
import { RangeDateType, isRangeDateType } from "./utils/analytics-date-range";
import { useQuickPicks } from "./utils/use-quick-picks";
import Picker from "./components/Picker.vue";

type PropsType = {
    initialState: {
        primaryRange: RangeDateType;
        comparisonRange?: RangeDateType;
    };
    controls?: string[]
}

const props = withDefaults(defineProps<PropsType>(), {
    controls: () => ['primary', 'comparison'],
});
const active = ref(false);
const { mdDown, lgUp } = useBreakpoints();
const theme = useTheme();

const buttonContent = computed(() => {
    const rangeDate = props.initialState.primaryRange
    if (rangeDate.title != null)
        return rangeDate.title;
    const d = quickPicks.value.primaryQuickPicks.all.find(g => isRangeDateType(g) && rangeDate.alias === g.alias);
    return (d == null ? void 0 : d.title) ?? rangeDate.toHumanizedString()
})

const quickPicks = computed(() => {
    const rangeDate = props.initialState.primaryRange
    return useQuickPicks(rangeDate);
})

function onChange(d: RangeDateType, g?: string) {

}
</script>
<style module>
.Wrapper {
    position: relative;
}
</style>