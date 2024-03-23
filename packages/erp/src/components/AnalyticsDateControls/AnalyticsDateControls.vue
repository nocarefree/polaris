<template>
    <NpInlineStack>
        <NpPopover v-model:active="active">
            <template #activator>
                <div :class="$style.Wrapper">
                    <NpButton size="slim" :icon="CalendarIcon" :disabled="disabled"
                        :show-notification-dot="showNotificationDot">{{ buttonContent }}</NpButton>
                </div>
            </template>
            <Dialog :date-range="selectedRangeDate" @change="" @cancel="active = false"
                :quick-picks="quickPicks.primaryQuickPicks" :layout="lgUp ? 'large' : mdDown ? 'small' : 'medium'">
            </Dialog>
        </NpPopover>
    </NpInlineStack>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { NpPopover, NpInlineStack, NpButton, useBreakpoints } from '@ncpl/ncpl-polaris';
import { CalendarIcon } from "@ncpl/ncpl-icons";
import { isRangeDateType } from "./utils/analytics-date-range";
import { useQuickPicks } from "./utils/use-quick-picks";
import Dialog from "./components/Dialog.vue";

type PropsType = {
    disabled?: boolean;
    showNotificationDot?: boolean;
}

withDefaults(defineProps<PropsType>(), {
    disabled: false,
    showNotificationDot: false,
})
const active = ref(false);
const selectedRangeDate = ref();
const { mdDown, lgUp } = useBreakpoints();

const buttonContent = computed(() => {
    if (selectedRangeDate.value.title != null)
        return selectedRangeDate.value.title;
    const d = quickPicks.value.primaryQuickPicks.all.find(g => isRangeDateType(g) && selectedRangeDate.value.alias === g.alias);
    return (d == null ? void 0 : d.title) ?? selectedRangeDate.value.toHumanizedString()
})

const quickPicks = computed(() => {
    return useQuickPicks(selectedRangeDate.value);
})
</script>
<style module>
.Wrapper {
    position: relative;
}
</style>