<template>
    <NpInlineStack>
        <NpPopover v-model:active="active">
            <template #activator>
                <div :class="$style.Wrapper">
                    <NpButton size="slim" @click="active = !active" :icon="CalendarIcon" :disabled="false"
                        :show-notification-dot="false">{{
            buttonContent }}</NpButton>
                </div>
            </template>
            <Dialog :date-range="initialState.primaryRange" @change="onChange" @cancel="active = false"
                :quick-picks="quickPicks.primaryQuickPicks" :layout="lgUp ? 'large' : mdDown ? 'small' : 'medium'">
            </Dialog>
        </NpPopover>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpPopover, NpInlineStack, NpButton, useBreakpoints } from '@ncpl/ncpl-polaris';
import { CalendarIcon } from "@ncpl/ncpl-icons";
import { RangeDateType, isRangeDateType } from "./utils/analytics-date-range";
import { useQuickPicks } from "./utils/use-quick-picks";
import Dialog from "./components/Dialog.vue";

type PropsType = {
    initialState: {
        primaryRange: RangeDateType;
        comparisonRange?: RangeDateType;
    }
}

const props = defineProps<PropsType>();
const active = ref(false);
const { mdDown, lgUp } = useBreakpoints();

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